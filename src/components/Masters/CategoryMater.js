import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  CardContent,
} from '@mui/material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { PAYMCOMPANIES, PAYMBRANCHES, SAVE ,REPORTS} from '../../serverconfiguration/controllers';

export default function CategoryFormMaster() {
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);

  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [vCategoryName, setVCategoryName] = useState('');
  const [status, setStatus] = useState('');
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
  //       setCompanies(companyData.data);

  //       const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
  //       setBranches(branchData.data);
  //       setFilteredBranches(branchData.data); // Initialize with all branches
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (pnCompanyId) {
  //     const filtered = branches.filter(branch => branch.pnCompanyId === pnCompanyId);
  //     setFilteredBranches(filtered);
  //     setPnBranchId(''); // Reset branch selection
  //   } else {
  //     setFilteredBranches(branches); // Show all branches if no company is selected
  //   }
  // }, [pnCompanyId, branches]);

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await postRequest(ServerConfig.url, REPORTS, {
          "query" : `select * from paym_Company where company_user_id = '${isloggedin}'`
        });
        console.log(companyData.data);
        setCompany(companyData.data);
        if (companyData.data.length > 0) {
          setPnCompanyId(companyData.data[0].pn_CompanyID); // Set default company ID
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const BranchData = await postRequest(ServerConfig.url, REPORTS, {
          "query" : `select * from paym_branch where pn_CompanyID = '${company[0].pn_CompanyID}'`
        });
        console.log("Branch data", BranchData.data)
        setBranch(BranchData.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
    console.log("Branch", branch)
  }, [company]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'pnCompanyId':
        setPnCompanyId(value);
        setCompanyError(false);
        break;
      case 'pnBranchId':
        setPnBranchId(value);
        setBranchError(false);
        break;
      case 'vCategoryName':
        setVCategoryName(value);
        setCategoryNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(value));
        break;
      case 'status':
        setStatus(value.toUpperCase());
        setStatusError(!/^[A-Za-z0-9]$/.test(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasError = !pnCompanyId || !pnBranchId || !/^[A-Za-z0-9\s]{1,40}$/.test(vCategoryName) ||
                     !/^[A-Za-z0-9]$/.test(status);

    setCompanyError(!pnCompanyId);
    setBranchError(!pnBranchId);
    setCategoryNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(vCategoryName));
    setStatusError(!/^[A-Za-z0-9]$/.test(status));

    if (hasError) {
      return;
    }

    const formData = {
      pnCompanyId,
      pnBranchId,
      vCategoryName,
      status,
    };

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_Category]([pn_CompanyID],[BranchID],[v_CategoryName],[status]) VALUES ('${pnCompanyId}', '${pnBranchId}', '${vCategoryName}', '${status}')`
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        navigate('/JobStatusFormMaster'); // Redirect to a different route or handle as needed
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  return (
    <div>
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" align="center">
              Category Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={companyError}>
                <TextField
  value={company.find(c => c.pn_CompanyID === pnCompanyId)?.CompanyName || ''}
  variant="outlined"
  fullWidth
  InputProps={{ readOnly: true }}
/>

                  {companyError && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      Please select a CompanyID
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={branchError}>
                  <Select
                    value={pnBranchId}
                    onChange={handleChange}
                    name="pnBranchId"
                    displayEmpty
                    sx={{ height: '50px' }}
                  >
                    <MenuItem value="" disabled>
                      Select a BranchID
                    </MenuItem>
                    {branch.map((e) => (
                      <MenuItem key={e.BranchName} value={e.pn_BranchID}>
                        {e.BranchName}
                      </MenuItem>
                    ))}
                  </Select>
                  {branchError && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      Please select a BranchID
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={categoryNameError}>
                    <TextField
                      name="vCategoryName"
                      label="Category Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={vCategoryName}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {categoryNameError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid Category Name (alphanumeric characters, max length 40)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={statusError}>
                    <TextField
                      name="status"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      required
                      value={status}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {statusError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid Status (alphanumeric character)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid container spacing={1} paddingTop={'10px'}>
                  <Grid item xs={12} align="right">
                    <Button style={{ margin: '0 5px' }} type="submit" variant="contained" color="primary">
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

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
import { PAYMCOMPANIES, PAYMBRANCHES, SAVE } from '../../serverconfiguration/controllers';

export default function CategoryFormMaster() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);

  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [vCategoryName, setVCategoryName] = useState('');
  const [status, setStatus] = useState('');

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [categoryNameError, setCategoryNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompanies(companyData.data);

        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranches(branchData.data);
        setFilteredBranches(branchData.data); // Initialize with all branches
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (pnCompanyId) {
      const filtered = branches.filter(branch => branch.pnCompanyId === pnCompanyId);
      setFilteredBranches(filtered);
      setPnBranchId(''); // Reset branch selection
    } else {
      setFilteredBranches(branches); // Show all branches if no company is selected
    }
  }, [pnCompanyId, branches]);

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
        navigate('/CategoryTable'); // Redirect to a different route or handle as needed
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
                  <FormControl fullWidth>
                    <Select
                      value={pnCompanyId}
                      onChange={handleChange}
                      name="pnCompanyId"
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value="">
                        Select a Company
                      </MenuItem>
                      {companies.map((company) => (
                        <MenuItem key={company.pnCompanyId} value={company.pnCompanyId}>
                          {company.companyName}
                        </MenuItem>
                      ))}
                    </Select>
                    {companyError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please select a Company
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <Select
                      value={pnBranchId}
                      onChange={handleChange}
                      name="pnBranchId"
                      displayEmpty
                      style={{ height: '50px' }}
                      disabled={!pnCompanyId} // Disable branch dropdown if no company is selected
                    >
                      <MenuItem value="">
                        Select a Branch
                      </MenuItem>
                      {filteredBranches.map((branch) => (
                        <MenuItem key={branch.pnBranchId} value={branch.pnBranchId}>
                          {branch.branchName}
                        </MenuItem>
                      ))}
                    </Select>
                    {branchError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please select a Branch
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

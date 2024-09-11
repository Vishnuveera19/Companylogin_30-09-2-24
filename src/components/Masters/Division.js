import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormHelperText,
  CardContent,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMDIVISION, SAVE,REPORTS } from '../../serverconfiguration/controllers';

export default function DivisionMaster() {
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]); // Raw branch data
  const [filteredBranches, setFilteredBranches] = useState([]); // Branches filtered by selected company
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [vDivisionName, setVDivisionName] = useState("");
  const [status, setStatus] = useState("");
  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [divisionNameError, setDivisionNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))


  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
  //       setCompany(companyData.data);

  //       const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
  //       setBranch(branchData.data);
  //       setFilteredBranches(branchData.data); // Initialize with all branches
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   getData();
  // }, []);

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


  const validateForm = () => {
    const isCompanyValid = !!pnCompanyId;
    const isBranchValid = !!pnBranchId;
    const isDivisionNameValid = /^[A-Za-z0-9\s]{1,40}$/.test(vDivisionName);
    const isStatusValid = /^[A-Za-z]{1}$/.test(status);

    setCompanyError(!isCompanyValid);
    setBranchError(!isBranchValid);
    setDivisionNameError(!isDivisionNameValid);
    setStatusError(!isStatusValid);

    return isCompanyValid && isBranchValid && isDivisionNameValid && isStatusValid;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_Division]([pn_CompanyID],[BranchID],[v_DivisionName],[status]) VALUES (${pnCompanyId},${pnBranchId},'${vDivisionName}','${status}')`,
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        navigate('/GradeForm001');
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save data');
    }
  };

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
      case 'v_DivisionName':
        setVDivisionName(value);
        setDivisionNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(value));
        break;
      case 'status':
        setStatus(value.toUpperCase());
        setStatusError(!/^[A-Za-z]{1}$/.test(value));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleSave();
  };

  return (
    <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 600, width: '100%', padding: '2rem' }}>
        <CardContent>
          <Typography variant='h5' color='black' align='center' gutterBottom>
            Division Form
          </Typography>
          <Typography variant='subtitle1' color="textSecondary" align='center' marginBottom={3}>
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
                <TextField
                  name="v_DivisionName"
                  label="Division Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={vDivisionName}
                  onChange={handleChange}
                  error={divisionNameError}
                  helperText={divisionNameError ? 'Please enter a valid Division Name (alphanumeric, max 40 characters)' : ''}
                  onBlur={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="status"
                  label="Status"
                  variant="outlined"
                  fullWidth
                  required
                  value={status}
                  onChange={handleChange}
                  error={statusError}
                  helperText={statusError ? 'Please enter a valid Status (only alphabetic characters)' : ''}
                  onBlur={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button type="reset" variant="outlined" color="primary">
                    Reset
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

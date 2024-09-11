import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button, Typography, FormControl, MenuItem, Select, FormHelperText, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMCOMPANIES, PAYMBRANCHES, SAVE,REPORTS } from '../../serverconfiguration/controllers';

export default function JobStatusFormMaster() {
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]); 
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [vJobStatusName, setVJobStatusName] = useState('');
  const [status, setStatus] = useState('');
  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [jobStatusNameError, setJobStatusNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))

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
      case 'vJobStatusName':
        setVJobStatusName(value);
        setJobStatusNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(value));
        break;
      case 'status':
        setStatus(value.toUpperCase());
        setStatusError(!/^[A-Za-z]{1}$/.test(value));
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setPnCompanyId('');
    setPnBranchId('');
    setVJobStatusName('');
    setStatus('');
    setCompanyError(false);
    setBranchError(false);
    setJobStatusNameError(false);
    setStatusError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasError = !pnCompanyId || !pnBranchId || !/^[A-Za-z0-9\s]{1,40}$/.test(vJobStatusName) || !/^[A-Za-z]{1}$/.test(status);

    setCompanyError(!pnCompanyId);
    setBranchError(!pnBranchId);
    setJobStatusNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(vJobStatusName));
    setStatusError(!/^[A-Za-z]{1}$/.test(status));

    if (hasError) {
      return;
    }

    const formData = {
      pnCompanyId,
      pnBranchId,
      vJobStatusName,
      status,
    };

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `
          INSERT INTO [dbo].[paym_JobStatus] 
          ([pn_CompanyID], [BranchID], [v_JobStatusName], [status])
          VALUES 
          ('${pnCompanyId}', '${pnBranchId}', '${vJobStatusName}', '${status}') 
        `
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        navigate('/LevelFormMaster'); // Redirect or handle as needed
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" align="center">
              Job Status 
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
                  <FormControl fullWidth error={jobStatusNameError}>
                    <TextField
                      name="vJobStatusName"
                      label="Job Status Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={vJobStatusName}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {jobStatusNameError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid Job Status Name (alphanumeric characters, max length 40)
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
                        Please enter a valid Status (single alphabetic character)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid container spacing={1} paddingTop={'10px'}>
                  <Grid item xs={12} align="right">
                    <Button style={{ margin: '0 5px' }} type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                    <Button style={{ margin: '0 5px' }} type="button" variant="contained" color="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

import React, { useState, useEffect } from 'react';
import { Grid, Card, TextField, Button, Typography, FormControl, MenuItem, Select, FormHelperText, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMCOMPANIES, PAYMBRANCHES, SAVE } from '../../serverconfiguration/controllers';

export default function JobStatusForm() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [vJobStatusName, setVJobStatusName] = useState('');
  const [status, setStatus] = useState('');

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [jobStatusNameError, setJobStatusNameError] = useState(false);
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
        navigate('/JobStatusTable'); // Redirect or handle as needed
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
              Job Status Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size="small">
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
                  <FormControl fullWidth size="small">
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

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
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMDIVISION, SAVE } from '../../serverconfiguration/controllers';

export default function DivisionMaster() {
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);
  const [branchData, setBranchData] = useState([]); // Raw branch data
  const [filteredBranches, setFilteredBranches] = useState([]); // Branches filtered by selected company
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [vDivisionName, setVDivisionName] = useState("");
  const [status, setStatus] = useState("");

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [divisionNameError, setDivisionNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompany(companyData.data);

        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranchData(branchData.data);
        setFilteredBranches(branchData.data); // Initialize with all branches
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (pnCompanyId) {
      const filtered = branchData.filter(branch => branch.pnCompanyId === pnCompanyId);
      setFilteredBranches(filtered);
      setPnBranchId(''); // Reset branch selection
    } else {
      setFilteredBranches(branchData); // Show all branches if no company is selected
    }
  }, [pnCompanyId, branchData]);

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
        navigate('/PaymDivisionTable');
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
                  <Select
                    value={pnCompanyId}
                    onChange={handleChange}
                    name="pnCompanyId"
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Select a Company</em>
                    </MenuItem>
                    {company.map((e) => (
                      <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>
                        {e.companyName}
                      </MenuItem>
                    ))}
                  </Select>
                  {companyError && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      Please select a company
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
                    disabled={!pnCompanyId} // Disable branch dropdown if no company is selected
                  >
                    <MenuItem value="">
                      <em>Select a Branch</em>
                    </MenuItem>
                    {filteredBranches.map((e) => (
                      <MenuItem key={e.pnBranchId} value={e.pnBranchId}>
                        {e.branchName}
                      </MenuItem>
                    ))}
                  </Select>
                  {branchError && (
                    <FormHelperText sx={{ color: 'error.main' }}>
                      Please select a branch
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

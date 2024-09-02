import { Grid, Card, TextField, Button, Typography, CardContent, Box, FormControl, FormHelperText, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, SAVE } from '../../serverconfiguration/controllers';

export default function GradeForm001() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [vGradeName, setVGradeName] = useState("");
  const [status, setStatus] = useState("");

  // State to handle validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompany(companyData.data);
        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranch(branchData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  const handleSave = async () => {
    // Validate the form before submitting
    const validationErrors = {};
    if (!pnCompanyId) validationErrors.pnCompanyId = "Company ID is required";
    if (!pnBranchId) validationErrors.pnBranchId = "Branch ID is required";
    if (!vGradeName) validationErrors.vGradeName = "Grade Name is required (alphanumeric, max 40 characters)";
    if (!status) validationErrors.status = "Status is required (only alphabetic characters)";

    setErrors(validationErrors);

    // If there are no validation errors, proceed with the save
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await postRequest(ServerConfig.url, SAVE, {
          query: `INSERT INTO [dbo].[paym_Grade]([pn_CompanyID],[BranchID],[v_GradeName],[status]) VALUES (${pnCompanyId},${pnBranchId},'${vGradeName}','${status}')`,
        });

        if (response.status === 200) {
          alert('Data saved successfully');
          // Optionally reset form
          setPnCompanyId("");
          setPnBranchId("");
          setVGradeName("");
          setStatus("");
        } else {
          alert('Failed to save data');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to save data');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant='h5' color='textPrimary' align='center'>PAYM GRADE</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.pnCompanyId}>
                  <Select
                    name="pnCompanyId"
                    value={pnCompanyId}
                    onChange={(e) => setPnCompanyId(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Company ID' }}
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
                  {!!errors.pnCompanyId && <FormHelperText>{errors.pnCompanyId}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.pnBranchId}>
                  <Select
                    name="pnBranchId"
                    value={pnBranchId}
                    onChange={(e) => setPnBranchId(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Branch ID' }}
                    disabled={!pnCompanyId} // Disable if no company is selected
                  >
                    <MenuItem value="">
                      <em>Select a Branch</em>
                    </MenuItem>
                    {branch.filter(b => b.pnCompanyId === pnCompanyId).map((e) => (
                      <MenuItem key={e.pnBranchId} value={e.pnBranchId}>
                        {e.branchName}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!errors.pnBranchId && <FormHelperText>{errors.pnBranchId}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.vGradeName}>
                  <TextField
                    name="vGradeName"
                    label="Grade Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={vGradeName}
                    onChange={(e) => setVGradeName(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  {!!errors.vGradeName && <FormHelperText>{errors.vGradeName}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.status}>
                  <TextField
                    name="status"
                    label="Status"
                    variant="outlined"
                    fullWidth
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                  {!!errors.status && <FormHelperText>{errors.status}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <Button type="reset" variant='outlined' color='primary' onClick={() => {
                    setPnCompanyId("");
                    setPnBranchId("");
                    setVGradeName("");
                    setStatus("");
                  }}>
                    RESET
                  </Button>
                  <Button type="submit" variant='contained' color='primary'>
                    SAVE
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

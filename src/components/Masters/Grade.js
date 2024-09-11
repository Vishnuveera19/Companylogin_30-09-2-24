import { Grid, Card, TextField, Button, Typography, CardContent, Box, FormControl, FormHelperText, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, SAVE,REPORTS } from '../../serverconfiguration/controllers';

export default function GradeForm001() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState("");
  const [pnBranchId, setPnBranchId] = useState("");
  const [vGradeName, setVGradeName] = useState("");
  const [status, setStatus] = useState("");
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))

  // State to handle validation errors
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
  //       setCompany(companyData.data);
  //       const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
  //       setBranch(branchData.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }
  //   getData();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'pnCompanyId':
        setPnCompanyId(value);
       
        break;
      case 'pnBranchId':
        setPnBranchId(value);
       
        break;
      
    }
  };

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
          navigate("/ShiftFormMaster");
          // Optionally reset form
          // setPnCompanyId("");
          // setPnBranchId("");
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
            <TextField
  value={company.find(c => c.pn_CompanyID === pnCompanyId)?.CompanyName || ''}
  variant="outlined"
  fullWidth
  InputProps={{ readOnly: true }}
/>

{!!errors.pnCompanyId && <FormHelperText>{errors.pnCompanyId}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.pnBranchId}>
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
                  <Button type="submit" variant='contained' color='primary' >
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

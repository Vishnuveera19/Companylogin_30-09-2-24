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
  Box,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, REPORTS, SAVE } from '../../serverconfiguration/controllers';

export default function DepartmentFormMaster() {

  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [vDepartmentName, setVDepartmentName] = useState('');
  const [status, setStatus] = useState('');
  const [additionalFields, setAdditionalFields] = useState([]);

  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [vDepartmentNameError, setVDepartmentNameError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isloggedin, setisloggedin] = useState(sessionStorage.getItem("user"))
  const navigate = useNavigate();

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




  const validateFields = () => {
    const companyValid = !!pnCompanyId;
    const branchValid = !!pnBranchId;
    const departmentNameValid = /^[A-Za-z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1,40}$/.test(vDepartmentName);
    const statusValid = /^[A-Za-z]{1}$/.test(status);

    setCompanyError(!companyValid);
    setBranchError(!branchValid);
    setVDepartmentNameError(!departmentNameValid);
    setStatusError(!statusValid);

    return companyValid && branchValid && departmentNameValid && statusValid;
  };

  const handleSave = async () => {
    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_Department]([pn_CompanyID],[pn_BranchID],[v_DepartmentName],[status]) VALUES (${pnCompanyId},${pnBranchId},'${vDepartmentName}','${status}')`,
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        navigate("/DesignationMasters");
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save data');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      return;
    }

    const formData = {
      pnCompanyId,
      pnBranchId,
      vDepartmentName,
      status,
      additionalFields: parseAdditionalFields(),
    };

    try {
      setIsLoading(true);

      // Generate SQL for adding columns with default values
      const alterTableQuery = generateAlterTableQuery(formData.additionalFields);
      console.log('Generated SQL Query:', alterTableQuery);

      // Execute SQL for adding columns with default values
      await postRequest(ServerConfig.url, SAVE, { query: alterTableQuery });

      // Save the main data
      await handleSave();

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        navigate('/PaymDepartmentTable');
      }, 2000);
    } catch (error) {
      console.error('Error saving department:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { columnName: '', value: '' }]);
  };

  const handleFieldChange = (index, field, value) => {
    const updatedFields = additionalFields.slice();
    updatedFields[index][field] = value;
    setAdditionalFields(updatedFields);
  };

  const parseAdditionalFields = () => {
    return additionalFields.map(field => ({
      columnName: field.columnName,
      value: field.value
    }));
  };

  const generateAlterTableQuery = (fields) => {
    return fields.map(field => 
      `ALTER TABLE [dbo].[paym_Department] ADD [${field.columnName}] NVARCHAR(MAX) DEFAULT '${field.value}';`
    ).join(' ');
  };

  // Handle changes in select and text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'pnBranchId':
        setPnBranchId(value);
        break;
      case 'vDepartmentName':
        setVDepartmentName(value);
        break;
      case 'status':
        setStatus(value);
        break;
      default:
        break;
    }
  };
  
  return (
    <Box sx={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 600, width: '100%', padding: '2rem' }}>
        <CardContent>
          <Typography variant="h5" color="textPrimary" align="center">
            Department Form
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
                <FormControl fullWidth error={vDepartmentNameError}>
                  <TextField
                    name="vDepartmentName"
                    label="Department Name"
                    variant="outlined"
                    fullWidth
                    required
                    value={vDepartmentName}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    helperText={
                      vDepartmentNameError
                        ? 'Please enter a valid Department Name (alphanumeric and special characters, max length 40)'
                        : ''
                    }
                  />
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
                    helperText={
                      statusError ? 'Please enter a valid Status (single alphabetic character)' : ''
                    }
                  />
                </FormControl>
              </Grid>

              {additionalFields.map((field, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <TextField
                    label={`Additional Field ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={field.columnName}
                    onChange={(e) => handleFieldChange(index, 'columnName', e.target.value)}
                    placeholder="Column Name"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label={`Default Value ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                    placeholder="Default Value"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              ))}

              <Grid container spacing={1} paddingTop={'10px'}>
                <Grid item xs={12} align="right">
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <>
                      {/* <Button
                        type="button"
                        variant="outlined"
                        color="primary"
                        sx={{ marginRight: 2 }}
                        onClick={handleAddField}
                      >
                        + Add Field
                      </Button> */}
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

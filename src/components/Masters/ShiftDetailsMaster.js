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
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMDESIGNATION, SAVE,REPORTS,PAYMSHIFT } from '../../serverconfiguration/controllers';

export default function ShiftFormMaster() {
  const navigate = useNavigate();

  const [company, setCompany] = useState([]);
  const [branch, setBranch] = useState([]); // Raw branch data
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [pnBranchId, setPnBranchId] = useState('');
  const [vShiftName, setvShiftName] = useState('');
  const [vShiftFrom, setvShiftFrom] = useState('');
  const [vShiftTo, setvShiftTo] = useState('');
  const [status,setStatus] = useState('');
  const [vShiftCategory,setvShiftCategory] = useState('');
  const [companyError, setCompanyError] = useState(false);
  const [branchError, setBranchError] = useState(false);
  const [vShiftNameError, setvShiftNameError] = useState(false);
  const [vShiftFromError, setvShiftFromError] = useState(false);
  const [vShiftToError, setvShiftToError] = useState(false);
  const [vShiftCategoryError,setvShiftCategoryError] = useState(false);
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
      case 'vShiftName':
        setvShiftName(value);
        setvShiftNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(value));
        break;
      case 'vShiftFrom':
        setvShiftFrom(value);
        setvShiftFromError(!/^[A-Za-z0-9\s]{1,5}$/.test(value));
        break;
        case 'vShiftTo':
          setvShiftTo(value);
          setvShiftToError(!/^[A-Za-z0-9\s]{1,5}$/.test(value));
          break;
        case 'vShiftCategory':
            setvShiftCategory(value);
            setvShiftCategoryError(!/^[A-Za-z0-9\s]{1,20}$/.test(value));
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

    const hasError = !pnCompanyId || !pnBranchId || !/^[A-Za-z0-9\s]{1,40}$/.test(vShiftName) ||
    !/^[A-Za-z0-9\s]{1,5}$/.test(vShiftFrom) || !/^[A-Za-z0-9\s]{1,5}$/.test(vShiftTo)|| !/^[A-Za-z0-9\s]{1,20}$/.test(vShiftCategory) ||!/^[A-Za-z]{1}$/.test(status);

    setCompanyError(!pnCompanyId);
    setBranchError(!pnBranchId);
    setvShiftNameError(!/^[A-Za-z0-9\s]{1,40}$/.test(vShiftName));
    setvShiftFromError(!/^[A-Za-z0-9\s]{1,5}$/.test(vShiftFrom));
    setvShiftToError(!/^[A-Za-z0-9\s]{1,5}$/.test(vShiftTo));
    setvShiftCategoryError(!/^[A-Za-z0-9\s]{1,20}$/.test(vShiftCategory));

    setStatusError(!/^[A-Za-z]{1}$/.test(status));

    if (hasError) {
      return;
    }

    const formData = {
      pnCompanyId,
      pnBranchId,
      vShiftName,
      vShiftFrom,
      vShiftTo,
      vShiftCategory,
      status,
    };

    try {
      const response = await postRequest(ServerConfig.url, SAVE, {
        query: `INSERT INTO [dbo].[paym_Shift]([pn_CompanyID], [v_ShiftName], [v_ShiftFrom], [v_ShiftTo], [status], [BranchID], [v_ShiftCategory]) VALUES (${pnCompanyId}, '${vShiftName}', '${vShiftFrom}', '${vShiftTo}', '${status}', ${pnBranchId}, '${vShiftCategory}')`
      });

      if (response.status === 200) {
        alert('Data saved successfully');
        navigate("/CategoryFormMaster");
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
              Shift Form
            </Typography>
            <Typography variant='subtitle1' color="textSecondary" align='center' marginBottom={3}>
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
               
                <TextField
  value={company.find(c => c.pn_CompanyID === pnCompanyId)?.CompanyName || ''}
  variant="outlined"
  fullWidth
  InputProps={{ readOnly: true }}
/>

                 
              </Grid>
              <Grid item xs={12} sm={6}>
                  <Select
                    value={pnBranchId}
                    onChange={handleChange}
                    name="pnBranchId"
                    fullWidth
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
                  
              </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={vShiftNameError}>
                    <TextField
                      name="vShiftName"
                      label="vShiftName"
                      variant="outlined"
                      fullWidth
                      required
                      value={vShiftName}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {vShiftNameError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid Shift Name (alphanumeric characters, max length 40)
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={vShiftFromError}>
                    <TextField
                      name="vShiftFrom"
                      label="vShiftFrom"
                      variant="outlined"
                      fullWidth
                      required
                      value={vShiftFrom}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {vShiftFromError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid  characters 1 to 5
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={vShiftToError}>
                    <TextField
                      name="vShiftTo"
                      label="vShiftTo"
                      variant="outlined"
                      fullWidth
                      required
                      value={vShiftTo}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {vShiftToError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid  characters 1 to 5
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={vShiftCategoryError}>
                    <TextField
                      name="vShiftCategory"
                      label="vShiftCategory"
                      variant="outlined"
                      fullWidth
                      required
                      value={vShiftCategory}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {vShiftCategoryError && (
                      <FormHelperText sx={{ color: 'red' }}>
                        Please enter a valid  characters 1 to 20
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
                        Please enter a valid Status (only alphabetic characters)
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
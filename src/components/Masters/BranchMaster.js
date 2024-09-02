import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Container, Typography, Tabs, Tab, Grid, Card, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import Navbar from "../Home Page/Navbar";
import Sidenav from "../Home Page/Sidenav";
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Popover from '@mui/material/Popover';


const PayBranchForm01 = () => {
  const [tabValue, setTabValue] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [popoverMessage, setPopoverMessage] = useState('');

  const validationSchema = yup.object({
    branchName: yup
      .string()
      .max(50, 'Company Name should be at most 50 characters')
      .required('Company Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Company Name should contain only letters, numbers, and spaces'),
    branchCode: yup
      .string()
      .max(20, 'Company Code should be at most 20 characters')
      .required('Company Code is required')
      .matches(/^[a-zA-Z0-9]+$/, 'Company Code should contain only letters and numbers'),
    addressLine1: yup
      .string()
      .max(100, 'Address Line 1 should be at most 100 characters')
      .required('Address Line 1 is required')
      .matches(/^[a-zA-Z0-9\s,.-]+$/, 'Address Line 1 should contain only letters, numbers, spaces, commas, periods, and hyphens'),
    addressLine2: yup
      .string()
      .max(100, 'Address Line 2 should be at most 100 characters')
      .matches(/^[a-zA-Z0-9\s,.-]+$/, 'Address Line 2 should contain only letters, numbers, spaces, commas, periods, and hyphens'),
    city: yup
      .string()
      .max(50, 'City should be at most 50 characters')
      .required('City is required')
      .matches(/^[a-zA-Z\s]+$/, 'City should contain only letters and spaces'),
    state: yup
      .string()
      .max(50, 'State should be at most 50 characters')
      .required('State is required')
      .matches(/^[a-zA-Z\s]+$/, 'State should contain only letters and spaces'),
    country: yup
      .string()
      .max(100, 'Country should be at most 100 characters')
      .required('Country is required')
      .matches(/^[a-zA-Z\s]+$/, 'Country should contain only letters and spaces'),
    zipCode: yup
      .string()
      .max(6, 'Zip Code should be at most 6 characters')
      .required('Zip Code is required')
      .matches(/^\d{6}$/, 'Zip Code should be 6 digits'),
    phoneNo: yup
      .string()
      .max(50, 'Phone Number should be at most 50 characters')
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Phone Number should be 10 digits'),
    faxNo: yup
      .string()
      .max(50, 'Fax Number should be at most 50 characters')
      .required('Fax Number is required')
      .matches(/^\d{10}$/, 'Fax Number should be 10 digits'),
    emailId: yup
      .string()
      .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, 'Email must contain only one "@" symbol and be alphanumeric')
      .max(100, 'Email Address should be at most 100 characters')
      .required('Email Address is required'),

    alternateEmailId: yup
      .string()
      .matches(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/, 'Email must contain only one "@" symbol and be alphanumeric')
      .max(100, 'Alternate Email Address should be at most 100 characters')
      .required('Alternate Email Address is required'),
    branchUserId: yup
      .string()
      .matches(/^[a-zA-Z0-9_]+$/, 'Branch User ID can only contain letters, numbers, and underscores')
      .max(10, 'Branch User ID should be at most 10 characters')
      .required('Branch User ID is required'),

      branchPassword: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/, 'Branch Password must be 8-10 characters long and include at least one letter and one number')
      .required('Branch Password is required'),
    pfno: yup
      .string()
      .max(20, 'PF Number should be at most 20 characters')
      .required('PF Number is required')
      .matches(/^[a-zA-Z0-9]{1,20}$/, 'PF Number should be alphanumeric and at most 20 characters'),
    esino: yup
      .string()
      .max(20, 'ESI Number should be at most 20 characters')
      .required('ESI Number is required')
      .matches(/^\d{10}$/, 'ESI Number should be 10 digits'),
    status: yup
      .string()
      .max(1, 'status Number should be at most 1 characters')
      .required('status Number is required'),
    startDate: yup
      .date()
      .required('Start Date is required'),
    endDate: yup
      .date()
      .required('End Date is required')
      .min(yup.ref('startDate'), 'End Date cannot be before Start Date'),
  });

  const formik = useFormik({
    initialValues: {
      pnCompanyId: '',
      branchCode: '',
      branchName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      phoneNo: '',
      faxNo: '',
      emailId: '',
      alternateEmailId: '',
      branchUserId: '',
      branchPassword: '',
      status: '',
      pfno: '',
      esino: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleTabChange = (event, newValue) => {
    if (newValue > tabValue) {
      if (!isValid()) {
        const errorMessage = 'Please fill all required fields before moving to the next step.';
        const anchorEl = event.target;
        setPopoverOpen(true);
        setPopoverAnchorEl(anchorEl);
        setPopoverMessage(errorMessage);
        return;
      }
    }
    setTabValue(newValue);
  };

  const fetchLocationDetails = async (zipcode) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${zipcode}`);
      const data = response.data[0];
      if (data.Status === 'Success') {
        const locationData = data.PostOffice[0];
        formik.setFieldValue('city', locationData.District);
        formik.setFieldValue('state', locationData.State);
        formik.setFieldValue('country', locationData.Country);
      } else {
        alert('Invalid Zip Code');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.handleChange(e);

    if (name === 'zipCode') {
      if (value.length === 6) {
        fetchLocationDetails(value);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && formik.values.zipCode.length === 6) {
      fetchLocationDetails(formik.values.zipCode);
    }
  };


  const isValid = () => {
    const errors = formik.errors;
    if (tabValue === 0) {
      return !errors.branchCode && !errors.branchName && !errors.branchUserId && !errors.branchPassword;
    } else if (tabValue === 1) {
      return !errors.addressLine1 && !errors.addressLine2 && !errors.city && !errors.state && !errors.country && !errors.zipCode;
    } else if (tabValue === 2) {
      return !errors.phoneNo && !errors.emailId && !errors.alternateEmailId && !errors.pfno && !errors.esino;
    } else if (tabValue === 3) {
      return !errors.status && !errors.startDate && !errors.endDate;
    }
    return true;
  };

  const handleNext = async () => {
    if (!isValid()) return;
    if (tabValue === 3) {
      postData();
    } else {
      setTabValue(tabValue + 1);
    }
  };

  const handleCancel = () => {
    setTabValue(0);
    formik.resetForm();
  };

  const postData = async (formData) => {
    try {
      const query = `
       INSERT INTO [dbo].[paym_Branch] 
([pn_CompanyID], [BranchCode], [BranchName], [Address_Line1], [Address_Line2], [City], [State], [Country], [ZipCode], [Phone_No], [Fax_No], [Email_Id], [AlternateEmail_Id], [Branch_User_Id], [Branch_Password], [status], [PFno], [Esino], [start_date], [end_date])
VALUES 
('${formik.values.pnCompanyId}', '${formik.values.branchCode}', '${formik.values.branchName}', '${formik.values.addressLine1}', '${formik.values.addressLine2}', '${formik.values.city}', '${formik.values.state}', '${formik.values.country}', '${formik.values.zipCode}', '${formik.values.phoneNo}', '${formik.values.faxNo}', '${formik.values.emailId}', '${formik.values.alternateEmailId}', '${formik.values.branchUserId}', '${formik.values.branchPassword}', '${formik.values.status || ''}', '${formik.values.pfno || ''}', '${formik.values.esino || ''}', '${formik.values.startDate}', '${formik.values.endDate}') `;


      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        alert('Data saved successfully!');
        handleCancel(); // Optionally reset the form after submission
      } else {
        alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error in postData:', error);
      alert(`Error: ${error.message || 'An unknown error occurred'}`);
    }
  };

  const fetchCompanies = async () => {
    try {
      const query = `
        SELECT [pn_CompanyID],[companyName]
        FROM [dbo].[paym_Company]
      `;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        console.log('Fetched companies:', response.data); // Add this line
        return response.data || [];
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        return [];
      }
    } catch (error) {
      console.error('Error fetching companies data:', error);
      return [];
    }
  };



  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function getCompaniesData() {
      const data = await fetchCompanies();
      setCompanies(data);
    }

    getCompaniesData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <div style={{ backgroundColor: "#fff" }}>
          <Navbar />
          <Box height={30} />
          <Box sx={{ display: "flex" }}>
            <Sidenav />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={7} style={{ marginLeft: "auto", marginRight: "auto" }}>
              <Container maxWidth="md" sx={{ p: 2 }}>
                <Typography variant="h5" fontWeight={'425'} gutterBottom textAlign={'left'}>
                  Enter Branch Details
                </Typography>
                <Card sx={{ width: "750px", padding: "15px" }}>
                  <Tabs value={tabValue} onChange={handleTabChange} aria-label="paym-branch-details-tabs">
                    <Tab label="General Information" />
                    <Tab label="Address Details" />
                    <Tab label="Contact Details" />
                    <Tab label="Additional Info" />
                  </Tabs>
                  <form onSubmit={formik.handleSubmit}>
                    {tabValue === 0 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                         <Grid item xs={4}>
        <FormControl fullWidth size="small">
          <InputLabel id="company-id-select-label">Company ID</InputLabel>
          <Select
            labelId="company-id-select-label"
            name="pnCompanyId"
            value={formik.values.pnCompanyId}
            onChange={formik.handleChange}
            sx={{ height: 40 }}
          >
            <MenuItem value="">Select</MenuItem>
            {companies.map((company) => (
              <MenuItem key={company.pn_CompanyID} value={company.pn_CompanyID}>
                {company.companyName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Branch Code"
                            name="branchCode"
                            value={formik.values.branchCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.branchCode && Boolean(formik.errors.branchCode)}
                            helperText={formik.touched.branchCode && formik.errors.branchCode}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Branch Name"
                            name="branchName"
                            value={formik.values.branchName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.branchName && Boolean(formik.errors.branchName)}
                            helperText={formik.touched.branchName && formik.errors.branchName}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Branch User Id"
                            name="branchUserId"
                            autoComplete="off"
                            value={formik.values.branchUserId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.branchUserId && Boolean(formik.errors.branchUserId)}
                            helperText={formik.touched.branchUserId && formik.errors.branchUserId}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
    fullWidth
    size="small"
    label="Branch Password"
    name="branchPassword"
    type="password"
    autoComplete="new-password"
    value={formik.values.branchPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.branchPassword && Boolean(formik.errors.branchPassword)}
    helperText={formik.touched.branchPassword && formik.errors.branchPassword}
    InputLabelProps={{ shrink: true }}
  />
                        </Grid>

                      </Grid>

                    )}

                    {tabValue === 1 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Address Line 1"
                            name="addressLine1"
                            value={formik.values.addressLine1}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                            helperText={formik.touched.addressLine1 && formik.errors.addressLine1}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Address Line 2"
                            name="addressLine2"
                            value={formik.values.addressLine2}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
                            helperText={formik.touched.addressLine2 && formik.errors.addressLine2}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Zip Code"
                            name="zipCode"
                            value={formik.values.zipCode}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={formik.handleBlur}
                            error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                            helperText={formik.touched.zipCode && formik.errors.zipCode}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="State"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Country"
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}


                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>

                      </Grid>

                    )}

                    {tabValue === 2 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Phone No"
                            name="phoneNo"  // Add this line
                            value={formik.values.phoneNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                            helperText={formik.touched.phoneNo && formik.errors.phoneNo}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Fax No"
                            name="faxNo"
                            value={formik.values.faxNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.faxNo && Boolean(formik.errors.faxNo)}
                            helperText={formik.touched.faxNo && formik.errors.faxNo}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="PF No"
                            name="pfno"
                            value={formik.values.pfno}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pfno && Boolean(formik.errors.pfno)}
                            helperText={formik.touched.pfno && formik.errors.pfno}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="ESI No"
                            name="esino"
                            value={formik.values.esino}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.esino && Boolean(formik.errors.esino)}
                            helperText={formik.touched.esino && formik.errors.esino}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Email Id"
                            name="emailId"
                            value={formik.values.emailId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.emailId && Boolean(formik.errors.emailId)}
                            helperText={formik.touched.emailId && formik.errors.emailId}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Alternate Email Id"
                            name="alternateEmailId"
                            value={formik.values.alternateEmailId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.alternateEmailId && Boolean(formik.errors.alternateEmailId)}
                            helperText={formik.touched.alternateEmailId && formik.errors.alternateEmailId}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                    )}

                    {tabValue === 3 && (

                      <Grid container spacing={2} sx={{ paddingTop: 2 }}>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Status"
                            name="status"
                            value={formik.values.status}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.status && Boolean(formik.errors.status)}
                            helperText={formik.touched.status && formik.errors.status}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Start Date"
                            name="startDate"
                            type="date"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                            helperText={formik.touched.startDate && formik.errors.startDate}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="End Date"
                            name="endDate"
                            type="date"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                            helperText={formik.touched.endDate && formik.errors.endDate}

                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>
                      </Grid>

                    )}

                    <Box mt={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} style={{ textAlign: 'right' }}>
                          <Box display="flex" justifyContent="flex-end">
                            <Button variant="contained" color="secondary" onClick={handleCancel} style={{ marginRight: '8px' }}>
                              Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                              {tabValue === 3 ? 'Submit' : 'Next'}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                  <Popover
                    open={popoverOpen}
                    anchorEl={popoverAnchorEl}
                    onClose={() => setPopoverOpen(false)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                  >
                    <Typography sx={{ p: 2 }}>{popoverMessage}</Typography>
                  </Popover>
                </Card>
              </Container>
            </Grid>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};
export default PayBranchForm01;
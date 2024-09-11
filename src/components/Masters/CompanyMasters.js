import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Container, Typography, Tabs, Tab, Grid, Card, Popover } from '@mui/material';
import Navbar from "../Home Page/Navbar";
import Sidenav from "../Home Page/Sidenav";
import { postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { REPORTS } from '../../serverconfiguration/controllers';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CompanyMasterss = () => {
  const [tabValue, setTabValue] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
  const [popoverMessage, setPopoverMessage] = useState('');
  const navigate = useNavigate();

  const validationSchema = yup.object({
    companyName: yup
      .string()
      .max(50, 'Company Name should be at most 50 characters')
      .required('Company Name is required')
      .matches(/^[a-zA-Z0-9\s]+$/, 'Company Name should contain only letters, numbers, and spaces'),
    companyCode: yup
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
      .max(100, 'State should be at most 100 characters')
      .required('State is required')
      .matches(/^[a-zA-Z\s]+$/, 'State should contain only letters and spaces'),
    country: yup
      .string()
      .max(100, 'Country should be at most 100 characters')
      .required('Country is required')
      .matches(/^[a-zA-Z\s]+$/, 'Country should contain only letters and spaces'),
    ZipCode: yup
      .string()
      .max(6, 'Zip Code should be at most 6 characters')
      .required('Zip Code is required')
      .matches(/^\d{6}$/, 'Zip Code should be 6 digits'),
    phoneNumber: yup
      .string()
      .max(10, 'Phone Number should be at most 10 characters')
      .required('Phone Number is required')
      .matches(/^\d{10}$/, 'Phone Number should be 10 digits'),
    faxNo: yup
      .string()
      .max(10, 'Fax Number should be at most 10 characters')
      .matches(/^\d{10}$/, 'Fax Number should be 10 digits'),
    emailAddress: yup
      .string()
      .email('Enter a valid email')
      .max(100, 'Email Address should be at most 100 characters')
      .required('Email Address is required'),
    alternateEmailAddress: yup
      .string()
      .email('Enter a valid email')
      .max(100, 'Alternate Email Address should be at most 100 characters'),
    pfNo: yup
      .string()
      .max(22, 'PF Number should be at most 22 characters')
      .required('PF Number is required')
      .matches(/^[a-zA-Z0-9]{1,22}$/, 'PF Number should be alphanumeric and at most 22 characters'),
    esiNo: yup
      .string()
      .max(20, 'ESI Number should be at most 20 characters')
      .matches(/^\d{10}$/, 'ESI Number should be 10 digits'),
    startDate: yup
      .date()
      .required('Start Date is required'),
    endDate: yup
      .date()
      .required('End Date is required')
      .min(yup.ref('startDate'), 'End Date cannot be before Start Date'),
      companyUserId: yup
      .string()
      .matches(/^[a-zA-Z0-9_]+$/, 'Company User ID can only contain letters, numbers, and underscores')
      .max(10, 'Branch User ID should be at most 10 characters')
      .required('Branch User ID is required'),

      companyPassword: yup
      .string()
      .matches(/^[a-zA-Z0-9]{1,8}$/, 'Company Password must be 8 characters long and include at least one letter, one number, and one special character')
      .required('Company Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      companyName: '',
      companyCode: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      ZipCode: '',
      phoneNumber: '',
      faxNo: '',
      emailAddress: '',
      alternateEmailAddress: '',
      pfNo: '',
      esiNo: '',
      startDate: '',
      endDate: '',
      companyUserId: '',
      companyPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      postData(values);
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
      const response = await axios.get`(https://api.postalpincode.in/pincode/${zipcode})`;
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
    if (name === 'ZipCode' && value.length === 6) {
      fetchLocationDetails(value);
    }
  };
  const isValid = () => {
    const errors = formik.errors;
    if (tabValue === 0) {
      return !errors.companyName && !errors.companyCode && !errors.companyUserId && !errors.companyPassword;;
    } else if (tabValue === 1) {
      return !errors.addressLine1 && !errors.city && !errors.state && !errors.country && !errors.ZipCode;
    } else if (tabValue === 2) {
      return !errors.phoneNumber && !errors.emailAddress;
    } else if (tabValue === 3) {
      return !errors.pfNo && !errors.startDate && !errors.endDate;
    }
    return true;
  };

  const handleNext = () => {
    if (isValid()) {
      if (tabValue === 3) {
        formik.handleSubmit();
      } else {
        setTabValue(tabValue + 1);
      }
    }
  };

  const handleCancel = () => {
    setTabValue(0);
    formik.resetForm();
  };

  const postData = async (formData) => {
    try {
      const query = `
        INSERT INTO [dbo].[paym_Company] 
        ([CompanyCode], [CompanyName], [Address_Line1], [Address_Line2], [City], [State], [Country], [ZipCode], [Phone_No], [Fax_No], [Email_Id], [AlternateEmail_Id], [PFno], [Esino], [start_date], [end_date], [Company_User_Id], [Company_Password])
        VALUES 
        ('${formData.companyCode}', '${formData.companyName}', '${formData.addressLine1}', '${formData.addressLine2}', '${formData.city}', '${formData.state}', '${formData.country}', '${formData.ZipCode}', '${formData.phoneNumber}', '${formData.faxNo}', '${formData.emailAddress}', '${formData.alternateEmailAddress}', '${formData.pfNo}', '${formData.esiNo}', '${formData.startDate}', '${formData.endDate}','${formik.values.companyUserId}', '${formik.values.companyPassword}')
      `;

      const response = await postRequest(ServerConfig.url, REPORTS, { query });

      if (response.status === 200) {
        alert('Data saved successfully!');
        navigate("/PayBranchForm01");
      } else {
        alert`(Unexpected response status: ${response.status})`;
      }
    } catch (error) {
      console.error('Error in postData:', error);
      if (error.response) {
        alert`(Server responded with error: ${error.response.status} - ${error.response.statusText})`;
      } else if (error.request) {
        alert('No response received from server');
      } else {
        alert`(Request error: ${error.message})`;
      }
    }
  };

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
                Enter Company Details
              </Typography>
              <Card sx={{ width: "750px", padding: "15px" }}>
                <Tabs value={tabValue} onChange={handleTabChange} aria-label="company-details-tabs">
                  <Tab label="General Information" />
                  <Tab label="Address Details" />
                  <Tab label="Contact Details" />
                  <Tab label="Additional Info" />
                </Tabs>
                <form onSubmit={formik.handleSubmit}>
          {tabValue === 0 && (
              <Grid container spacing={2} sx={{paddingTop:2}}>
                <Grid item xs={4}>
                  <TextField
                    label="Company Name"
                    name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={formik.touched.companyName && formik.errors.companyName}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Company Code"
                    name="companyCode"
                    value={formik.values.companyCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.companyCode && Boolean(formik.errors.companyCode)}
                    helperText={formik.touched.companyCode && formik.errors.companyCode}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                          <TextField
                            fullWidth
                            size="small"
                            label="Company User Id"
                            name="companyUserId"
                            autoComplete="off"
                            value={formik.values.companyUserId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.companyUserId && Boolean(formik.errors.companyUserId)}
                            helperText={formik.touched.companyUserId && formik.errors.companyUserId}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                        <TextField
    fullWidth
    size="small"
    label="Company Password"
    name="companyPassword"
    type="password"
    autoComplete="new-password"
    value={formik.values.companyPassword}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.companyPassword && Boolean(formik.errors.companyPassword)}
    helperText={formik.touched.companyPassword && formik.errors.companyPassword}
    InputLabelProps={{ shrink: true }}
  />
                        </Grid>

              </Grid>
            )}
            {tabValue === 1 && (
              <Grid container spacing={2}  sx={{paddingTop:2}}>
                <Grid item xs={12}>
                  <TextField
                    label="Address Line 1"
                    name="addressLine1"
                    value={formik.values.addressLine1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                    helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Address Line 2"
                    name="addressLine2"
                    value={formik.values.addressLine2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
                    helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Zip Code"
                    name="ZipCode"
                    value={formik.values.ZipCode}
                    onChange={(e) => {
                      formik.handleChange(e);
                      handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.ZipCode && Boolean(formik.errors.ZipCode)}
                    helperText={formik.touched.ZipCode && formik.errors.ZipCode}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4} >
                  <TextField
                    label="City"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    fullWidth
                  />
                </Grid>
                <Grid item  sm={4}>
                  <TextField
                    label="State"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                    fullWidth
                  />
                </Grid>
                <Grid item  sm={4}>
                  <TextField
                    label="Country"
                    name="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.country && Boolean(formik.errors.country)}
                    helperText={formik.touched.country && formik.errors.country}
                    fullWidth
                  />
                </Grid>
              
              </Grid>
            )}
            {tabValue === 2 && (
              <Grid container spacing={2}  sx={{paddingTop:2}}>
                <Grid item xs={4}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Fax Number"
                    name="faxNo"
                    value={formik.values.faxNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.faxNo && Boolean(formik.errors.faxNo)}
                    helperText={formik.touched.faxNo && formik.errors.faxNo}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Email Address"
                    name="emailAddress"
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                    helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Alternate Email Address"
                    name="alternateEmailAddress"
                    value={formik.values.alternateEmailAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.alternateEmailAddress && Boolean(formik.errors.alternateEmailAddress)}
                    helperText={formik.touched.alternateEmailAddress && formik.errors.alternateEmailAddress}
                    fullWidth
                  />
                </Grid>
              </Grid>
            )}
            {tabValue === 3 && (
              <Grid container spacing={2}  sx={{paddingTop:2}}>
                <Grid item xs={4}>
                  <TextField
                    label="PF Number"
                    name="pfNo"
                    value={formik.values.pfNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.pfNo && Boolean(formik.errors.pfNo)}
                    helperText={formik.touched.pfNo && formik.errors.pfNo}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="ESI Number"
                    name="esiNo"
                    value={formik.values.esiNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.esiNo && Boolean(formik.errors.esiNo)}
                    helperText={formik.touched.esiNo && formik.errors.esiNo}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={formik.values.startDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                    helperText={formik.touched.startDate && formik.errors.startDate}
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formik.values.endDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                    helperText={formik.touched.endDate && formik.errors.endDate}
                    fullWidth
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

export default CompanyMasterss;
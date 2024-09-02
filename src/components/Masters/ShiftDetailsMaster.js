import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  CardContent,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { PAYMBRANCHES, PAYMCOMPANIES, PAYMSHIFT, SAVE } from '../../serverconfiguration/controllers';

const ShiftForm = () => {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);

  const validationSchema = yup.object({
    pnCompanyId: yup.string().required('Company is required'),
    branchId: yup.string().required('Branch is required'),
    vShiftName: yup
      .string()
      .max(40, 'Shift Name should be at most 40 characters')
      .required('Shift Name is required')
      .matches(/^[A-Za-z0-9\s]+$/, 'Shift Name should contain only alphanumeric characters'),
    vShiftFrom: yup
      .string()
      .max(5, 'Shift From should be at most 5 characters')
      .required('Shift From is required')
      .matches(/^[A-Za-z0-9\s]+$/, 'Shift From should contain only alphanumeric characters'),
    vShiftTo: yup
      .string()
      .max(5, 'Shift To should be at most 5 characters')
      .required('Shift To is required')
      .matches(/^[A-Za-z0-9\s]+$/, 'Shift To should contain only alphanumeric characters'),
    status: yup
      .string()
      .length(1, 'Status should be a single character')
      .required('Status is required')
      .matches(/^[A-Za-z]$/, 'Status should be a single alphabetic character'),
    vShiftCategory: yup
      .string()
      .max(20, 'Shift Category should be at most 20 characters')
      .required('Shift Category is required')
      .matches(/^[A-Za-z0-9\s]+$/, 'Shift Category should contain only alphanumeric characters'),
  });

  const formik = useFormik({
    initialValues: {
      pnCompanyId: '',
      branchId: '',
      vShiftName: '',
      vShiftFrom: '',
      vShiftTo: '',
      status: '',
      vShiftCategory: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Check if shift already exists
        const existingShifts = await getRequest(ServerConfig.url, PAYMSHIFT);
        const isExistingShift = existingShifts.data.some(shift =>
          shift.pnCompanyId === values.pnCompanyId &&
          shift.branchId === values.branchId &&
          shift.vShiftName === values.vShiftName
        );

        if (isExistingShift) {
          alert('Shift with the same name already exists for this company and branch.');
          return;
        }

        // Construct SQL query
        const query = `
          INSERT INTO [dbo].[paym_Shift] 
          ([pn_CompanyID], [v_ShiftName], [v_ShiftFrom], [v_ShiftTo], [status], [BranchID], [v_ShiftCategory])
          VALUES 
          ('${values.pnCompanyId}', '${values.vShiftName}', '${values.vShiftFrom}', '${values.vShiftTo}', '${values.status}', '${values.branchId}', '${values.vShiftCategory}');
        `;

        const response = await postRequest(ServerConfig.url, SAVE, { query });

        if (response.status === 200) {
          alert('Data saved successfully');
          navigate('/path-to-redirect'); // Replace with actual path
        } else {
          alert('Failed to save data');
        }
      } catch (error) {
        console.error('Error saving data', error);
        alert('An error occurred while saving data');
      }
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const companyData = await getRequest(ServerConfig.url, PAYMCOMPANIES);
        setCompanies(companyData.data);
        const branchData = await getRequest(ServerConfig.url, PAYMBRANCHES);
        setBranches(branchData.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (formik.values.pnCompanyId) {
      const filtered = branches.filter(branch => branch.pnCompanyId === formik.values.pnCompanyId);
      setFilteredBranches(filtered);
      formik.setFieldValue('branchId', ''); // Reset branch selection
    } else {
      setFilteredBranches(branches); // Show all branches if no company is selected
    }
  }, [formik.values.pnCompanyId, branches]);

  return (
    <div>
      <Grid style={{ padding: '80px 5px 0 5px' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto' }}>
          <CardContent>
            <Typography variant="h5" color="textPrimary" align="center">
              Shift Form
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.pnCompanyId && Boolean(formik.errors.pnCompanyId)}>
                    <InputLabel shrink>Company</InputLabel>
                    <Select
                      name="pnCompanyId"
                      value={formik.values.pnCompanyId}
                      onChange={formik.handleChange}
                      displayEmpty
                      style={{ height: '50px' }}
                    >
                      <MenuItem value="">Select</MenuItem>
                      {companies.map((e) => (
                        <MenuItem key={e.pnCompanyId} value={e.pnCompanyId}>
                          {e.companyName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.pnCompanyId && formik.errors.pnCompanyId && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.pnCompanyId}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.branchId && Boolean(formik.errors.branchId)}>
                    <InputLabel shrink>Branch</InputLabel>
                    <Select
                      name="branchId"
                      value={formik.values.branchId}
                      onChange={formik.handleChange}
                      displayEmpty
                      style={{ height: '50px' }}
                      disabled={!formik.values.pnCompanyId} // Disable if no company selected
                    >
                      <MenuItem value="">Select</MenuItem>
                      {filteredBranches.map((e) => (
                        <MenuItem key={e.pnBranchId} value={e.pnBranchId}>
                          {e.branchName}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.branchId && formik.errors.branchId && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.branchId}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.vShiftName && Boolean(formik.errors.vShiftName)}>
                    <TextField
                      name="vShiftName"
                      label="Shift Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.vShiftName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {formik.touched.vShiftName && formik.errors.vShiftName && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.vShiftName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.vShiftFrom && Boolean(formik.errors.vShiftFrom)}>
                    <TextField
                      name="vShiftFrom"
                      label="Shift From"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.vShiftFrom}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {formik.touched.vShiftFrom && formik.errors.vShiftFrom && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.vShiftFrom}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.vShiftTo && Boolean(formik.errors.vShiftTo)}>
                    <TextField
                      name="vShiftTo"
                      label="Shift To"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.vShiftTo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {formik.touched.vShiftTo && formik.errors.vShiftTo && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.vShiftTo}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
                    <TextField
                      name="status"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {formik.touched.status && formik.errors.status && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.status}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={formik.touched.vShiftCategory && Boolean(formik.errors.vShiftCategory)}>
                    <TextField
                      name="vShiftCategory"
                      label="Shift Category"
                      variant="outlined"
                      fullWidth
                      required
                      value={formik.values.vShiftCategory}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      InputLabelProps={{ shrink: true }}
                    />
                    {formik.touched.vShiftCategory && formik.errors.vShiftCategory && (
                      <FormHelperText style={{ color: 'red' }}>
                        {formik.errors.vShiftCategory}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={1} paddingTop={'10px'}>
                <Grid item xs={12} align="right">
                  <Button
                    style={{ margin: '0 5px' }}
                    type="reset"
                    variant="outlined"
                    color="primary"
                    onClick={formik.handleReset}
                  >
                    RESET
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default ShiftForm;

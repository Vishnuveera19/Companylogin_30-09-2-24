import {
  Grid,
  Card,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Tabs,
  Tab,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { PAYMBRANCHES, PAYMCOMPANIES, REPORTS } from '../../serverconfiguration/controllers';
import axios from 'axios';
import Navbar from '../Home Page/Navbar';
import Sidenav from '../Home Page/Sidenav'

export default function PayBranchForm01() {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const [pnCompanyId, setPnCompanyId] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [faxNo, setFaxNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [alternateEmailId, setAlternateEmailId] = useState('');
  const [branchUserId, setBranchUserId] = useState('');
  const [branchPassword, setBranchPassword] = useState('');
  const [status, setStatus] = useState('');
  const [pfno, setPfno] = useState('');
  const [esino, setEsino] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const [companyError, setCompanyError] = useState(false);
  const [branchCodeError, setBranchCodeError] = useState(false);
  const [branchNameError, setBranchNameError] = useState(false);
  const [addressLine1Error, setAddressLine1Error] = useState(false);
  const [addressLine2Error, setAddressLine2Error] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [zipCodeError, setZipCodeError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [phoneNoError, setPhoneNoError] = useState(false);
  const [faxNoError, setFaxNoError] = useState(false);
  const [emailIdError, setEmailIdError] = useState(false);
  const [alternateEmailIdError, setAlternateEmailIdError] = useState(false);
  const [branchUserIdError, setBranchUserIdError] = useState(false);
  const [branchPasswordError, setBranchPasswordError] = useState(false);
  const [statusError, setStatusError] = useState(false);
  const [pfnoError, setPfnoError] = useState(false);
  const [esinoError, setEsinoError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
      setCompany(data.data);
    }
    getData();
  }, []);
  const fetchLocationDetails = async (zipcode) => {
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${zipcode}`);
      const data = response.data[0];
      if (data.Status === 'Success') {
        const locationData = data.PostOffice[0];
        setCity(locationData.District);
        setState(locationData.State);
        setCountry(locationData.Country);
      } else {
        alert('Invalid Zip Code');
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'pnCompanyId':
        setPnCompanyId(value);
        setCompanyError(false);
        break;
      case 'branchCode':
        setBranchCode(value);
        setBranchCodeError(!/^[A-Za-z0-9\s]{1,20}$/.test(value) || !value);
        break;
      case 'branchName':
        setBranchName(value);
        setBranchNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(value) || !value);
        break;
      case 'addressLine1':
        setAddressLine1(value);
        setAddressLine1Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(value) || !value);
        break;
      case 'addressLine2':
        setAddressLine2(value);
        setAddressLine2Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(value) || !value);
        break;
      case 'city':
        setCity(value);
        setCityError(!/^[A-Za-z0-9\s]{1,100}$/.test(value) || !value);
        break;
        case 'zipCode':
          setZipCode(value);
          setZipCodeError(!/^[/-{}.,A-Za-z0-9\s]{1,50}$/.test(value) || !value);
          if (value.length === 6) {
            fetchLocationDetails(value);
          }
      case 'country':
        setCountry(value);
        setCountryError(!/^[A-Za-z0-9\s]{1,100}$/.test(value) || !value);
        break;
      case 'state':
        setState(value);
        setStateError(!/^[A-Za-z0-9\s]{1,100}$/.test(value) || !value);
        break;
      case 'phoneNo':
        const phoneNumber = value.replace(/\D/g, '');
        setPhoneNo(value);
        setPhoneNoError(phoneNumber.length !== 10);
        break;
      case 'faxNo':
        const faxNoPattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
        setFaxNo(value);
        setFaxNoError(!faxNoPattern.test(value));
        break;
      case 'emailId':
        setEmailId(value.trim());
        setEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        break;
      case 'alternateEmailId':
        setAlternateEmailId(value.trim());
        setAlternateEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        break;
      case 'branchUserId':
        setBranchUserId(value);
        setBranchUserIdError(!/^[@$/_(){}:;.,A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'branchPassword':
        setBranchPassword(value);
        setBranchPasswordError(!/^[@$*_.,";:{}()/'"A-Za-z0-9\s]{1,10}$/.test(value) || !value);
        break;
      case 'status':
        setStatus(value);
        setStatusError(!/^[A-Za-z\s]{1}$/.test(value) || !value);
        break;
      case 'pfno':
        setPfno(value);
        setPfnoError(!/^[A-Za-z0-9\s]{5,10}$/.test(value) || !value);
        break;
      case 'esino':
        setEsino(value);
        setEsinoError(!/^\d{10,17}$/.test(value) || !value);
        break;
      case 'startDate':
        setStartDate(value);
        setStartDateError(!value);
        break;
      case 'endDate':
        setEndDate(value);
        setEndDateError(!value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setCompanyError(!pnCompanyId);
    setBranchCodeError(!/^[A-Za-z0-9\s]{1,20}$/.test(branchCode) || !branchCode);
    setBranchNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(branchName) || !branchName);
    setAddressLine1Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine1) || !addressLine1);
    setAddressLine2Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine2) || !addressLine2);
    setCityError(!/^[A-Za-z0-9\s]{1,100}$/.test(city) || !city);
    setZipCodeError(!/^[/-{}.,A-Za-z0-9\s]{1,50}$/.test(zipCode) || !zipCode);
    setCountryError(!/^[A-Za-z0-9\s]{1,100}$/.test(country) || !country);
    setStateError(!/^[A-Za-z0-9\s]{1,100}$/.test(state) || !state);
    setPhoneNoError(!/^\d{10}$/.test(phoneNo));
    setFaxNoError(!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(faxNo));
    setEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId));
    setAlternateEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alternateEmailId));
    setBranchUserIdError(!/^[@$/_(){}:;.,A-Za-z0-9\s]{1,10}$/.test(branchUserId) || !branchUserId);
    setBranchPasswordError(!/^[@$*_.,";:{}()/'"A-Za-z0-9\s]{1,10}$/.test(branchPassword) || !branchPassword);
    setStatusError(!/^[A-Za-z\s]{1}$/.test(status));
    setPfnoError(!/^[A-Za-z0-9\s]{5,10}$/.test(pfno));
    setEsinoError(!/^\d{10,17}$/.test(esino));
    setStartDateError(!startDate);
    setEndDateError(!endDate);

    if (companyError || branchCodeError || branchNameError || addressLine1Error || addressLine2Error || cityError || zipCodeError || countryError || stateError || phoneNoError || faxNoError || emailIdError || alternateEmailIdError || branchUserIdError || branchPasswordError || statusError || pfnoError || esinoError || startDateError || endDateError) {
      return;
    }

    try {
      await postRequest(ServerConfig.url, REPORTS, {
        pnCompanyId,
        branchCode,
        branchName,
        addressLine1,
        addressLine2,
        city,
        zipCode,
        country,
        state,
        phoneNo,
        faxNo,
        emailId,
        alternateEmailId,
        branchUserId,
        branchPassword,
        status,
        pfno,
        esino,
        startDate,
        endDate,
      });
      navigate('/success'); // or whatever your success page is
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setCompanyError(!pnCompanyId);
//     setBranchCodeError(!/^[A-Za-z0-9\s]{1,20}$/.test(branchCode) || !branchCode);
//     setBranchNameError(!/^[A-Za-z0-9\s]{1,50}$/.test(branchName) || !branchName);
//     setAddressLine1Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine1) || !addressLine1);
//     setAddressLine2Error(!/^[/-{}(),.A-Za-z0-9\s]{1,100}$/.test(addressLine2) || !addressLine2);
//     setCityError(!/^[A-Za-z0-9\s]{1,100}$/.test(city) || !city);
//     setZipCodeError(!/^[/-{}.,A-Za-z0-9\s]{1,50}$/.test(zipCode) || !zipCode);
//     setCountryError(!/^[A-Za-z0-9\s]{1,100}$/.test(country) || !country);
//     setStateError(!/^[A-Za-z0-9\s]{1,100}$/.test(state) || !state);
//     setPhoneNoError(phoneNo.replace(/\D/g, '').length !== 10);
//     setFaxNoError(!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(faxNo));
//     setEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId));
//     setAlternateEmailIdError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alternateEmailId));
//     setBranchUserIdError(!/^[@$/_(){}:;.,A-Za-z0-9\s]{1,10}$/.test(branchUserId) || !branchUserId);
//     setBranchPasswordError(!/^[@$*_.,";:{}()/'"A-Za-z0-9\s]{1,10}$/.test(branchPassword) || !branchPassword);
//     setStatusError(!/^[A-Za-z\s]{1}$/.test(status) || !status);
//     setPfnoError(!/^[A-Za-z0-9\s]{5,10}$/.test(pfno) || !pfno);
//     setEsinoError(!/^\d{10,17}$/.test(esino) || !esino);
//     setStartDateError(!startDate);
//     setEndDateError(!endDate);

//     if (
//       !pnCompanyId ||
//       branchCodeError ||
//       branchNameError ||
//       addressLine1Error ||
//       addressLine2Error ||
//       cityError ||
//       zipCodeError ||
//       countryError ||
//       stateError ||
//       phoneNoError ||
//       faxNoError ||
//       emailIdError ||
//       alternateEmailIdError ||
//       branchUserIdError ||
//       branchPasswordError ||
//       statusError ||
//       pfnoError ||
//       esinoError ||
//       startDateError ||
//       endDateError
//     ) {
//       return;
//     }

//     const branchData = {
//       pnCompanyId,
//       branchCode,
//       branchName,
//       addressLine1,
//       addressLine2,
//       city,
//       zipCode,
//       country,
//       state,
//       phoneNo,
//       faxNo,
//       emailId,
//       alternateEmailId,
//       branchUserId,
//       branchPassword,
//       status,
//       pfno,
//       esino,
//       startDate,
//       endDate,
//     };

//     try {

//       const query = `
//       INSERT INTO [dbo].[paym_Branch] 
// ([pn_CompanyID], [BranchCode], [BranchName], [Address_Line1], [Address_Line2], [City], [State], [Country], [ZipCode], [Phone_No], [Fax_No], [Email_Id], [AlternateEmail_Id], [Branch_User_Id], [Branch_Password], [status], [PFno], [Esino], [start_date], [end_date])
// VALUES 
// ('${branchData.values.pnCompanyId}', '${branchData.values.branchCode}', '${branchData.values.branchName}', '${branchData.values.addressLine1}', '${branchData.values.addressLine2}', '${branchData.values.city}', '${branchData.values.state}', '${branchData.values.country}', '${branchData.values.zipCode}', '${branchData.values.phoneNo}', '${branchData.values.faxNo}', '${branchData.values.emailId}', '${branchData.values.alternateEmailId}', '${branchData.values.branchUserId}', '${branchData.values.branchPassword}', '${branchData.values.status || ''}', '${branchData.values.pfno || ''}', '${branchData.values.esino || ''}', '${branchData.values.startDate}', '${branchData.values.endDate}') `;

//       await postRequest(ServerConfig.url, REPORTS,  { query });
//       alert('Data Submitted Successfully');
//       navigate('/some-route'); // Update with your desired route
//     } catch (error) {
//       console.error('Error submitting data:', error);
//       alert('Failed to submit data');
//     }
//   };


  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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
                  Enter Branch Details
                </Typography>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ marginBottom: 3 }}>
          <Tab label="General Information" />
                    <Tab label="Address Details" />
                    <Tab label="Contact Details" />
                    <Tab label="Additional Info" />
          </Tabs>
          <Card sx={{ width: "750px", padding: "15px" }}>
            <form onSubmit={handleSubmit}>
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth error={companyError}>
                    {/* <InputLabel >Company ID</InputLabel> */}
                      <select
                        name="pnCompanyId"
                        value={pnCompanyId}
                        onChange={handleChange}
                        required
                        style={{ height: '50px' }}
                        InputLabelProps={{
                          shrink: true}}
                      >
                        <option value="" disabled>
                          Select Company
                        </option>
                        {company.map((c) => (
                          <option key={c.pnCompanyId} value={c.pnCompanyId}>
                            {c.companyName}
                          </option>
                        ))}
                      </select>
                      {companyError && <FormHelperText>Company is required</FormHelperText>}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="branchCode"
                      label="Branch Code"
                      value={branchCode}
                      onChange={handleChange}
                      fullWidth
                      error={branchCodeError}
                      helperText={branchCodeError && 'Branch Code is required'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      name="branchName"
                      label="Branch Name"
                      value={branchName}
                      onChange={handleChange}
                      fullWidth
                      error={branchNameError}
                      helperText={branchNameError && 'Branch Name is required'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
      <TextField
        name="branchUserId"
        label="Branch User ID"
        value={branchUserId}
        onChange={handleChange}
        fullWidth
        error={branchUserIdError}
        helperText={branchUserIdError && 'Branch User ID is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="branchPassword"
        label="Branch Password"
        type="password"
        value={branchPassword}
        onChange={handleChange}
        fullWidth
        error={branchPasswordError}
        helperText={branchPasswordError && 'Branch Password is required'}
      />
    </Grid>
                </Grid>
              )}
            {tabValue === 1 && (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={4}>
      <TextField
        name="addressLine1"
        label="Address Line 1"
        value={addressLine1}
        onChange={handleChange}
        fullWidth
        error={addressLine1Error}
        helperText={addressLine1Error && 'Address Line 1 is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="addressLine2"
        label="Address Line 2"
        value={addressLine2}
        onChange={handleChange}
        fullWidth
        error={addressLine2Error}
        helperText={addressLine2Error && 'Address Line 2 is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
         name="city"
         label="City"
         value={city}
         onChange={handleChange}
         fullWidth
         error={cityError}
         helperText={cityError && 'City is required'}
       
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="zipCode"
        label="ZIP Code"
        value={zipCode}
        onChange={handleChange}
        fullWidth
        error={zipCodeError}
        helperText={zipCodeError && 'ZIP Code is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
         name="country"
         label="Country"
         value={country}
         onChange={handleChange}
         fullWidth
         error={countryError}
         helperText={countryError && 'Country is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
         name="state"
         label="State"
         value={state}
         onChange={handleChange}
         fullWidth
         error={stateError}
         helperText={stateError && 'State is required'}
      />
    </Grid>
  </Grid>
)}

{tabValue === 2 && (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={4}>
      <TextField
        name="phoneNo"
        label="Phone Number"
        value={phoneNo}
        onChange={handleChange}
        fullWidth
        error={phoneNoError}
        helperText={phoneNoError && 'Phone Number is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="faxNo"
        label="Fax Number"
        value={faxNo}
        onChange={handleChange}
        fullWidth
        error={faxNoError}
        helperText={faxNoError && 'Fax Number is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="emailId"
        label="Email ID"
        value={emailId}
        onChange={handleChange}
        fullWidth
        error={emailIdError}
        helperText={emailIdError && 'Valid Email ID is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="alternateEmailId"
        label="Alternate Email ID"
        value={alternateEmailId}
        onChange={handleChange}
        fullWidth
        error={alternateEmailIdError}
        helperText={alternateEmailIdError && 'Valid Alternate Email ID is required'}
      />
    </Grid>
  
  </Grid>
)}

{tabValue === 3 && (
  <Grid container spacing={3}>
    <Grid item xs={12} sm={4}>
      <TextField
        name="status"
        label="Status"
        value={status}
        onChange={handleChange}
        fullWidth
        error={statusError}
        helperText={statusError && 'Status is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="pfno"
        label="PF Number"
        value={pfno}
        onChange={handleChange}
        fullWidth
        error={pfnoError}
        helperText={pfnoError && 'PF Number is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="esino"
        label="ESI Number"
        value={esino}
        onChange={handleChange}
        fullWidth
        error={esinoError}
        helperText={esinoError && 'Valid ESI Number is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="startDate"
        label="Start Date"
        type="date"
        value={startDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        error={startDateError}
        helperText={startDateError && 'Start Date is required'}
      />
    </Grid>
    <Grid item xs={12} sm={4}>
      <TextField
        name="endDate"
        label="End Date"
        type="date"
        value={endDate}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        error={endDateError}
        helperText={endDateError && 'End Date is required'}
      />
    </Grid>
  </Grid>
)}

              <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Box>
            </form>
          </Card>
       </Container>
       </Grid>
       </Box>
       </div>
       </Grid>
       </Grid>
  );
}

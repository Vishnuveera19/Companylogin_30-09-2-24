import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import PaySlipTemplate from "./paysliptemplate";
import PaySlipFormTemplate from "./paysliptemplateform";
import PayslipNewFormat from "./PayslipNewFormat";
//import { Checkbox, FormControlLabel } from "@material-ui/core";
function Elegant() {
  return (
    <center>
      {" "}
      <PaySlipFormTemplate
        header="NewTech Corp"
        Address="TNHB Colony, Otteri, Chennai-600012"
        month="July"
        Fathersname="Padmanaban"
        Designation="Software Engineer"
        Dateofjoining="2023-07-12"
        DOB="1980-09-23"
        payperiod="July 2024"
        paydate="2024-07-08"
        empno="e001"
        grade="A"
        Branch="Kellys"
        BankNo="IOBA100"
        Standarddays="12"
        Gender="Male"
        PanNo="PAN123"
        Location="Chennai"
        BankName="Indian Overseas Bank"
        Refunddays="3"
        Name="Sailesh"
        Department="Software"
        Branchcode="B001"
        Lopdays="21"
        PFNo="PF12"
        BasicMR="25000.00"
        BasicCM="24600.00"
        BasicArrears="1000.00"
        BasicTotal="24600.00"
        PTtotal="200.00"
        OtherAllowance="10000"
        ConveyanceAllMR="800.00"
        ConveyanceAllCM="800.00"
        ConveyanceAllArrears="800.00"
        ConveyanceAllTotal="800.00"
        GITotal="150.00"
        HouseRentAllMR="3750.00"
        HouseRentAllCM="3750.00"
        HouseRentAllArrears="3750.00"
        HouseRentAllTotal="3750.00"
        PFtotal="900.00"
        FixedAllMR="3750.00"
        FixedAllCM="3750.00"
        FixedAllArrears="3750.00"
        FixedAllTotal="3750.00"
        ITtotal="500.00"
        LeaveTAllMR="3750.00"
        LeaveTAllCM="3750.00"
        LeaveTAllArrears="3750.00"
        LeaveTAllTotal="3750.00"
        MedicalAllMR="3750.00"
        MedicalAllCM="3750.00"
        MedicalAllArrears="3750.00"
        MedicalAllTotal="3750.00"
        SuperAllMR="3750.00"
        SuperAllCM="3750.00"
        SuperAllArrears="3750.00"
        SuperAllTotal="3750.00"
        GrossEarnings="12000"
        NetSalary=" 43150.00"
        paiddays="29"
        LOPdays="2"
        ChildrenAllowance="200"
        PF="1250"
        TotalDeductions="12000"
      />
    </center>
  );
}

function Tabular({ data }) {
  console.log("table ", data);
  return (
    <PaySlipTemplate
      companyname={data.companyName}
      Month="July"
      EmpNo="e001"
      Name="Sailesh"
      FathersName="Padmanaban"
      Designation="Software Engineer"
      Location="Chennai"
      MonthOfPay="July"
      DateOfBirth="1980-09-23"
      DateOfJoining="2023-07-12"
      CalcDays="31"
      Paiddays="29"
      Presentdays="29"
      Absentdays="2"
      Leavedays="0"
      Holidays="1"
      BaicMR="100"
      BasicCM="1000"
      BasicTotal="100"
      Weekoffdays="8"
      Allowance1="HRA"
      Allowance2="Housing"
      Allowance3="Transport"
      Allowance4="Conveyance"
      Allowance5="Medical"
      Allowance6="Children Education"
      Allowance7="Dearness"
      Allowance8="Performance"
      Allowance9="Shift"
      Allowance10="Communication"
      Value1MR="100"
      Value2MR="200"
      Value3MR="300"
      Value4MR="400"
      Value5MR="500"
      Value6MR="600"
      Value7MR="700"
      Value8MR="800"
      Value9MR="900"
      Value10MR="1000"
      Value1CM="1000"
      Value2CM="900"
      Value3CM="800"
      Value4CM="700"
      Value5CM="600"
      Value6CM="500"
      Value7CM="400"
      Value8CM="300"
      Value9CM="200"
      Value10CM="100"
      Deduction1="ESI EMP"
      Deduction2="Workers Corperation"
      Deduction3="Health Insurance"
      Deduction4="Retirement"
      Deduction5="Life Insurance"
      Deduction6="House Loan"
      Deduction7="Account"
      Deduction8="Loan Repayments"
      Deduction9="Commuter Benefits"
      Deduction10="Damage"
      Deduction1total="100"
      Deduction2total="200"
      Deduction3total="300"
      Deduction4total="400"
      Deduction5total="500"
      Deduction6total="700"
      Deduction7total="600"
      Deduction8total="800"
      Deduction9total="900"
      Deduction10total="1000"
      GrossEarnings="12000"
      NetSalaryPayable="12000"
    />
  );
}

function Classic() {
  return (
    <PayslipNewFormat
      header="NewTech Corp"
      Address="TNHB Colony, Otteri, Chennai-600012"
      month="JULY"
      MonthofPay="July"
      City="Chennai"
      Fathersname="Padmanaban"
      Designation="Software Engineer"
      DOB="1980-09-23"
      Dateofjoining="2023-07-12"
      payperiod="July 2024"
      paydate="2024-07-08"
      empno="e001"
      grade="A"
      Branch="Kellys"
      BankNo="IOBA100"
      Standarddays="12"
      Gender="Male"
      PanNo="PAN123"
      Location="Chennai"
      BankName="Indian Overseas Bank"
      Refunddays="3"
      Name="Sailesh"
      Department="Software"
      Branchcode="B001"
      Lopdays="21"
      PFNo="PF12"
      BasicMR="25000.00"
      BasicCM="24600.00"
      BasicArrears="1000.00"
      BasicTotal="24600.00"
      PTtotal="200.00"
      ConveyanceAllMR="800.00"
      ConveyanceAllCM="800.00"
      ConveyanceAllArrears="800.00"
      ConveyanceAllTotal="800.00"
      GITotal="150.00"
      HouseRentAllMR="3750.00"
      HouseRentAllCM="3750.00"
      HouseRentAllArrears="3750.00"
      HouseRentAllTotal="3750.00"
      PFtotal="900.00"
      FixedAllMR="3750.00"
      FixedAllCM="3750.00"
      FixedAllArrears="3750.00"
      FixedAllTotal="3750.00"
      ITtotal="500.00"
      LeaveTAllMR="3750.00"
      LeaveTAllCM="3750.00"
      LeaveTAllArrears="3750.00"
      LeaveTAllTotal="3750.00"
      MedicalAllMR="3750.00"
      MedicalAllCM="3750.00"
      MedicalAllArrears="3750.00"
      MedicalAllTotal="3750.00"
      SuperAllMR="3750.00"
      SuperAllCM="3750.00"
      SuperAllArrears="3750.00"
      SuperAllTotal="3750.00"
      GrossEarnings="12000"
      NetSalary=" 43150.00"
      paiddays="29"
      LOPdays="2"
      Calcdays="31"
      prsdays="29"
      Absdays="2"
      leavedays="0"
      Holidays="1"
      Weekoffdays="8"
      OtherAllowance="10000"
      OtherDeductions="7000"
      TotalDeductions="12000"
      Actualsalary="25000"
      Earnedbasic="24200"
      TotalEarnings="30000"
      PF="1250"
      ESI="185"
    />
  );
}

const Payslipmonthly = () => {
  const location = useLocation();
  console.log(location.state);
  const ddata = location.state || {};
  console.log("ddata", ddata.paym[0]);
  console.log(location.state.paym);
  const [checked, setChecked] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
  });
  const renderUI = (data) => {
    console.log("render ", data);
    if (checked.checkbox1) {
      return <Tabular data={data.paym[0]} />;
    } else if (checked.checkbox2) {
      return <Elegant />;
    } else if (checked.checkbox3) {
      return <Classic />;
    } else {
      return null;
    }
  };
  const handleCheckboxChange = (event) => {
    setChecked((prevChecked) => {
      const newChecked = { ...prevChecked };
      newChecked[event.target.name] = event.target.checked;
      if (event.target.checked) {
        Object.keys(newChecked).forEach((key) => {
          if (key !== event.target.name) {
            newChecked[key] = false;
          }
        });
      }
      return newChecked;
    });
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.checkbox1}
              onChange={handleCheckboxChange}
              name="checkbox1"
            />
          }
          label="Checkbox 1"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.checkbox2}
              onChange={handleCheckboxChange}
              name="checkbox2"
            />
          }
          label="Checkbox 2"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked.checkbox3}
              onChange={handleCheckboxChange}
              name="checkbox3"
            />
          }
          label="Checkbox 3"
        />
      </Grid>
      {renderUI(ddata)}
    </Grid>
  );

  // return (
  //   <TableContainer
  //     component={Paper}
  //     style={{ maxWidth: "1100px", margin: "auto", padding: "10px" }}>
  //     <Box
  //       border={4}
  //       borderColor="black"
  //       borderRadius={1}
  //       style={{ padding: "10px" }}>
  //       <Typography variant="h5" align="center" gutterBottom>
  //         HESPERUS AUTOMATION PVT LTD.
  //       </Typography>
  //       <Typography variant="h6" align="center" gutterBottom>
  //         Payslip for the month of ____________, 2012
  //       </Typography>
  //     </Box>
  //     <Box
  //       marginTop={"20px"}
  //       border={4}
  //       borderColor="black"
  //       borderRadius={1}
  //       style={{ padding: "10px" }}>
  //       <Grid container spacing={2}>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Emp No.: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Gender: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Name: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Grade: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Pan No.: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Department: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong> Att. Branch: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Location: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Att. Brc Code: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Bank A/C No.: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Bank Name: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>LOP Days: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>Standard Days: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong> Refund Days: _______________</strong>
  //           </Typography>
  //         </Grid>
  //         <Grid item xs={4}>
  //           <Typography variant="body1">
  //             <strong>PF No.: _______________</strong>
  //           </Typography>
  //         </Grid>
  //       </Grid>
  //     </Box>
  //     <Table
  //       size="small"
  //       aria-label="earnings and deductions"
  //       style={{ marginTop: "20px" }}>
  //       <TableHead style={{ border: "4px solid black" }}>
  //         <TableRow style={{ border: "4px solid black" }}>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong> Earnings</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Monthly Rate</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Current Month</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Arrears</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Total</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Deductions</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Total</strong>
  //           </TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody style={{ border: "4px solid black" }}>
  //         <TableRow>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Basic</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>7500.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>7500.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>7500.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Profession Tax</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>200.00</strong>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Conveyance Allowance</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>800.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>800.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>800.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Group Insurance</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>150.00</strong>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>House Rent Allow.</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>3750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>3750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>3750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Provident Fund</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>900.00</strong>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Fixed Allowance</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>3750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>3750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>3750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Income Tax</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Leave Travel Allowance</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>1250.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>1250.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>1250.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Medical</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>1250.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>1250.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>1250.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>Superannuation Allowance</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}>
  //             <strong>750.00</strong>
  //           </TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //           <TableCell style={{ borderRight: "4px solid black" }}></TableCell>
  //         </TableRow>
  //         <TableRow style={{ border: "4px solid black" }}>
  //           <TableCell>
  //             <strong>Total</strong>
  //           </TableCell>
  //           <TableCell></TableCell>
  //           <TableCell></TableCell>
  //           <TableCell>
  //             <strong>Gross Earnings</strong>
  //           </TableCell>
  //           <TableCell>
  //             <strong>1250.00</strong>
  //           </TableCell>
  //           <TableCell></TableCell>
  //         </TableRow>
  //         <TableRow style={{ border: "4px solid black" }}>
  //           <TableCell colSpan={4}>
  //             <strong>Net Salary Payable</strong>
  //           </TableCell>
  //           <TableCell>
  //             <strong>17800.00</strong>
  //           </TableCell>
  //         </TableRow>
  //         <TableRow>
  //           <TableCell colSpan={8}>
  //             <strong>
  //               {" "}
  //               Net Salary Payable (In words): Seventeen Thousand Eight Hundred
  //               Only
  //             </strong>
  //           </TableCell>
  //         </TableRow>
  //       </TableBody>
  //     </Table>
  //     <Typography variant="body2" align="center" style={{ marginTop: "16px" }}>
  //       <strong>
  //         *Net Salary payable also subject to deductions as per Income Tax Law
  //       </strong>
  //     </Typography>
  //   </TableContainer>
  // );
};

export default Payslipmonthly;

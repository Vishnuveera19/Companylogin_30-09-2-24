import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
  Button,
  FormControlLabel,
  Checkbox,
  IconButton,
  Drawer,
} from "@mui/material";
import {
  PAYMPAYBILL,
  PAYMEMPLOYEE,
  PAYMEMPLOYEEPROFILE1,
  REPORTS,
  PAYMEMPLOYEEWORKDETAILS,
} from "../../serverconfiguration/controllers";
import { useState, useEffect } from "react";
import { ServerConfig } from "../../serverconfiguration/serverconfig";
import { getRequest, postRequest } from "../../serverconfiguration/requestcomp";
import { useLocation } from "react-router-dom";
import generatePDF from "react-to-pdf";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const PayslipNewFormat = (props) => {
  const targetRef = useRef();

  const [data, setdata] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [employeeprofile, setemployeeprofile] = useState([]);
  const [totalsalary, setTotalSalary] = useState([{}]);
  const [employeework, setemployeework] = useState([]);
  const [elegant, setelegant] = useState(false);
  const [format, setformat] = useState(false);
  const [showName, setShowName] = useState(true);
  const [showDesignation, setShowDesignation] = useState(true);
  const [showcompanyname, setshowcompanyname] = useState(true);
  const [showaddressname, setshowaddressname] = useState(true);
  const [showmonth, setshowmonth] = useState(true);
  const [licence, setlicence] = useState(true);
  const [form, setform] = useState(true);
  const [rollNo, setRollno] = useState(true);
  const [location1, setlocation] = useState(true);
  const [fathersn, setfathersname] = useState(true);
  const [monthofpay, setMonthofpay] = useState(true);
  const [dateofbirth, setDateofbirth] = useState(true);
  const [dateofjoining, setDateofjoining] = useState(true);
  const [calcDays, setCalcdays] = useState(true);
  const [paidDays, setPaiddays] = useState(true);
  const [prsDays, setPrsdays] = useState(true);
  const [absentDays, setAbsentdays] = useState(true);
  const [leavedays, setLeavedays] = useState(true);
  const [Holidays, setHolidays] = useState(true);
  const [weekOffDays, setWeekoffdays] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const history = useNavigate();

  const handlepayslipelegant = (event) => {
    setelegant(event.target.checked);
    if (event.target.checked) {
      history("/payslipelegant");
    }
  };

  const handlepayslipformat = (event) => {
    setformat(event.target.checked);
    if (event.target.checked) {
      history("/payslipmonthly");
    }
  };

  const handleNameChange = (event) => {
    setShowName(event.target.checked);
  };

  const handleDesignationChange = (event) => {
    setShowDesignation(event.target.checked);
  };

  const handlecompanynamechange = (event) => {
    setshowcompanyname(event.target.checked);
  };

  const handleadressname = (event) => {
    setshowaddressname(event.target.checked);
  };

  const handlemonthname = (event) => {
    setshowmonth(event.target.checked);
  };

  const handlelicence = (event) => {
    setlicence(event.target.checked);
  };

  const handleform = (event) => {
    setform(event.target.checked);
  };

  const handlerollno = (event) => {
    setRollno(event.target.checked);
  };

  const handlelocation = (event) => {
    setlocation(event.target.checked);
  };

  const handlefn = (event) => {
    setfathersname(event.target.checked);
  };

  const handlemonthofpay = (event) => {
    setMonthofpay(event.target.checked);
  };

  const handledob = (event) => {
    setDateofbirth(event.target.checked);
  };

  const handledoj = (event) => {
    setDateofjoining(event.target.checked);
  };

  const handlecalcdays = (event) => {
    setCalcdays(event.target.checked);
  };

  const handlepaiddays = (event) => {
    setPaiddays(event.target.checked);
  };

  const handleprsdays = (event) => {
    setPrsdays(event.target.checked);
  };

  const handleAbsdays = (event) => {
    setAbsentdays(event.target.checked);
  };

  const handleleavedays = (event) => {
    setLeavedays(event.target.checked);
  };

  const handleHolidays = (event) => {
    setHolidays(event.target.checked);
  };

  const handleweekoffdays = (event) => {
    setWeekoffdays(event.target.checked);
  };

  const roundUpValue = (value, decimals = 2) => {
    const multiplier = Math.pow(10, decimals);
    return Math.ceil(value * multiplier) / multiplier;
  };

  const today = new Date().toLocaleDateString();

  function getMonthName(monthNumber) {
    const monthNames = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return monthNames[monthNumber - 1];
  }

  const location = useLocation();

  const { pnEmployeeId, employeeCode, dDate, month, year } =
    location.state || {};

  useEffect(() => {
    async function getData() {
      const data = await getRequest(ServerConfig.url, PAYMPAYBILL);
      setdata(data.data);
      const employee = await getRequest(ServerConfig.url, PAYMEMPLOYEE);
      setEmployee(employee.data);
      const employeeprofile = await getRequest(
        ServerConfig.url,
        PAYMEMPLOYEEPROFILE1
      );
      setemployeeprofile(employeeprofile.data);
      const employeework = await getRequest(
        ServerConfig.url,
        PAYMEMPLOYEEWORKDETAILS
      );
      setemployeework(employeework.data);
      const totalsalary = await postRequest(ServerConfig.url, REPORTS, {
        query: `EXEC FinalSalaryCalculation2 @EmployeeCode = '${employeeCode}', @Month = ${month}, @Year = ${year}, @D_dates = '${dDate}'`,
      });
      setTotalSalary(totalsalary.data);
    }
    console.log(totalsalary);

    getData();
  }, [pnEmployeeId, employeeCode, month, year, dDate]);

  const handlesave = async () => {
    const checkQuery = `SELECT COUNT(*) as count FROM [dbo].[Final_Salary] WHERE [pn_CompanyID] = ${paympaybill.pnCompanyId} AND [pn_BranchID] = ${paympaybill.pnBranchId} AND [pn_EmployeeID] = ${pnEmployeeId} AND [Month] = '${month}' AND [Year] = '${year}'`;

    try {
      const checkResponse = await postRequest(ServerConfig.url, REPORTS, {
        query: checkQuery,
      });

      const exists = checkResponse.data[0].count > 0;

      if (exists) {
        alert("Payslip already Generated.");
      } else {
        const insertQuery = `INSERT INTO [dbo].[Final_Salary]([pn_CompanyID],[pn_BranchID],[pn_EmployeeID],[EmployeeCode],[Employee_First_Name],[DesignationName],[DepartmentName],[GradeName],[CategoryName],[JoiningDate],[d_date],[Month],[Year],[Earn_Amount],[Ded_Amount],[NetPay],[Earned_Basic],[Gross_salary],[Net_salary],[EPF],[FPF],[period_code],[max_amount],[Act_Basic],[Calc_Days],[Paid_Days],[Present_Days],[Absent_Days],[WeekOffDays],[Holidays],[TotLeave_Days],[ot_hrs],[ot_value],[ot_amt],[Allowance1],[value1],[Allowance2],[value2],[Allowance3],[value3],[Allowance4],[value4],[Allowance5],[value5],[Allowance6],[value6],[Allowance7],[value7],[Allowance8],[value8],[Allowance9],[value9],[Allowance10],[value10],[Deduction1],[valueA1],[Deduction2],[valueA2],[Deduction3],[valueA3],[Deduction4],[valueA4],[Deduction5],[valueA5],[Deduction6],[valueA6],[Deduction7],[valueA7],[Deduction8],[valueA8],[Deduction9],[valueA9],[Deduction10],[valueA10],[CompanyName],[Address_line1],[Address_Line2],[City],[Zipcode]) VALUES(${paympaybill.pnCompanyId},${paympaybill.pnBranchId},${pnEmployeeId},'${employeeCode}','${paympaybill.employeeFirstName}','${paympaybill.designationName}','${paympaybill.departmentName}','${paympaybill.gradeName}','${paympaybill.categoryName}','${paympaybill.joiningDate}','${paympaybill.dDate}','${month}','${year}',${paympaybill.earnAmount},${paympaybill.dedAmount},${totalsalary[0].MonthlySalary},${paympaybill.earnedBasic},${paympaybill.grossSalary},${paympaybill.netSalary},${paympaybill.epf},${paympaybill.fpf},'${paympaybill.periodCode}',${paympaybill.maxAmount},${paympaybill.actBasic},${paympaybill.calcDays},${paympaybill.paidDays},${paympaybill.presentDays},${paympaybill.absentDays},${paympaybill.weekOffDays},${paympaybill.holidays},${paympaybill.totLeaveDays},'${paympaybill.otHrs}',${paympaybill.otValue},${paympaybill.otAmt},'${paympaybill.allowance1}',${paympaybill.value1},'${paympaybill.allowance2}',${paympaybill.value2},'${paympaybill.allowance3}',${paympaybill.value3},'${paympaybill.allowance4}',${paympaybill.value4},'${paympaybill.allowance5}',${paympaybill.value5},'${paympaybill.allowance6}',${paympaybill.value6},'${paympaybill.allowance7}',${paympaybill.value7},'${paympaybill.allowance8}',${paympaybill.value8},'${paympaybill.allowance9}',${paympaybill.value9},'${paympaybill.allowance10}',${paympaybill.value10},'${paympaybill.deduction1}',${paympaybill.valueA1},'${paympaybill.deduction2}',${paympaybill.valueA2},'${paympaybill.deduction3}',${paympaybill.valueA3},'${paympaybill.deduction4}',${paympaybill.valueA4},'${paympaybill.deduction5}',${paympaybill.valueA5},'${paympaybill.deduction6}',${paympaybill.valueA6},'${paympaybill.deduction7}',${paympaybill.valueA7},'${paympaybill.deduction8}',${paympaybill.valueA8},'${paympaybill.deduction9}',${paympaybill.valueA9},'${paympaybill.deduction10}',${paympaybill.valueA10},'${paympaybill.companyName}','${paympaybill.addressLine1}','${paympaybill.addressLine2}','${paympaybill.city}',${paympaybill.zipcode})`;

        await postRequest(ServerConfig.url, REPORTS, {
          query: insertQuery,
        });

        alert("Record inserted successfully.");
      }
    } catch (error) {
      console.error("Error performing database operation:", error);
      alert("An error occurred while saving the record.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const employeeCode1 = employeeCode;
  const empId = pnEmployeeId;
  const d_date = dDate;

  const paympaybill = data.find(
    (emp) => emp.employeeCode == employeeCode1 && emp.dDate == d_date
  );
  const employeetable = employee.find(
    (emp) => emp.employeeCode == employeeCode1
  );
  const employeePtable = employeeprofile.find(
    (emp) => emp.pnEmployeeId == empId
  );
  const employeewtable = employeework.find((emp) => emp.pnEmployeeId == empId);

  return (
    <>
      <div ref={targetRef}>
        <IconButton
          onClick={handleDrawerToggle}
          style={{ marginLeft: "1200px" }}>
          <Typography
            variant="subtitle-1"
            color={"black"}
            style={{ fontSize: "18px" }}>
            Preference
          </Typography>
          <MenuIcon color="blue" style={{ marginLeft: "5px" }} />
        </IconButton>

        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box width={250} role="presentation">
            <Box mb={2} mt={2}>
              <Typography variant="subtitle1" align="left" mt={1}>
                Choose Headers
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showName}
                      onChange={handleNameChange}
                      name="showName"
                    />
                  }
                  label="Name"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showDesignation}
                      onChange={handleDesignationChange}
                      name="showDesignation"
                    />
                  }
                  label="Designation"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showcompanyname}
                      onChange={handlecompanynamechange}
                      name="showCompanyName"
                    />
                  }
                  label="CompanyName"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showaddressname}
                      onChange={handleadressname}
                      name="showaddressName"
                    />
                  }
                  label="AddressName"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={showmonth}
                      onChange={handlemonthname}
                      name="showMonthYearName"
                    />
                  }
                  label="MonthYear"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={licence}
                      onChange={handlelicence}
                      name="showlicence"
                    />
                  }
                  label="Licence"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form}
                      onChange={handleform}
                      name="showform"
                    />
                  }
                  label="Form"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rollNo}
                      onChange={handlerollno}
                      name="showrollno"
                    />
                  }
                  label="Rollno"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={location1}
                      onChange={handlelocation}
                      name="showlocation"
                    />
                  }
                  label="Location"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fathersn}
                      onChange={handlefn}
                      name="showfathersn"
                    />
                  }
                  label="Fathers Name"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={monthofpay}
                      onChange={handlemonthofpay}
                      name="showMOP"
                    />
                  }
                  label="MonthofPay"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dateofbirth}
                      onChange={handledob}
                      name="showDOB"
                    />
                  }
                  label="DateofBirth"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dateofjoining}
                      onChange={handledoj}
                      name="showDOJ"
                    />
                  }
                  label="DateofJoining"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={calcDays}
                      onChange={handlecalcdays}
                      name="showCalcdays"
                    />
                  }
                  label="Calculated Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={paidDays}
                      onChange={handlepaiddays}
                      name="showPaiddays"
                    />
                  }
                  label="Paid Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={prsDays}
                      onChange={handleprsdays}
                      name="showprsdays"
                    />
                  }
                  label="Present Days"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={absentDays}
                      onChange={handleAbsdays}
                      name="showabsdays"
                    />
                  }
                  label="Absent Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={leavedays}
                      onChange={handleleavedays}
                      name="showleavedays"
                    />
                  }
                  label="Leave Days"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Holidays}
                      onChange={handleHolidays}
                      name="showholidays"
                    />
                  }
                  label="Holidays"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={weekOffDays}
                      onChange={handleweekoffdays}
                      name="showWeekoffdays"
                    />
                  }
                  label="Weekoffdays"
                />
              </Box>
            </Box>
          </Box>
        </Drawer>

        <Paper
          style={{
            padding: "20px",
            margin: "20px",
            border: "2px solid black",
          }}>
          {showcompanyname && (
            <Typography variant="h4" align="center">
              {props.header}
            </Typography>
          )}
          {showaddressname && (
            <Typography variant="subtitle1" align="center">
              {props.Address}
            </Typography>
          )}
          {showmonth && (
            <Typography variant="h6" align="center">
              SERVICE CARD CUM PAYSLIP FOR THE MONTH OF {props.month} {year}
            </Typography>
          )}
          <Box
            display="grid"
            gridTemplateColumns="1fr auto 1fr"
            alignItems="center">
            <Box gridColumn="2">
              {form && (
                <Typography variant="h6" align="center">
                  FORM XIX
                </Typography>
              )}
            </Box>
            <Box gridColumn="3" textAlign="right">
              {licence && (
                <Typography variant="h6">Licence No.: CH 6934</Typography>
              )}
            </Box>
          </Box>

          <Divider
            sx={{
              borderBottomWidth: 2,
              borderColor: "black",
              marginBottom: "20px",
            }}
          />

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center">
            <Grid item xs={3} container direction="column" alignItems="left">
              {rollNo && (
                <Typography variant="h6" align="left">
                  Roll No.: {props.empno}
                </Typography>
              )}
              {location1 && (
                <Typography variant="h6" align="left">
                  Location: {props.City}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3} container direction="column" alignItems="center">
              {showName && (
                <Typography variant="h6" align="center">
                  Name: {props.Name}
                </Typography>
              )}
              {showDesignation && (
                <Typography variant="h6" align="center">
                  Designation: {props.Designation}
                </Typography>
              )}
              {fathersn && (
                <Typography variant="h6" align="center">
                  F / H's Name: {props.Fathersname}
                </Typography>
              )}
            </Grid>
            <Grid item xs={3}>
              {monthofpay && (
                <Typography variant="h6" align="right">
                  Month of Pay: {props.payperiod}
                </Typography>
              )}
              {dateofbirth && (
                <Typography variant="h6" align="right">
                  Date of Birth: {props.DOB}
                </Typography>
              )}
              {dateofjoining && (
                <Typography variant="h6" align="right">
                  Date of Joining: {props.Dateofjoining}{" "}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderBottomWidth: 2,
              borderColor: "black",
              marginTop: "20px",
            }}
          />

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginTop={"20px"}>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {calcDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Calc Days: {props.Calcdays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {paidDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Paid Days: {props.paiddays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {prsDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Prs Days: {props.prsdays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {absentDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Abs Days: {props.Absdays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {leavedays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Leave Days: {props.leavedays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {Holidays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Holidays: {props.Holidays}
                </Typography>
              )}
            </Grid>
            <Grid item xs={1.71} container direction="column" alignItems="left">
              {weekOffDays && (
                <Typography align="left" style={{ fontSize: "20px" }}>
                  Weekoff Days: {props.Weekoffdays}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Divider
            sx={{
              borderBottomWidth: 2,
              borderColor: "black",
              marginTop: "30px",
            }}
          />

          <TableContainer component={Paper} style={{ marginTop: "30px" }}>
            <Table>
              <TableHead>
                <TableRow style={{ border: "3px solid black" }}>
                  <TableCell
                    style={{ border: "3px solid black", fontSize: "18px" }}>
                    Rate of Pay
                  </TableCell>
                  <TableCell
                    style={{ border: "3px solid black", fontSize: "18px" }}>
                    Earnings
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>Deductions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ border: "3px solid black" }}>
                <TableRow>
                  <TableCell style={{ border: "3px solid black" }}>
                    <Typography style={{ fontSize: "18px" }}>
                      BASIC PAY: {props.BasicCM}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      HRA: {props.HouseRentAllCM}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 2: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 3: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 4: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 5: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 6: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 7: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 8: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 9: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 10: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ marginTop: "50px", fontSize: "18px" }}>
                      Actual Salary: {props.Actualsalary}
                    </Typography>
                  </TableCell>
                  <TableCell style={{ border: "3px solid black" }}>
                    <Typography style={{ fontSize: "18px" }}>
                      EARNED BASIC: {props.Earnedbasic}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      HRA: {props.HouseRentAllCM}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 2: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 3: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 4: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 5: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 6: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 7: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 8: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 9: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Allowance 10: {props.OtherAllowance}
                    </Typography>
                    <Typography style={{ marginTop: "50px", fontSize: "18px" }}>
                      Total Earnings: {props.TotalEarnings}{" "}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography style={{ fontSize: "18px" }}>
                      PF: {props.PF}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      ESI: {props.ESI}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction2 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction3 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction4 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction5 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction6 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction7 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction8 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction9 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ fontSize: "18px" }}>
                      Deduction10 : {props.OtherDeductions}
                    </Typography>
                    <Typography style={{ marginTop: "50px", fontSize: "18px" }}>
                      Total Deductions: {props.TotalDeductions}{" "}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow style={{ border: "3px solid black" }}>
                  <TableCell style={{ fontSize: "18px" }}>
                    GrossPay: ₹ {props.GrossEarnings}{" "}
                  </TableCell>
                  <TableCell style={{ fontSize: "18px" }}>
                    Netpay: ₹ {props.NetSalary}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginTop={"20px"}>
            <Grid item xs={4} container direction="column" alignItems="left">
              <Typography align="left" style={{ fontSize: "18px" }}>
                Pay Date : {props.paydate}
              </Typography>
            </Grid>
            <Grid item xs={4} container direction="column" alignItems="center">
              <Typography align="left" style={{ fontSize: "18px" }}>
                Employer Signature
              </Typography>
            </Grid>
            <Grid item xs={4} container direction="column" alignItems={"right"}>
              <Typography align="right" style={{ fontSize: "18px" }}>
                Employee Signature
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlesave}
          style={{ marginRight: "680px", marginLeft: "10px" }}>
          Save
        </Button>
        <Button
          variant="contained"
          onClick={() => generatePDF(targetRef, { filename: "Payslip.pdf" })}>
          Download Pdf
        </Button>
      </Box>
    </>
  );
};

export default PayslipNewFormat;

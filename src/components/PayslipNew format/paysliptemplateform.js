import {
  Container,
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Grid,
  TableCell,
  TableRow,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableContainer,
  FormControlLabel,
  Checkbox,
  Drawer,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";

import { Fragment } from "react";

export default function PaySlipFormTemplate(props) {
  const [showName, setShowName] = useState(true);
  const [showDesignation, setShowDesignation] = useState(true);
  const [showcompanyname, setshowcompanyname] = useState(true);
  const [showaddressname, setshowaddressname] = useState(true);
  const [showmonth, setshowmonth] = useState(true);
  const [rollNo, setRollno] = useState(true);
  const [location1, setlocation] = useState(true);
  const [fathersn, setfathersname] = useState(true);
  const [Dateofjoining, setdoj] = useState(true);
  const [DateofBirth, setdob] = useState(true);
  const [payperiod, setpayperiod] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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

  const handlerollno = (event) => {
    setRollno(event.target.checked);
  };

  const handlelocation = (event) => {
    setlocation(event.target.checked);
  };

  const handlefn = (event) => {
    setfathersname(event.target.checked);
  };

  const handledoj = (event) => {
    setdoj(event.target.checked);
  };

  const handledob = (event) => {
    setdob(event.target.checked);
  };

  const handlepayperiod = (event) => {
    setpayperiod(event.target.checked);
  };

  const styleobj = {
    container: {
      fontSize: "14px",
    },

    card: {
      padding: "20px",
    },

    header: {
      fontSize: "16px",
    },

    body: {
      fontSize: "20px",
    },
    empnetpay: {
      fontSize: "20px",
      marginLeft: "32px",
    },

    head: {
      fontSize: "30px",
    },

    divider: {
      backgroundColor: "#2E8AB1",
      marginTop: "10px",
      height: "2px",
    },

    tablecellhead: {
      fontSize: "18px",
      border: "2px solid black",
      width: "33.33%",
    },

    emppaysummary: {
      fontSize: "26px",
    },

    netpay: {
      fontSize: "30px",
      marginLeft: "38px",
    },

    tablecell: {
      border: "2px solid black",
    },

    typo: {
      fontSize: "20px",
    },
  };
  return (
    <center>
      <div style={styleobj.container}>
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
                      checked={rollNo}
                      onChange={handlerollno}
                      name="showrollno"
                    />
                  }
                  label="EmployeeCode"
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
                      checked={Dateofjoining}
                      onChange={handledoj}
                      name="showdoj"
                    />
                  }
                  label="Date Of Joining"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={DateofBirth}
                      onChange={handledob}
                      name="showdob"
                    />
                  }
                  label="Date Of Birth"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={payperiod}
                      onChange={handlepayperiod}
                      name="showpayperiod"
                    />
                  }
                  label="Pay Period"
                />
              </Box>
            </Box>
          </Box>
        </Drawer>
        <Container maxWidth="md" style={styleobj.container}>
          <Card style={styleobj.card}>
            <CardContent>
              <Box textAlign="left" marginLeft={"20px"} mb={2}>
                {showcompanyname && (
                  <Typography
                    variant="h5"
                    color="primary"
                    style={styleobj.head}>
                    {props.header}
                  </Typography>
                )}
                {showaddressname && (
                  <Typography variant="subtitle1">{props.Address}</Typography>
                )}
                <Divider style={styleobj.divider} />
              </Box>
              <Box textAlign="left" marginLeft={"20px"} mb={2}>
                <Grid container spacing={2} alignItems="flex-start">
                  <Grid item xs={12}>
                    {showmonth && (
                      <Typography variant="h6" gutterBottom>
                        Payslip for the month of {props.month}, 2020
                      </Typography>
                    )}
                    <Typography
                      variant="h6"
                      color="primary"
                      align="left"
                      style={styleobj.emppaysummary}>
                      EMPLOYEE PAY SUMMARY
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {showName && (
                      <Typography
                        variant="body1"
                        align="left"
                        style={styleobj.typo}>
                        <strong>Employee Name:</strong> {props.Name}
                      </Typography>
                    )}
                    {rollNo && (
                      <Typography
                        variant="body1"
                        align="left"
                        style={styleobj.typo}>
                        <strong>Employee Code:</strong> {props.empno}
                      </Typography>
                    )}
                    {showDesignation && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong>Designation:</strong> {props.Designation}
                      </Typography>
                    )}
                    {fathersn && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong>FathersName:</strong> {props.Fathersname}
                      </Typography>
                    )}
                    {Dateofjoining && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Date of Joining:</strong> {props.Dateofjoining}
                      </Typography>
                    )}
                    {DateofBirth && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Date of Birth:</strong> {props.DOB}
                      </Typography>
                    )}
                    {payperiod && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Pay Period:</strong> {props.payperiod}
                      </Typography>
                    )}
                    {location1 && (
                      <Typography variant="body1" style={styleobj.typo}>
                        <strong> Location:</strong> {props.Location}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" style={styleobj.empnetpay}>
                      Employee Net Pay
                    </Typography>
                    <Typography variant="h6" style={styleobj.netpay}>
                      <strong>₹{props.NetSalary}</strong>
                    </Typography>
                    <Typography variant="body1" style={styleobj.body}>
                      Paid Days: <strong>{props.paiddays}</strong> | LOP Days:{" "}
                      <strong>{props.LOPdays}</strong>
                    </Typography>
                  </Grid>
                </Grid>
                <Divider style={styleobj.divider} />
              </Box>
              <Box textAlign="left" marginLeft={"20px"} mb={2}>
                <Fragment>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong>Earnings</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong> Amount</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Basic</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.BasicCM}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>House Rent Allowance</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.HouseRentAllCM}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 2</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong> ₹{props.ConveyanceAllCM}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 3</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong> ₹{props.ChildrenAllowance}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 4</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.OtherAllowance}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 5</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.OtherAllowance}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 6</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.OtherAllowance}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 7</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.OtherAllowance}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 8</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.OtherAllowance}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 9</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.OtherAllowance}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Allowance 10</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.OtherAllowance}</strong>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Gross Earnings</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong> ₹{props.GrossEarnings}</strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TableContainer
                    component={Paper}
                    style={{ marginTop: "20px" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong>Deductions</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecellhead}>
                            <strong>Amount</strong>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>PF</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.ITtotal}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>ESI</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.PF}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 2</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 3</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 4</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 5</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 6</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 7</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 8</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 9</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={styleobj.tablecell}>
                            <strong>Deduction 10</strong>
                          </TableCell>
                          <TableCell style={styleobj.tablecell}>
                            <strong>₹{props.TotalDeductions}</strong>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Fragment>
                <Box mt={4}>
                  <Typography variant="body1">
                    NET PAY (Gross Earnings - Total Deductions) + Reimbursements
                  </Typography>
                  <Typography variant="h6">₹{props.NetSalary}</Typography>
                  <Typography variant="body1">
                    Total Net Payable: <strong>₹{props.NetSalary}</strong>{" "}
                    (Rupees Forty-three thousand one hundred and fifty only)
                  </Typography>
                </Box>
                <Divider sx={{ my: 4 }} />
                <Typography variant="body2" align="center">
                  - This is a system generated payslip -
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </div>
    </center>
  );
}

import { Grid, Card, TextField, Button, Typography, Box, CardContent, FormControl, InputLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { PAYMEMPLOYEE, PAYMCOMPANIES, PAYMBRANCHES, PAYMLEAVE } from '../../serverconfiguration/controllers';
import { getRequest, postRequest } from '../../serverconfiguration/requestcomp';
import { ServerConfig } from '../../serverconfiguration/serverconfig';
import { useNavigate } from 'react-router-dom';
import { REPORTS } from '../../serverconfiguration/controllers';

export default function PaymLeaveMaster() {
    const navigate = useNavigate();
    const [company, setCompany] = useState([]);
    const [branch, setBranch] = useState([]);
    const [pnCompanyId, setPnCompanyId] = useState("");
    const [vLeaveName, setVLeaveName] = useState("");
    const [pnLeaveCode, setPnLeaveCode] = useState("");
    const [pnCount, setPnCount] = useState("");
    const [status, setStatus] = useState("");
    const [pnBranchId, setPnBranchId] = useState("");
    const [annualLeave, setAnnualLeave] = useState("");
    const [maxDays, setMaxDays] = useState("");
    const [el, setEl] = useState("");
    const [type, setType] = useState("");

    const [errors, setErrors] = useState({});

    const validate = () => {
        let temp = {};
        temp.pnCompanyId = pnCompanyId ? "" : "Company ID is required.";
        temp.vLeaveName = vLeaveName.length > 0 && vLeaveName.length <= 40 ? "" : "Leave Name must be between 1 and 40 characters.";
        temp.pnLeaveCode = vLeaveName.length > 0 && pnLeaveCode.length <= 10 ? "" : "Leave Code must be between 1 and 10 characters.";
        temp.pnCount = Number.isInteger(parseInt(pnCount)) && parseInt(pnCount) > 0 ? "" : "Count must be a positive integer.";
        temp.status = status.length === 1 ? "" : "Status must be a single character.";
        temp.pnBranchId = pnBranchId ? "" : "Branch ID is required.";
        temp.annualLeave = annualLeave.length > 0 && annualLeave.length <= 30 ? "" : "Annual Leave must be between 1 and 30 characters.";
        temp.maxDays = Number.isInteger(parseInt(maxDays)) && parseInt(maxDays) > 0 ? "" : "Max Days must be a positive integer.";
        temp.el = el.length > 0 && el.length <= 6 ? "" : "EL must be between 1 and 6 characters.";
        temp.type = type.length > 0 && type.length <= 10 ? "" : "Type must be between 1 and 10 characters.";

        setErrors(temp);
        return Object.values(temp).every(x => x === "");
    };

    const handleSave = async () => {
        if (validate()) {
            try {
                const response = await postRequest(ServerConfig.url, REPORTS, {
                    query: `INSERT INTO [dbo].[paym_leave] ([pn_CompanyID],[v_leaveName],[pn_leaveCode],[pn_Count],[status],[pn_BranchID],[annual_leave],[max_days],[EL],[Type]) VALUES (${pnCompanyId},'${vLeaveName}','${pnLeaveCode}',${pnCount},'${status}',${pnBranchId},'${annualLeave}',${maxDays},'${el}','${type}')`,
                });

                if (response.status === 200) {
                    alert('Data saved successfully');
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
            const data = await getRequest(ServerConfig.url, PAYMCOMPANIES);
            setCompany(data.data);
            const data1 = await getRequest(ServerConfig.url, PAYMBRANCHES);
            setBranch(data1.data);
        }
        getData();
    }, []);

    return (
        <Box sx={{ padding: '40px 10px', maxWidth: 600, margin: '0 auto' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" align="center" color="primary" gutterBottom>
                        PAYM LEAVE
                    </Typography>
                    <form>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel shrink>Company</InputLabel>
                                    <select
                                        name="pnCompanyId"
                                        onChange={(e) => setPnCompanyId(e.target.value)}
                                        style={{ height: '50px' }}
                                    >
                                        <option value="">Select</option>
                                        {company.map((e) => <option key={e.pnCompanyId} value={e.pnCompanyId}>{e.pnCompanyId}</option>)}
                                    </select>
                                    {errors.pnCompanyId && <Typography color="error">{errors.pnCompanyId}</Typography>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel shrink>Branch ID</InputLabel>
                                    <select
                                        name="branchId"
                                        onChange={(e) => setPnBranchId(e.target.value)}
                                        style={{ height: '50px' }}
                                    >
                                        <option value="">Select</option>
                                        {branch.map((e) => <option key={e.pnBranchId} value={e.pnBranchId}>{e.pnBranchId}</option>)}
                                    </select>
                                    {errors.pnBranchId && <Typography color="error">{errors.pnBranchId}</Typography>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="vLeaveName"
                                        label="Leave Name"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setVLeaveName(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.vLeaveName}
                                        helperText={errors.vLeaveName}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="pnLeaveCode"
                                        label="Leave Code"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setPnLeaveCode(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.pnLeaveCode}
                                        helperText={errors.pnLeaveCode}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="pnCount"
                                        label="Count"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setPnCount(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.pnCount}
                                        helperText={errors.pnCount}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="status"
                                        label="Status"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setStatus(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.status}
                                        helperText={errors.status}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="annualLeave"
                                        label="Annual Leave"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setAnnualLeave(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.annualLeave}
                                        helperText={errors.annualLeave}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="maxDays"
                                        label="Max Days"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setMaxDays(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.maxDays}
                                        helperText={errors.maxDays}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="el"
                                        label="EL"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setEl(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.el}
                                        helperText={errors.el}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        name="type"
                                        label="Type"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        onChange={(e) => setType(e.target.value)}
                                        InputLabelProps={{ shrink: true }}
                                        error={!!errors.type}
                                        helperText={errors.type}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Submit
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
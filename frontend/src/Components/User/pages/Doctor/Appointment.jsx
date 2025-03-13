import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { getpatient } from "../../slices/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import KhaltiCheckout from "khalti-checkout-web";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Styled components for cleaner table design
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokens = localStorage.getItem("jwt");

  const [id, setId] = useState(null);
  const [report, setReport] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const appointment = useSelector((state) => state.patient);

  const fetchPatientData = () => {
    dispatch(getpatient());
  };

  useEffect(() => {
    fetchPatientData();
  }, [dispatch, id]);

  const MakePayment = async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/patient/payment",
        { status: "paid", _id: id },
        { headers: { authorization: tokens } }
      );

      toast.success("Payment successful!");
      setReport(true);
      setId(null);
    } catch (error) {
      console.log(error.message);
      toast.error("Payment failed!");
    }
  };

  const khaltiConfig = {
    publicKey: "test_public_key_2a7f2e2188034b8c8afe09bba670bd67",
    productIdentity: "123766",
    productName: "My Ecommerce Store",
    productUrl: "http://localhost:3000",
    eventHandler: {
      onSuccess: (payload) => {
        console.log(payload);
        MakePayment(id);
      },
      onError: (error) => {
        console.log(error);
      },
      onClose: () => {
        console.log("Payment widget closed");
      },
    },
    paymentPreference: ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  };

  const checkout = new KhaltiCheckout(khaltiConfig);

  useEffect(() => {
    if (id && selectedInvoice) {
      checkout.show({ amount: selectedInvoice * 100 });
    }
  }, [id, selectedInvoice]);

  return (
    <Grid container direction="column" alignItems="center" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Dashboard
      </Typography>

      <TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Doctor's Name</StyledTableCell>
              <StyledTableCell align="left">Disease</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Invoice</StyledTableCell>
              <StyledTableCell align="left">Payment</StyledTableCell>
              <StyledTableCell align="left">Report</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointment?.list?.user_appointments?.map((item) => (
              <StyledTableRow key={item._id}>
                <StyledTableCell align="left">{item?.doctor?.name}</StyledTableCell>
                <StyledTableCell align="left">{item?.disease}</StyledTableCell>
                <StyledTableCell align="left">{moment.utc(item?.date).format('MM/DD/YYYY')}</StyledTableCell>
                <StyledTableCell align="left">{item?.doctor?.ammount}</StyledTableCell>
                <StyledTableCell align="left">
                  {item?.payment !== "paid" ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setId(item?._id);
                        setSelectedInvoice(item?.doctor?.ammount);
                      }}
                    >
                      Pay Via Khalti
                    </Button>
                  ) : (
                    <Typography color="success.main">Paid</Typography>
                  )}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item?.payment === "paid" ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/report/${item._id}`)}
                    >
                      View Report
                    </Button>
                  ) : (
                    <Typography color="error.main">Pending...</Typography>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

import React, { useState, useEffect } from "react";
import {
  TableChartIcon,
  InsertChartIcon,
  StackedLineChartIcon,
} from "../../icons";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { BarChart, LineChart, Header } from "../../components";
import { useBarChartData } from "../../context/BarChartDataIncomeContext";
import { useLineChartData } from "../../context/LineChartDataIncomeContext";

const Income = () => {
  const [selectedView, setSelectedView] = useState("table");
  const [payments, setPayments] = useState([]);
  const dataBarChart = useBarChartData();
  const dataLineChart = useLineChartData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        const data = await response.json();
        const incomePayments = data.filter(
          (payment) => payment.type === "Income"
        );
        incomePayments.sort((b, a) => new Date(a.date) - new Date(b.date));
        setPayments(incomePayments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderSelectedView = () => {
    switch (selectedView) {
      case "grid":
        return <Box height="75vh">Hello</Box>;
      case "barchart":
        return (
          <Box height="75vh">
            <BarChart
              data={dataBarChart}
              legendText="Year"
              dataKeys={["Salary"]}
            />
          </Box>
        );
      case "linechart":
        return (
          <Box height="75vh">
            <LineChart data={dataLineChart} legendText="Year" />
          </Box>
        );
      case "table":
        return (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Label</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment._id}>
                    <TableCell>
                      {new Date(payment.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>{`€${payment.amount}`}</TableCell>
                    <TableCell>{payment.category}</TableCell>
                    <TableCell>{payment.label}</TableCell>
                    <TableCell>{payment.note}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return <Typography>No view selected</Typography>;
    }
  };

  return (
    <Container>
      <Box m="20px" display="flex" justifyContent="space-between">
        <Header title="Incomes" />
        <Box display="flex" alignItems="center">
          <IconButton
            color={selectedView === "table" ? "primary" : "default"}
            onClick={() => setSelectedView("table")}
          >
            <TableChartIcon />
          </IconButton>
          <IconButton
            color={selectedView === "barchart" ? "primary" : "default"}
            onClick={() => setSelectedView("barchart")}
          >
            <InsertChartIcon />
          </IconButton>
          <IconButton
            color={selectedView === "linechart" ? "primary" : "default"}
            onClick={() => setSelectedView("linechart")}
          >
            <StackedLineChartIcon />
          </IconButton>
        </Box>
      </Box>
      {renderSelectedView()}
    </Container>
  );
};

export default Income;

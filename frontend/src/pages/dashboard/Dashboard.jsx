import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LineChart, BarChart, ProgressCircle, StatBox } from "../../components";
import { usePaymentData } from "../../context/DashboardPaymentDataContext";
import { useExpensesData } from "../../context/ExpensesDataContext";
import { useIncomeData } from "../../context/IncomeDataContext";
import { useProfitData } from "../../context/ProfitContext";
import { useBarChartData as useBarChartDataMonth } from "../../context/BarChartDataContext";
import { useBarChartData as useBarChartDataDays } from "../../context/BarChartDataDaysContext";
import { useLineChartData as useLineChartDataMonth } from "../../context/LineChartDataContext";
import { useLineChartData as useLineChartDataDays } from "../../context/LineChartDataDaysContext";
import { Header } from "../../components";
import { AddIcon } from "../../icons";

const Dashboard = ({ openModal }) => {
  const { paymentData } = usePaymentData();
  const { currentMonthExpenses, yearExpenses } = useExpensesData();
  const { monthlyTotals, yearlyTotals } = useIncomeData();
  const { currentMonthProfit, currentYearProfit } = useProfitData();
  const dataLineChartMonth = useLineChartDataMonth();
  const dataLineChartDays = useLineChartDataDays();
  const dataBarChartMonth = useBarChartDataMonth();
  const dataBarChartDays = useBarChartDataDays();

  const [filteredData, setFilteredData] = useState(dataLineChartMonth);
  const [filteredBarChartData, setFilteredBarChartData] =
    useState(dataBarChartMonth);
  const [filterType, setFilterType] = useState("Year");
  const [legendText, setLegendText] = useState("Month");

  useEffect(() => {
    filterByYear();
  }, [dataLineChartMonth]);

  const filterByYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setFilteredData(dataLineChartMonth);
    setFilteredBarChartData(dataBarChartMonth);
    setFilterType("Year");
    setLegendText(currentYear.toString());
  };

  const filterByMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    setFilteredData(dataLineChartDays);
    setFilteredBarChartData(dataBarChartDays);
    setFilterType("Month");
    setLegendText(currentMonth);
  };

  const sortedPaymentData = [...paymentData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const recentTransactions = sortedPaymentData.slice(0, 5);

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 398px)",
  });

  const totalEarned =
    filterType === "Month"
      ? monthlyTotals.length > 0
        ? monthlyTotals
        : 0
      : yearlyTotals.length > 0
      ? yearlyTotals
      : 0;

  return (
    <Box mx="20px">
      <Box className="flex justify-between align-center">
        {isDesktopOrLaptop && <Header title="Dashboard" />}

        <Container>
          {!isDesktopOrLaptop && (
            <>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="150px"
              >
                <Box>
                  <Typography sx={{ fontSize: "12px" }}>
                    Primary · EUR
                  </Typography>
                  <Box display="flex" alignItems="end" justifyContent="center">
                    <Typography sx={{ fontSize: "20px", marginRight: "3px" }}>
                      4400
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>€</Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  borderRadius: "12px",
                  bgcolor: "#141B2D",
                  padding: "10px",
                  marginBottom: "10px",
                  color: "white",
                }}
                onClick={openModal}
              >
                <IconButton borderRadius="50%">
                  <AddIcon sx={{ color: "white" }} />
                </IconButton>
                <Typography sx={{ fontSize: "15px", marginLeft: "2px" }}>
                  Add transaction
                </Typography>
              </Box>
            </>
          )}
          {isDesktopOrLaptop && (
            <Box display="flex" gap="5px">
              <Button
                size="small"
                variant={filterType === "Month" ? "contained" : "outlined"}
                color="primary"
                onClick={filterByMonth}
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                    borderColor: "primary.main",
                    color: "white",
                    variant: "contained",
                  },
                }}
              >
                Month
              </Button>
              <Button
                variant={filterType === "Year" ? "contained" : "outlined"}
                color="primary"
                onClick={filterByYear}
                sx={{
                  "&:hover": {
                    backgroundColor: "primary.main",
                    borderColor: "primary.main",
                    color: "white",
                    variant: "contained",
                  },
                }}
              >
                Year
              </Button>
            </Box>
          )}
        </Container>
      </Box>
      <Box gap="16px">
        {/* ROW 1 */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(6, 1fr)",
            sm: "repeat(6, 1fr)",
            md: "repeat(6, 1fr)",
            lg: "repeat(12, 1fr)",
          }}
          gridAutoRows="140px"
          gap="16px"
        >
          {/* StatBox */}
          <Box
            gridColumn="span 3"
            backgroundColor="#141B2D"
            color="#EDEDED"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
          >
            <StatBox
              title={`€${totalEarned}`}
              subtitle="Earn"
              progress="0.20"
              stats="14%"
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="#141B2D"
            color="#EDEDED"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
          >
            <StatBox
              title={`€${
                filterType === "Month" ? currentMonthExpenses : yearExpenses
              }`}
              subtitle="Expenses"
              progress="0.50"
              stats="21%"
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="#141B2D"
            color="#EDEDED"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
          >
            <StatBox
              title="€32,41/€10k"
              subtitle="Saved"
              progress="0.30"
              stats="5%"
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="#141B2D"
            color="#EDEDED"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="10px"
          >
            <StatBox
              title="€732"
              subtitle="Others"
              progress="0.80"
              stats="43%"
            />
          </Box>
        </Box>

        {/* SECOND ROW */}
        <Box
          marginTop={2}
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            lg: "repeat(12, 1fr)",
          }}
          gridAutoRows="140px"
          gap="16px"
        >
          {/* Line Chart */}
          <Box
            gridColumn={{ md: "span 12", lg: "span 8" }}
            gridRow="span 2"
            color="#EDEDED"
            borderRadius="10px"
            className="hidden lg:block"
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography variant="h6" fontWeight="600" color="#141B2D">
                  Line Chart
                </Typography>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart
                isDashboard={true}
                data={filteredData}
                legendText={legendText}
              />
            </Box>
          </Box>

          {/* Transactions */}
          <Box
            gridColumn={{ md: "span 12", lg: "span 4" }}
            gridRow="span 2"
            overflow="auto"
          >
            <Box
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid #141B2D"`}
              colors="gray"
              p="15px"
              borderRadius="10px"
            >
              {isDesktopOrLaptop && (
                <Typography
                  color="#141B2D"
                  fontWeight="600"
                  m={1}
                  sx={{ fontSize: { xs: "1.2rem", md: "1,5rem" } }}
                >
                  Recent Transactions
                </Typography>
              )}

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 350 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="right">Category</TableCell>
                      <TableCell align="left">Label</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentTransactions.slice(0, 5).map((transaction) => (
                      <TableRow
                        key={transaction._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="transaction">
                          {transaction.date}
                        </TableCell>
                        <TableCell align="right">
                          {transaction.category}
                        </TableCell>
                        <TableCell align="left">{transaction.label}</TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: String(transaction.amount).includes("-")
                              ? "red"
                              : "green",
                          }}
                        >
                          <Box className="bg-gray-100 rounded-full py-1 d-flex justify-center">
                            {transaction.amount}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>

        {/* THIRD ROW */}
        <Box
          marginTop={2}
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr",
            md: "repeat(6, 1fr)",
            lg: "repeat(12, 1fr)",
          }}
          gridAutoRows="140px"
          gap="16px"
        >
          {/* OPTIMIZED */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor="#141B2D"
            p="30px"
            borderRadius="10px"
            className="hidden lg:block"
          >
            <Typography variant="h4" fontWeight="600" color="#EDEDED">
              Profit: {currentMonthProfit}€
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography color="#EDEDED" sx={{ mt: "15px" }}></Typography>
            </Box>
          </Box>

          {/* BAR CHART */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            borderRadius="10px"
            className="hidden lg:block"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
              color="#141B2D"
            >
              Bar Chart
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart
                isDashboard={true}
                data={filteredBarChartData}
                legendText={legendText}
                dataKeys={["House", "Food", "Transportation", "Personal"]}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {!isDesktopOrLaptop && (
        <Box height="300px" mt="-20px">
          <BarChart
            isDashboard={true}
            data={filteredBarChartData}
            dataKeys={["House", "Food", "Transportation", "Personal"]}
          />
        </Box>
      )}
      {!isDesktopOrLaptop && (
        <Box height="250px" m="-20px 0 0 0">
          <LineChart
            isDashboard={true}
            data={filteredData}
            legendText={legendText}
            isMobile={true}
          />
        </Box>
      )}
      {!isDesktopOrLaptop && (
        <Box display="flex" gap="5px" marginY="20px">
          <Button
            size="small"
            variant={filterType === "Month" ? "contained" : "outlined"}
            color="primary"
            onClick={filterByMonth}
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                borderColor: "primary.main",
                color: "white",
                variant: "contained",
              },
            }}
          >
            Month
          </Button>
          <Button
            variant={filterType === "Year" ? "contained" : "outlined"}
            color="primary"
            onClick={filterByYear}
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                borderColor: "primary.main",
                color: "white",
                variant: "contained",
              },
            }}
          >
            Year
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;

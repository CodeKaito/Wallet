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
import { useSavingData } from "../../context/SavingContext";
import { useDebtData } from "../../context/DebtContext";
import { useBarChartData as useBarChartDataMonth } from "../../context/BarChartDataContext";
import { useBarChartData as useBarChartDataDays } from "../../context/BarChartDataDaysContext";
import { useLineChartData as useLineChartDataMonth } from "../../context/LineChartDataContext";
import { useLineChartData as useLineChartDataDays } from "../../context/LineChartDataDaysContext";
import { Header } from "../../components";
import { AddIcon } from "../../icons";

const Dashboard = ({ openModal }) => {
  const { paymentData } = usePaymentData();
  const {
    currentMonthExpenses,
    currentYearExpenses,
    previousMonthExpenses,
    previousYearExpenses,
  } = useExpensesData();
  const {
    monthlyTotals,
    monthlyPreviousTotals,
    yearlyTotals,
    yearlyPreviousTotals,
  } = useIncomeData();
  const {
    currentMonthProfit,
    currentYearProfit,
    previousMonthProfit,
    previousYearProfit,
  } = useProfitData();
  const { savingData } = useSavingData();
  const { debtData } = useDebtData();
  const dataLineChartMonth = useLineChartDataMonth();
  const dataLineChartDays = useLineChartDataDays();
  const dataBarChartMonth = useBarChartDataMonth();
  const dataBarChartDays = useBarChartDataDays();

  const [filteredData, setFilteredData] = useState(dataLineChartMonth);
  const [filteredBarChartData, setFilteredBarChartData] =
    useState(dataBarChartMonth);
  const [filteredProfitData, setFilteredProfitData] =
    useState(currentMonthProfit);
  const [filterType, setFilterType] = useState("Year");
  const [legendText, setLegendText] = useState("Month");
  const [savingAmount, setSavingAmount] = useState(0);
  const [debtAmount, setDebtAmount] = useState(0);

  useEffect(() => {
    filterByYear();
  }, [dataLineChartMonth]);

  const filterByYear = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    setFilteredData(dataLineChartMonth);
    setFilteredBarChartData(dataBarChartMonth);
    setFilteredProfitData(currentYearProfit);
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
    setFilteredProfitData(currentYearProfit);
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
      ? monthlyTotals > 0
        ? monthlyTotals
        : 0
      : yearlyTotals > 0
      ? yearlyTotals
      : 0;

  const filteredTotalEarned =
    filterType === "Month"
      ? monthlyPreviousTotals !== 0
        ? ((monthlyTotals - monthlyPreviousTotals) / monthlyPreviousTotals) *
          100
        : 0
      : yearlyPreviousTotals !== 0
      ? ((yearlyTotals - yearlyPreviousTotals) / yearlyPreviousTotals) * 100
      : 0;

  const totalExpenses =
    filterType === "Month"
      ? currentMonthExpenses > 0
        ? currentMonthExpenses
        : 0
      : currentYearExpenses > 0
      ? currentYearExpenses
      : 0;

  const filteredTotalExpenses =
    filterType === "Month"
      ? previousMonthExpenses !== 0
        ? ((currentMonthExpenses - previousMonthExpenses) /
            previousMonthExpenses) *
          100
        : 0
      : previousYearExpenses !== 0
      ? ((currentYearExpenses - previousYearExpenses) / currentYearExpenses) *
        100
      : 0;

  const filteredTotalProfit =
    filterType === "Month"
      ? previousMonthProfit !== 0
        ? ((currentMonthProfit - previousMonthProfit) / previousMonthProfit) *
          100
        : 0
      : previousYearProfit !== 0
      ? ((currentYearProfit - previousYearProfit) / previousYearProfit) * 100
      : 0;

  const formatValue = (value) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + "k";
    }
    return value.toString();
  };

  useEffect(() => {
    if (savingData.length > 0) {
      setSavingAmount(savingData[0].amount);
    }
  }, [savingData]);

  useEffect(() => {
    if (debtData.length > 0) {
      setDebtAmount(debtData[0].amount);
    }
  }, [debtData]);

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
                      {currentYearProfit}
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
                  borderradius: "12px",
                  bgcolor: "#141B2D",
                  padding: "10px",
                  marginBottom: "10px",
                  color: "white",
                }}
                onClick={openModal}
              >
                <IconButton borderradius="50%">
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
            borderradius="10px"
          >
            <StatBox
              title={`€${formatValue(totalEarned)}`}
              subtitle="Earned"
              progress={`${filteredTotalEarned}`}
              stats={`${filteredTotalEarned}%`}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="#141B2D"
            color="#EDEDED"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderradius="10px"
          >
            <StatBox
              title={`€${formatValue(totalExpenses)}`}
              subtitle="Expenses"
              progress={`${filteredTotalExpenses}`}
              stats={`${filteredTotalExpenses}%`}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="#141B2D"
            color="#EDEDED"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderradius="10px"
          >
            <StatBox
              title={`€${formatValue(filteredProfitData)}/€${formatValue(
                savingAmount
              )}`}
              subtitle="Saved"
              progress={`${filteredProfitData / savingAmount}`}
              stats={`${Math.floor(
                (filteredProfitData * 100) / savingAmount
              )}%`}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="#141B2D"
            color="#EDEDED"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderradius="10px"
          >
            <StatBox
              title={`${formatValue(debtAmount)}`}
              subtitle="Debts"
              progress={`${debtAmount / debtAmount}/100`}
              stats={`${Math.floor(debtAmount / debtAmount / 100)}%`}
            />
          </Box>
        </Box>

        {/* SECOND ROW */}
        <Box
          margintop={2}
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
            gridColumn={{ xs: "span 12", lg: "span 8" }}
            gridRow="span 2"
            color="#EDEDED"
            borderradius="10px"
            className="hidden xs:block"
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
            gridColumn={{ xs: "span 12", lg: "span 4" }}
            gridRow="span 2"
            overflow="auto"
          >
            <Box
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid #141B2D"`}
              colors="gray"
              p="15px"
              borderradius="10px"
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
          margintop={2}
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
            gridColumn={{ xs: "span 12", lg: "span 4" }}
            gridRow="span 2"
            backgroundColor="#141B2D"
            p="30px"
            borderradius="10px"
            className="hidden xs:block"
          >
            <Typography variant="h4" fontWeight="600" color="#EDEDED">
              Profit: €{formatValue(filteredProfitData)}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle
                size="125"
                progress={`${filteredTotalProfit}`}
                stats="20%"
              />
              <Typography color="#EDEDED" sx={{ mt: "15px" }}></Typography>
            </Box>
          </Box>

          {/* BAR CHART */}
          <Box
            gridColumn={{ xs: "span 12", lg: "span 8" }}
            gridRow="span 2"
            borderradius="10px"
            className="hidden xs:block"
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

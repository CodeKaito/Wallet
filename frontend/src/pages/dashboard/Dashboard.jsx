import React from "react";
import {
  Box,
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
import { useBarChartData } from "../../context/BarChartDataContext";
import { useLineChartData } from "../../context/LineChartDataContext";
import { Header } from "../../components";

const Dashboard = () => {
  const { paymentData } = usePaymentData();
  const dataLineChart = useLineChartData();
  const dataBarChart = useBarChartData();
  return (
    <Box mx="20px">
      <Box className="flex justify-between align-center">
        <Header title="Dashboard" />
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
              title="€4450"
              subtitle="Earn"
              progress="0.75"
              increase="+14%"
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
              title="€1121"
              subtitle="Expenses"
              progress="0.50"
              increase="-21%"
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
              title="€32,41"
              subtitle="Saved"
              progress="0.30"
              increase="+5%"
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
              increase="+43%"
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
            gridColumn={{ lg: "span 12", xl: "span 8" }}
            gridRow="span 2"
            color="#EDEDED"
            borderRadius="10px"
            className="hidden xl:block"
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
              <LineChart isDashboard={true} data={dataLineChart} />
            </Box>
          </Box>

          {/* Transactions */}
          <Box
            gridColumn={{ lg: "span 12", xl: "span 4" }}
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
              <Typography
                color="#141B2D"
                fontWeight="600"
                m={1}
                sx={{ fontSize: { xs: "1.2rem", md: "1,5rem" } }}
              >
                Recent Transactions
              </Typography>
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
                    {paymentData.slice(0, 5).map((transaction) => (
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
            sm: "repeat(3, 1fr)",
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
            className="hidden 2xl:block"
          >
            <Typography variant="h5" fontWeight="600" color="#EDEDED">
              Profit
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography color="#EDEDED" sx={{ mt: "15px" }}>
                $48,352 Income Amount
              </Typography>
            </Box>
          </Box>

          {/* BAR CHART */}
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            borderRadius="10px"
            className="hidden 2xl:block"
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
              <BarChart data={dataBarChart} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

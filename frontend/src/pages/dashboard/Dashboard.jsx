import React from "react";
import { Box, Typography } from "@mui/material";
import { LineChart, BarChart, ProgressCircle, StatBox } from "../../components";
import { DataTransactions } from "../../data";
import { Header } from "../../components";

const Dashboard = () => {
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
            gridColumn="span 8"
            gridRow="span 2"
            color="#EDEDED"
            borderRadius="10px"
            className="hidden 2xl:block"
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
                  Revenue Generated
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="#141B2D">
                  $59,342.32
                </Typography>
              </Box>
            </Box>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>

          {/* Transactions */}
          <Box
            gridColumn={{ lg: "span 12", xl: "span 4" }}
            gridRow="span 2"
            overflow="auto"
          >
            <Box
              display="flex"
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
                sx={{ fontSize: { xs: "1.2rem", md: "2rem" } }}
              >
                Recent Transactions
              </Typography>
            </Box>
            {DataTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p="15px"
              >
                <Box
                  color="#141B2D"
                  sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                >
                  {transaction.date}
                </Box>
                <Box>
                  <Typography
                    sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                    color="#141B2D"
                  >
                    {transaction.type}
                  </Typography>
                </Box>

                <Box
                  backgroundColor="#EDEDED"
                  p="5px 10px"
                  borderRadius="4px"
                  style={{
                    width: "70px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}
                >
                  ${transaction.amount}
                </Box>
              </Box>
            ))}
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
              Optimized
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <ProgressCircle size="125" />
              <Typography color="#EDEDED" sx={{ mt: "15px" }}>
                $48,352 revenue generated
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
              Sales Quantity
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

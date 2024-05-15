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

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(12, 1fr)",
        }}
        gridAutoRows="140px"
        gap="16px"
      >
        {/* ROW 1 */}
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
            title="12,361"
            subtitle="Emails Sent"
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
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
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
            title="32,441"
            subtitle="New Clients"
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
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          color="#EDEDED"
          borderRadius="10px"
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

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          overflow="auto"
          borderRadius="10px"
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
            <Typography color="#141B2D" variant="h5" fontWeight="600" m={1}>
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
              <Box color="#141B2D">{transaction.date}</Box>
              <Box>
                <Typography color="#141B2D" variant="h5" fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color="#141B2D">{transaction.type}</Typography>
              </Box>

              <Box
                backgroundColor="#EDEDED"
                p="5px 10px"
                borderRadius="4px"
                style={{ width: "70px" }}
              >
                ${transaction.amount}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor="#141B2D"
          p="30px"
          borderRadius="10px"
        >
          <Typography variant="h5" fontWeight="600" color="#EDEDED">
            Campaign
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
        <Box gridColumn="span 8" gridRow="span 2" borderRadius="10px">
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
  );
};

export default Dashboard;

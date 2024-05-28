import * as React from "react";
import { Table, Box } from "@mui/joy";
import { usePaymentData } from "../../context/DashboardPaymentDataContext";

const TransactionMobile = () => {
  const { paymentData } = usePaymentData();
  const sortedPaymentData = [...paymentData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const recentTransactions = sortedPaymentData.slice(0, 5);
  return (
    <Box p={1} className="h-screen">
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Label</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>{transaction.label}</td>
              <td>
                <span
                  style={{
                    display: "inline-block",
                    padding: "0.5em",
                    borderRadius: "40px",
                    backgroundColor: "#F3F4F6",
                    color: String(transaction.amount).includes("-")
                      ? "red"
                      : "green",
                  }}
                >
                  {transaction.amount}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default TransactionMobile;

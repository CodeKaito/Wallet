import * as React from "react";
import { Table, Box, Button } from "@mui/joy";
import { usePaymentData } from "../../context/DashboardPaymentDataContext";
import { useNavigate } from "react-router-dom";

const TransactionMobile = ({ onUpdateSuccess }) => {
  const { paymentData, refreshData } = usePaymentData();
  const [numItemsToShow, setNumItemsToShow] = React.useState(5);
  const sortedPaymentData = [...paymentData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const recentTransactions = sortedPaymentData.slice(0, numItemsToShow);
  const navigate = useNavigate();

  const handleRowClick = (transactionId) => {
    navigate(`/transactionMobile/${transactionId}`);
  };

  const handleLoadMore = () => {
    setNumItemsToShow((prevNum) => prevNum + 5);
  };

  React.useEffect(() => {
    if (onUpdateSuccess) {
      refreshData();
    }
  }, [onUpdateSuccess, refreshData]);

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
            <tr
              key={transaction._id}
              onClick={() => handleRowClick(transaction._id)}
              style={{ cursor: "pointer" }}
            >
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
      {numItemsToShow < sortedPaymentData.length && (
        <Box display="flex" justifyContent="center" mt={2} pb={10}>
          <Button onClick={handleLoadMore} variant="contained">
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TransactionMobile;

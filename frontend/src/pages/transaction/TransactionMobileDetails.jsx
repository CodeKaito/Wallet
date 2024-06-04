import { Typography, Card, Button, Box } from "@mui/joy";
import React, { useCallback, useState, useEffect } from "react";
import CustomLoader from "../../utils/CustomLoader";
import { ArrowBackIcon } from "../../icons";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";

const TransactionMobileDetails = ({ openUpdateModal, onUpdateSuccess }) => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payment/${transactionId}`
      );
      if (response.ok) {
        const data = await response.json();
        setTransaction(data);
      } else {
        console.error("Error fetching data: Response not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [transactionId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, onUpdateSuccess]);

  const handleGoBack = () => {
    navigate("/transactionMobile");
  };

  if (loading || !transaction) {
    return <CustomLoader />;
  }

  const formattedDate = format(new Date(transaction.date), "d MMM", {
    locale: enGB,
  });

  return (
    <div style={{ padding: "1em" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <ArrowBackIcon onClick={handleGoBack} />
        <Typography level="h2">Transaction Details</Typography>
      </Box>

      <Card variant="outlined" sx={{ maxWidth: 400, mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography level="h1" sx={{ mb: -2 }}>
            €{transaction.amount}
          </Typography>
          <Typography level="h1" sx={{ mb: -2 }}>
            {transaction.type}
          </Typography>
        </Box>

        <Typography level="h5">{formattedDate}</Typography>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 400, mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography level="h5">Category</Typography>
          <Typography level="h5">{transaction.category}</Typography>
        </Box>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 400, mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography level="h5">Label</Typography>
          <Typography level="h5">{transaction.label}</Typography>
        </Box>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 400, mt: 2 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography level="h5">Description</Typography>
          <Typography level="h5">
            {transaction.note || "No description available"}
          </Typography>
        </Box>
      </Card>

      <Box display="flex" justifyContent="end" gap="10px" marginTop="20px">
        <Button
          color="primary"
          size="lg"
          variant="soft"
          onClick={() => openUpdateModal(transaction)}
        >
          Edit
        </Button>
        <Button color="danger" size="lg" variant="soft">
          Delete
        </Button>
      </Box>
    </div>
  );
};

export default TransactionMobileDetails;

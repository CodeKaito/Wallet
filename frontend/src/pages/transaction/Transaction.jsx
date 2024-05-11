import { Box } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { DataTransactions } from "../../data";

const Transaction = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date", headerName: "Date", width: 250 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "note", headerName: "Note", width: 150 },
  ];

  return (
    <Box m="20px">
      <Box className="flex justify-between align-center">
        <Header title="Transactions" />
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid checkboxSelection rows={DataTransactions} columns={columns} />
      </Box>
    </Box>
  );
};

export default Transaction;

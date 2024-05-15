import { Box, Container } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";
import { DataTransactions } from "../../data";

const Transaction = () => {
  const columns = [
    { field: "date", headerName: "Date", resizable: true },
    { field: "amount", headerName: "Amount", resizable: true },
    { field: "type", headerName: "Type", resizable: true, flex: 0.2 },
    { field: "note", headerName: "Note", resizable: true, flex: 1 },
  ];

  return (
    <Container>
      <Box m="20px">
        <Header title="Transactions" />

        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{ display: "grid", gridTemplateColumns: "1fr" }}
        >
          <DataGrid
            checkboxSelection
            rows={DataTransactions}
            columns={columns}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Transaction;

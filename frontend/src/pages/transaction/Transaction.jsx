import { Box, Container } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataTransactions } from "../../data";

const Transaction = () => {
  const columns = [
    {
      field: "category",
      headerName: "Category",
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "label",
      headerName: "Label",
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "payment",
      headerName: "Payment Amount",
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
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
            rows={DataTransactions}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Transaction;

import { Box, Container } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { usePaymentData } from "../../context/PaymentDataContext";

const Transaction = () => {
  const { paymentData } = usePaymentData();
  const columns = [
    {
      field: "date",
      headerName: "Date",
      type: "date",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 120,
    },
    {
      field: "category",
      headerName: "Category",
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 150,
    },
    {
      field: "label",
      headerName: "Label",
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Payment Amount",
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 100,
    },
    {
      field: "note",
      headerName: "Notes",
      type: "number",
      editable: true,
      align: "center",
      headerAlign: "center",
      width: 200,
    },
  ];

  return (
    <Container>
      <Box m="20px">
        <Header title="Expenses list" />

        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{ display: "grid", gridTemplateColumns: "1fr" }}
        >
          <DataGrid
            rows={paymentData.map((row, index) => ({
              ...row,
              id: row.paymentId || index,
            }))}
            columns={columns}
            getRowId={(row) => row._id}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Transaction;

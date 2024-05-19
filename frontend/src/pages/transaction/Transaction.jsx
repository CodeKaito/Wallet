import { Box, Container } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
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
      field: "type",
      headerName: "Type",
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 150,
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
      type: "string",
      editable: true,
      align: "center",
      headerAlign: "center",
      width: 200,
    },
  ];

  console.log(paymentData);

  return (
    <Container>
      <Box m="20px">
        <Header title="Expenses list" />

        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr",
            [`.${gridClasses.cell}.income`]: {
              backgroundColor: "#b9d5ff91",
              color: "#1a3e72",
            },
            [`.${gridClasses.cell}.expenses`]: {
              backgroundColor: "#ff943975",
              color: "#1a3e72",
            },
          }}
        >
          <DataGrid
            rows={paymentData}
            columns={columns}
            getRowId={(row) => row._id}
            slots={{ toolbar: GridToolbar }}
            getCellClassName={(row) => {
              return row.type === "Income"
                ? "income"
                : row.type === "Expenses"
                ? "expenses"
                : "";
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Transaction;

import { Box, Container } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { usePaymentData } from "../../context/PaymentDataContext";
import { format } from "date-fns";

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
      renderCell: (params) => {
        const formattedDate = format(new Date(params.value), "dd/MM/yyyy");
        return formattedDate;
      },
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
      renderCell: (params) => {
        const isExpense = params.row.type === "Expenses";
        const amount = params.value;
        return isExpense ? `-${amount}` : `+${amount}`;
      },
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

        <Box m="40px 0 0 0" height="75vh">
          <DataGrid
            rows={paymentData.map((row, index) => ({
              ...row,
              id: row.paymentId || index,
            }))}
            columns={columns}
            getRowId={(row) => row._id}
            slots={{ toolbar: GridToolbar }}
            initialState={{
              sorting: {
                sortModel: [{ field: "date", sort: "desc" }],
              },
            }}
            getRowClassName={(params) =>
              params.row.type === "Expenses" ? "expensesRow" : "incomeRow"
            }
            sx={{
              "& .expensesRow": {
                bgcolor: "rgb(255, 150, 150)",
                "&:hover": {
                  bgcolor: "rgb(255, 196, 196)",
                },
              },
              "& .incomeRow": {
                bgcolor: "rgb(150, 255, 157)",
                "&:hover": {
                  bgcolor: "rgb(196, 255, 218)",
                },
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Transaction;

import { Box } from "@mui/material";
import { Header } from "../../components";
import { DataGrid } from "@mui/x-data-grid";

const Transaction = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "date", headerName: "Date", width: 250 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "note", headerName: "Note", width: 450 },
  ];

  const rows = [
    {
      id: 1,
      date: "2022-05-01",
      amount: `110€`,
      type: "Deposit",
      note: "Deposito nel conto in banca",
    },
    {
      id: 2,
      date: "2022-05-02",
      amount: `150€`,
      type: "Withdrawal",
    },
    {
      id: 3,
      date: "2022-05-03",
      amount: `20€`,
      type: "Transfer",
    },
    {
      id: 4,
      date: "2022-05-04",
      amount: `120€`,
      type: "Deposit",
    },
    {
      id: 5,
      date: "2022-05-05",
      amount: `180€`,
      type: "Withdrawal",
    },
  ];
  return (
    <Box m="20px">
      <Box className="flex justify-between align-center">
        <Header title="Transactions" />
      </Box>
      <Box m="40px 0 0 0" height="75vh">
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Transaction;

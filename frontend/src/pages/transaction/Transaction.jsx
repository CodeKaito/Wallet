import { Box, Container } from "@mui/material";
import { Header } from "../../components";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DataTransactions as dataTest } from "../../data";
import { useEffect, useState } from "react";

const Transaction = () => {
  const [data, setData] = useState([]);
  const columns = [
    {
      field: "date",
      headerName: "Date",
      type: "date",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
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
      field: "amount",
      headerName: "Payment Amount",
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payments");
        if (response.ok) {
          const data = await response.json();
          setData(data);
          const transformedData = data.map((item) => {
            return {
              ...item,
              date: new Date(item.date),
            };
          });
          setData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data);
  console.log(dataTest);

  const getRowId = (row) => row._id;

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
            rows={data}
            columns={columns}
            getRowId={getRowId}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Transaction;

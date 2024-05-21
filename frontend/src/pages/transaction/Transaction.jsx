import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { Header } from "../../components";
import {
  DataGrid,
  GridToolbar,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { usePaymentData } from "../../context/PaymentDataContext";
import { format } from "date-fns";
import { EditIcon, DeleteIcon, SaveIcon, CancelIcon } from "../../icons";

const Transaction = () => {
  const { paymentData } = usePaymentData();
  const [rows, setRows] = React.useState(
    paymentData.map((row, index) => ({
      ...row,
      id: row.paymentId || index,
    }))
  );

  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/payment/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Errore durante la chiamata di eliminazione");
      }

      setRows(rows.filter((row) => row.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Errore durante la chiamata di eliminazione:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/payment/${newRow._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRow),
        }
      );

      console.log(newRow);

      if (!response.ok) {
        throw new Error("Errore durante la chiamata di aggiornamento");
      }
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      window.location.reload();
      return updatedRow;
    } catch (error) {
      console.error("Errore durante la chiamata di aggiornamento:", error);
      return newRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
      headerName: "Amount",
      type: "number",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 100,
      renderCell: (params) => {
        const isExpense = params.row.type === "Expenses";
        const amount = params.value;
        return isExpense ? `-${amount}€` : `+${amount}€`;
      },
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
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
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
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
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
                bgcolor: "#f09e94",
                "&:hover": {
                  bgcolor: "#e67d72",
                },
              },
              "& .incomeRow": {
                bgcolor: "#bfffb5",
                "&:hover": {
                  bgcolor: "#a6ff9c",
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

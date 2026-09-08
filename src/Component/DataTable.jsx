// src/Components/DataTable.jsx
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export default function DataTable({ rows, columns, loading }) {
  return (
    <Box sx={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        getRowId={(row) => row._id}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
// src/pages/Flights/Flights.jsx
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "../../Component/DataTable";
import ConfirmDialog from "../../Component/ConfirmDialog";
import { getFlights, deleteFlight } from "../../api/flights";

export default function Flights() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const fetchFlights = () => {
    setLoading(true);
    getFlights()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleConfirmDelete = async () => {
    await deleteFlight(toDelete);
    setToDelete(null);
    fetchFlights();
    toast.success("Flight booking deleted");
  };

  const columns = [
    { field: "from", headerName: "From", width: 130 },
    { field: "to", headerName: "To", width: 130 },
    { field: "date", headerName: "Date", width: 150,
      valueFormatter: (value) => new Date(value).toLocaleDateString() },
    { field: "passenger", headerName: "Passenger", width: 160 },
    {
      field: "actions", headerName: "Actions", width: 100,
      renderCell: (params) => (
        <Button size="small" color="error" onClick={() => setToDelete(params.row._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable rows={rows} columns={columns} loading={loading} />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete flight booking?"
        message="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}

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
    {
      field: "image",
      headerName: "",
      width: 90,
      sortable: false,
      renderCell: (params) =>
        params.row.listing?.image ? (
          <img
            src={params.row.listing.image}
            alt=""
            style={{
              width: "100%",
              height: "85%",
              objectFit: "cover",
              borderRadius: 10,
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}
          />
        ) : null,
    },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1.2,
      // Old bookings (pre-migration) have no `listing` at all — the `?.`
      // stops this from throwing when row.listing is undefined, and the
      // `?? "—"` shows a dash instead of a blank cell in that case.
      valueGetter: (value, row) => row.listing?.destination ?? "—",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.6,
      valueGetter: (value, row) => row.listing?.price ?? "—",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    { field: "passenger", headerName: "Passenger", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      renderCell: (params) => (
        <Button size="small" color="error" onClick={() => setToDelete(params.row._id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <DataTable rows={rows} columns={columns} loading={loading} rowHeight={90} />
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
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "../../Component/DataTable";
import ConfirmDialog from "../../Component/ConfirmDialog";
import { getHotels, deleteHotel } from "../../api/hotels";

export default function Hotels() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const fetchHotels = () => {
    setLoading(true);
    getHotels()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleConfirmDelete = async () => {
    await deleteHotel(toDelete);
    setToDelete(null);
    fetchHotels();
    toast.success("Hotel booking deleted");
  };

  const columns = [
    {
      field: "image",
      headerName: "",
      width: 110,
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
      field: "hotelName",
      headerName: "Hotel",
      width: 180,
      // Old bookings (pre-migration) have no `listing` at all — the `?.`
      // stops this from throwing when row.listing is undefined, and the
      // `?? "—"` shows a dash instead of a blank cell in that case.
      valueGetter: (value, row) => row.listing?.hotelName ?? "—",
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      valueGetter: (value, row) => row.listing?.price ?? "—",
    },
    {
      field: "checkIn",
      headerName: "Check-in",
      width: 140,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    {
      field: "checkOut",
      headerName: "Check-out",
      width: 140,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    { field: "guestName", headerName: "Guest", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
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
        title="Delete hotel booking?"
        message="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
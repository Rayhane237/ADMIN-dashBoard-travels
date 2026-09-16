
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "../../Component/DataTable";
import ConfirmDialog from "../../Component/ConfirmDialog";
import ListingFormDialog from "../../Component/ListingFormDialog";
import {
  getHotelListings,
  createHotelListing,
  updateHotelListing,
  deleteHotelListing,
} from "../../api/hotelListings";

const formFields = [
  { name: "hotelName", label: "Hotel Name" },
  { name: "price", label: "Price", type: "number" },
  { name: "image", label: "Image URL" },
  { name: "description", label: "Description", multiline: true },
];

export default function HotelListings() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [editingListing, setEditingListing] = useState(null);

  const fetchListings = () => {
    setLoading(true);
    getHotelListings()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSave = async (values) => {
    if (values._id) {
      await updateHotelListing(values._id, values);
      toast.success("Listing updated");
    } else {
      await createHotelListing(values);
      toast.success("Listing created");
    }
    setEditingListing(null);
    fetchListings();
  };

  const handleConfirmDelete = async () => {
    await deleteHotelListing(toDelete);
    setToDelete(null);
    fetchListings();
    toast.success("Listing deleted");
  };

  const columns = [
    { field: "hotelName", headerName: "Hotel", width: 160 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "description", headerName: "Description", width: 260 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <>
          <Button size="small" sx={{ mr: 1 }} onClick={() => setEditingListing(params.row)}>
            Edit
          </Button>
          <Button size="small" color="error" onClick={() => setToDelete(params.row._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setEditingListing({})}>
        Add Listing
      </Button>

      <DataTable rows={rows} columns={columns} loading={loading} />

      <ListingFormDialog
        open={Boolean(editingListing)}
        initialValues={editingListing}
        fields={formFields}
        onSave={handleSave}
        onCancel={() => setEditingListing(null)}
      />

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete listing?"
        message="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
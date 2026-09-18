
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "../../Component/DataTable";
import ConfirmDialog from "../../Component/ConfirmDialog";
import ListingFormDialog from "../../Component/ListingFormDialog";
import {
  getFlightListings,
  createFlightListing,
  updateFlightListing,
  deleteFlightListing,
} from "../../api/flightListings";


const formFields = [
  { name: "destination", label: "Destination" },
  { name: "price", label: "Price", type: "number" },
  { name: "image", label: "Image URL" },
  { name: "description", label: "Description", multiline: true },
  { name: "isActive", label: "Active", type: "checkbox" },

];

export default function FlightListings() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [editingListing, setEditingListing] = useState(null); // null = dialog closed

  const fetchListings = () => {
    setLoading(true);
    getFlightListings()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleSave = async (values) => {
    if (values._id) {
      await updateFlightListing(values._id, values);
      toast.success("Listing updated");
    } else {
      await createFlightListing(values);
      toast.success("Listing created");
    }
    setEditingListing(null);
    fetchListings();
  };

  const handleConfirmDelete = async () => {
    await deleteFlightListing(toDelete);
    setToDelete(null);
    fetchListings();
    toast.success("Listing deleted");
  };

  const columns = [
    { field: "destination", headerName: "Destination", width: 160 },
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
    {
     field: "isActive",
     headerName: "Active",
     width: 90,
     renderCell: (params) => (params.row.isActive ? "Yes" : "No"),
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
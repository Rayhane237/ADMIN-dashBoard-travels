import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "../../Component/DataTable";
import ConfirmDialog from "../../Component/ConfirmDialog";
import ListingFormDialog from "../../Component/ListingFormDialog";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../api/employees";

const formFields = [
  { name: "name", label: "Name" },
  { name: "job", label: "Job" },
  { name: "image", label: "Image URL" },
];

export default function Employees() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = () => {
    setLoading(true);
    getEmployees()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSave = async (values) => {
    if (values._id) {
      await updateEmployee(values._id, values);
      toast.success("Employee updated");
    } else {
      await createEmployee(values);
      toast.success("Employee created");
    }
    setEditingEmployee(null);
    fetchEmployees();
  };

  const handleConfirmDelete = async () => {
    await deleteEmployee(toDelete);
    setToDelete(null);
    fetchEmployees();
    toast.success("Employee deleted");
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "job", headerName: "Job", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      renderCell: (params) => (
        <>
          <Button size="small" sx={{ mr: 1 }} onClick={() => setEditingEmployee(params.row)}>
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
      <Button variant="contained" sx={{ mb: 2 }} onClick={() => setEditingEmployee({})}>
        Add Employee
      </Button>

      <DataTable rows={rows} columns={columns} loading={loading} />

      <ListingFormDialog
        open={Boolean(editingEmployee)}
        initialValues={editingEmployee}
        fields={formFields}
        onSave={handleSave}
        onCancel={() => setEditingEmployee(null)}
      />

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete employee?"
        message="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
// src/pages/Users/Users.jsx
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "../../Component/DataTable";
import ConfirmDialog from "../../Component/ConfirmDialog";
import { getUsers, deleteUser, updateUserRole } from "../../api/users";

export default function Users() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    getUsers()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    await updateUserRole(id, newRole);
    fetchUsers();
    toast.success(`Role updated to ${newRole}`);
  };

  const handleConfirmDelete = async () => {
    await deleteUser(toDelete);
    setToDelete(null);
    fetchUsers();
    toast.success("User deleted");
  };

  const columns = [
    { field: "fullName", headerName: "Name", width: 160 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "phoneNumber", headerName: "Phone", width: 140 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "actions", headerName: "Actions", width: 220,
      renderCell: (params) => (
        <>
          <Button size="small" sx={{ mr: 2}} onClick={() => handleToggleRole(params.row._id, params.row.role)}>
            {params.row.role === "admin" ? "Demote" : "Promote"}
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
      <DataTable rows={rows} columns={columns} loading={loading} />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete user?"
        message="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
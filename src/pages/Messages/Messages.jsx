// src/pages/Messages/Messages.jsx
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import DataTable from "../../Component/DataTable";
import ConfirmDialog from "../../Component/ConfirmDialog";
import { getMessages, deleteMessage } from "../../api/messages";

export default function Messages() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const fetchMessages = () => {
    setLoading(true);
    getMessages()
      .then((res) => setRows(res.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleConfirmDelete = async () => {
    await deleteMessage(toDelete);
    setToDelete(null);
    fetchMessages();
    toast.success("Message deleted");
  };

  const columns = [
    { field: "name", headerName: "Name", width: 160 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "message", headerName: "Message", width: 300 },
    {
      field: "createdAt",
      headerName: "Sent",
      width: 180,
      valueFormatter: (value) => new Date(value).toLocaleString(),
    },
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
      <DataTable rows={rows} columns={columns} loading={loading} />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete message?"
        message="This can't be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </>
  );
}
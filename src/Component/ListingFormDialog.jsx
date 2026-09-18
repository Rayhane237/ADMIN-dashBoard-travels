// src/Components/ListingFormDialog.jsx
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
} from "@mui/material";

export default function ListingFormDialog({ open, initialValues, fields, onSave, onCancel }) {
  const [values, setValues] = useState(initialValues || {});

  useEffect(() => {
    setValues(initialValues || {});
  }, [initialValues]);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCheckboxChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.checked }));
  };

  const handleSubmit = () => {
    onSave(values);
  };

  const isEditing = Boolean(values._id);

  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? "Edit listing" : "New listing"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {fields.map((field) =>
            field.type === "checkbox" ? (
              <FormControlLabel
                key={field.name}
                control={
                  <Checkbox
                    checked={Boolean(values[field.name])}
                    onChange={handleCheckboxChange(field.name)}
                  />
                }
                label={field.label}
              />
            ) : (
              <TextField
                key={field.name}
                label={field.label}
                type={field.type || "text"}
                value={values[field.name] || ""}
                onChange={handleChange(field.name)}
                fullWidth
                multiline={field.multiline}
                minRows={field.multiline ? 3 : undefined}
              />
            )
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEditing ? "Save changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
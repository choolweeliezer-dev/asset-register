import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert,
} from '@mui/material';
import { usersApi } from '../../api/usersApi';
import { toast } from 'react-toastify';

const initialFormData = {
  fullName: '',
  email: '',
  password: '',
  role: 'USER',
  userCode: '',
};

export default function UserModal({ open, onClose, user, onSuccess }) {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = Boolean(user?.id);

  // Populate form when editing
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        password: '',                    // Never prefill password
        role: user.role || 'USER',
        userCode: user.userCode || '',
      });
    } else {
      setFormData(initialFormData);
    }
    setError('');
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode) {
        // Update user
        const updatePayload = { ...formData };

        // Remove password if empty (don't update password)
        if (!updatePayload.password) {
          delete updatePayload.password;
        }

        await usersApi.update(user.id, updatePayload);
        toast.success('User updated successfully');
      } else {
        // Create new user
        if (!formData.password) {
          setError("Password is required for new users");
          setLoading(false);
          return;
        }
        await usersApi.create(formData);
        toast.success('User created successfully');
      }

      onSuccess();     // Refresh the table
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
      toast.error('Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditMode ? 'Edit User' : 'Create New User'}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>

            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              name="userCode"
              label="User Code"
              value={formData.userCode}
              onChange={handleChange}
              fullWidth
              placeholder="e.g. EMP-001"
            />

            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formData.role}
                label="Role"
                onChange={handleChange}
              >
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="password"
              label={isEditMode ? "New Password (leave empty to keep current)" : "Password"}
              type="password"
              value={formData.password}
              onChange={handleChange}
              required={!isEditMode}
              fullWidth
            />

          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditMode ? 'Update User' : 'Create User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const AddStudentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    studentID: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    grade: "",
    address: "",
    gender: "",
    parentName: "",
    parentContact: "",
    enrollmentDate: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
        maxWidth: 600, // Limits the width of the form
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        overflowY: "auto", // Allows scrolling if content exceeds modal height
        maxHeight: "90vh", // Prevents modal from exceeding viewport height
      }}
    >
      <Typography variant="h5" mb={3}>
        Add Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Each field is wrapped in a Grid item */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Student ID"
              name="studentID"
              value={formData.studentID}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              type="tel"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date of Birth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Grade"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              select
              SelectProps={{
                native: true,
              }}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Parent Name"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Parent Contact"
              name="parentContact"
              value={formData.parentContact}
              onChange={handleChange}
              type="tel"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Enrollment Date"
              name="enrollmentDate"
              value={formData.enrollmentDate}
              onChange={handleChange}
              type="date"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="button"
                onClick={onCancel}
                color="secondary"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Add Student
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddStudentForm;

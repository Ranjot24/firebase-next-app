import { Modal, Box } from "@mui/material";
import AddStudentForm from "./AddStudentForm";

const AddStudentModal = ({ open, onClose, onSubmit }) => {
  const handleAddStudent = (formData) => {
    console.log("Student Data:", formData);
    // Add your Firestore logic to save the data here
    onClose(); // Close the modal after saving
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <AddStudentForm onSubmit={onSubmit} onCancel={onClose} />
      </Box>
    </Modal>
  );
};

export default AddStudentModal;


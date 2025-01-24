import React, { useEffect, useState } from "react"; // Ensure useEffect and useState are only imported once
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material"; // Correct Material-UI imports
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AddStudentModal from "../components/AddStudentModal";
import AddStudentForm from "../components/AddStudentForm";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch students from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const studentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [modalOpen]);

  const handleAddStudent = async (studentData) => {
    try {
      const docRef = await addDoc(collection(db, "students"), studentData);
      console.log("Document written with ID: ", docRef.id);
      setModalOpen(false); // Close modal after submitting
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Student Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Add Student
      </Button>
      <AddStudentModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddStudent}>
      </AddStudentModal>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Enrollment Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.studentID}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.enrollmentDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}


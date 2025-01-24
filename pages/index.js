import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AddStudentModal from "../components/AddStudentModal";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsData);
    };

    fetchStudents();
  }, [modalOpen]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" mb={4}>
        Student Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
        Add Student
      </Button>
      <AddStudentModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <Box mt={4}>
        <Typography variant="h6">Student List</Typography>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.firstName} {student.lastName} ({student.email})
            </li>
          ))}
        </ul>
      </Box>
    </Box>
  );
}

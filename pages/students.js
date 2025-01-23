import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { AiFillEdit, AiFillDelete, AiFillEye } from "react-icons/ai";
import styles from "../styles/students.module.css";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", class: "", section: "", rollNumber: "" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    setStudents(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleAddStudent = async () => {
    try {
      if (editMode) {
        const docRef = doc(db, "students", selectedStudent.id);
        await updateDoc(docRef, newStudent);
      } else {
        await addDoc(collection(db, "students"), newStudent);
      }
      setShowModal(false);
      setNewStudent({ name: "", class: "", section: "", rollNumber: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
    setEditMode(false);
    setSelectedStudent(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setNewStudent(student);
    setEditMode(true);
    setShowModal(true);
  };

  const handleView = (student) => {
    alert(`Viewing Student:
    Name: ${student.name}
    Class: ${student.class}
    Section: ${student.section}
    Roll Number: ${student.rollNumber}`);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className={styles.pageContainer}>
    <Sidebar />
  <div className={styles.content}>
    <h2 className={styles.heading}>Students List</h2>
    <button
      className={styles.addButton}
      onClick={() => {
        setShowModal(true);
        setEditMode(false);
        setNewStudent({ name: "", class: "", section: "", rollNumber: "" });
      }}
    >
      Add Student
    </button>
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>Name</th>
          <th>Class</th>
          <th>Section</th>
          <th>Roll Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.class}</td>
            <td>{student.section}</td>
            <td>{student.rollNumber}</td>
            <td>
              <AiFillEye className={styles.icon} onClick={() => handleView(student)} />
              <AiFillEdit className={styles.icon} onClick={() => handleEdit(student)} />
              <AiFillDelete className={styles.icon} onClick={() => handleDelete(student.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {showModal && (
      <div className={styles.modal}>
        <h3>{editMode ? "Edit Student" : "Add New Student"}</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddStudent();
          }}
        >
          {["name", "class", "section", "rollNumber"].map((field) => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                className={styles.input}
                type="text"
                required
                value={newStudent[field] || ""}
                onChange={(e) => setNewStudent({ ...newStudent, [field]: e.target.value })}
              />
            </div>
          ))}
          <div className={styles.modalButtons}>
            <button className={styles.submitButton} type="submit">
              {editMode ? "Update" : "Submit"}
            </button>
            <button className={styles.cancelButton} type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
</div>
  );
}

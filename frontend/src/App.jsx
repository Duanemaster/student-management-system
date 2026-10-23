import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', course: '', year_level: '' })
  const [editingId, setEditingId] = useState(null) // Bagong state para malaman kung may ine-edit

  // Kunin ang mga estudyante galing sa backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/students')
      setStudents(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  // Patakbuhin ito kapag nag-load ang website
  useEffect(() => {
    fetchStudents()
  }, [])

  // Mag-add (POST) o Mag-update (PUT) ng estudyante
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingId) {
        // Kung may ine-edit, UPDATE request ang gagawin
        await axios.put(`http://127.0.0.1:8000/api/students/${editingId}`, formData)
        setEditingId(null) // I-reset ang edit mode
      } else {
        // Kung walang ine-edit, ADD request ang gagawin
        await axios.post('http://127.0.0.1:8000/api/students', formData)
      }
      fetchStudents() // I-refresh ang listahan
      setFormData({ name: '', email: '', course: '', year_level: '' }) // I-clear ang form
    } catch (error) {
      console.error("Error saving student:", error)
    }
  }

  // Kapag kinlick ang "Edit" button sa table
  const handleEditClick = (student) => {
    setFormData({ name: student.name, email: student.email, course: student.course, year_level: student.year_level })
    setEditingId(student.id)
  }

  // Kapag kinlick ang "Delete" button sa table
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/students/${id}`)
        fetchStudents() // I-refresh ang listahan pagkatapos ma-delete
      } catch (error) {
        console.error("Error deleting student:", error)
      }
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Student Management System</h1>
      
      {/* Form para mag-add o mag-edit ng estudyante */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required style={{ margin: '5px' }}/>
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required style={{ margin: '5px' }}/>
        <input type="text" placeholder="Course" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} required style={{ margin: '5px' }}/>
        <input type="number" placeholder="Year Level" value={formData.year_level} onChange={(e) => setFormData({...formData, year_level: e.target.value})} style={{ margin: '5px' }}/>
        
        {/* Magbabago ang kulay at text ng button kung nag-a-add o nag-e-edit */}
        <button type="submit" style={{ padding: '5px 10px', backgroundColor: editingId ? 'green' : 'blue', color: 'white', border: 'none' }}>
          {editingId ? 'Update Student' : 'Add Student'}
        </button>
        
        {/* Cancel button na lalabas lang kapag nag-e-edit */}
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setFormData({ name: '', email: '', course: '', year_level: '' }) }} style={{ padding: '5px 10px', backgroundColor: 'gray', color: 'white', border: 'none', marginLeft: '5px' }}>
            Cancel
          </button>
        )}
      </form>

      {/* Listahan ng mga Estudyante */}
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Year</th>
            <th>Actions</th> {/* Bagong column */}
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{student.year_level}</td>
              <td>
                <button onClick={() => handleEditClick(student)} style={{ marginRight: '5px', backgroundColor: 'orange', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(student.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px', cursor: 'pointer' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
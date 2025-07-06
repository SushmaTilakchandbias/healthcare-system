import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios.get("http://localhost:8080/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to load users", err));
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/admin/user/${id}`)
      .then(() => loadUsers())
      .catch(err => console.error("Failed to delete user", err));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Role</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td><button onClick={() => deleteUser(u.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;

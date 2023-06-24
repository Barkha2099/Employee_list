import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Employee List</h1>
      <input className="search_box"
        type="text"
        placeholder="Search by first name"
        value={searchText}
        onChange={handleSearch}
      />
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li className="user-item" key={user.id}>
            <div className="user-info">
              <img className="user-avatar" src={user.avatar} alt="Avatar" />
              <span className="user-id">{user.id}</span>
            </div>
            <span className="user-name">{user.first_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

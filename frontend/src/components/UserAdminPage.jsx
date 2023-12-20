/* import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'

const UserTableComponent = () => {
    const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    //console.log('User Id:', user._id)
    const fetchUserBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:7007/api/user`,
          {
            method: 'GET',
            credentials: 'include',
          },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch user bookings')
        }

        const data = await response.json()
        setUsers(data.data || [])
     
      } catch (error) {
        console.log('Error fetching user bookings:', error)
      }
    }

    fetchUserBookings()
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTableComponent;
 */

import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const UserTableComponent = () => {
  const { user: authUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:7007/api/user`,
          {
            method: 'GET',
            credentials: 'include',
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user bookings');
        }

        const data = await response.json();
        setAllUsers(data.data || []);
      } catch (error) {
        console.log('Error fetching user bookings:', error);
      }
    };

    fetchUserBookings();
  }, []); 

 
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Users</h2>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(({ _id, username, email, role }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
     
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(allUsers.length / usersPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTableComponent;


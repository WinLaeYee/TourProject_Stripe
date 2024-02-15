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

/* import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import ViewUserComponent from '../pages/ViewUserComponent';
import EditUserComponent from '../pages/EditUserComponent';

const UserTableComponent = () => {
  const { user: authUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [viewUserId, setViewUserId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);

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

  const handleViewDetails = (userId) => setViewUserId(userId);
  const handleEdit = (userId) => setEditUserId(userId);
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7007/api/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

     
      console.log(`Successfully deleted user with ID: ${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(({ _id, username, email, role }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>
                <button onClick={() => handleViewDetails(_id)} className="icon-button">
                  <FaEye />
                </button>
                <button onClick={() => handleEdit(_id)} className="icon-button">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(_id)} className="icon-button">
                  <FaTrash />
                </button>
              </td>
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

      
      {viewUserId && <ViewUserComponent userId={viewUserId} />}
      {editUserId && <EditUserComponent userId={editUserId} />}
    </div>
  );
};

export default UserTableComponent;
 */

import React, { useState, useEffect, useContext } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import ViewUserComponent from '../pages/ViewUserComponent';
import EditUserComponent from '../pages/EditUserComponent';

const UserTableComponent = () => {
  const { user: authUser } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [viewUserId, setViewUserId] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleCloseViewModal = () => setShowViewModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleViewDetails = (userId) => {
    setViewUserId(userId);
    setShowViewModal(true);
  };

  const handleEdit = (userId) => {
    setEditUserId(userId);
    setShowEditModal(true);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7007/api/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      console.log(`Successfully deleted user with ID: ${userId}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(({ _id, username, email, role }) => (
            <tr key={_id}>
              <td>{_id}</td>
              <td>{username}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>
                <button onClick={() => handleViewDetails(_id)} className="icon-button">
                  <FaEye />
                </button>
                <button onClick={() => handleEdit(_id)} className="icon-button">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(_id)} className="icon-button">
                  <FaTrash />
                </button>
              </td>
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

      {/* View User Modal */}
      <Modal show={showViewModal} onHide={handleCloseViewModal}>
        <Modal.Header closeButton>
          <Modal.Title>View User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewUserId && <ViewUserComponent userId={viewUserId} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUserId && <EditUserComponent userId={editUserId} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTableComponent;

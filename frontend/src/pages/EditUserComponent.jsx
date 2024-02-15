import React, { useState, useEffect } from 'react';

const EditUserComponent = ({ userId }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:7007/api/user/${userId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const data = await response.json();
        setUserData({
          username: data.data.username,
          email: data.data.email,
          role: data.data.role,
        });
      } catch (error) {
        console.error('Error fetching user details for editing:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:7007/api/user/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      console.log('User details updated successfully');
      // Add logic for redirection or displaying a success message
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={userData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="text" name="email" value={userData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Role:
          <input type="text" name="role" value={userData.role} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUserComponent;

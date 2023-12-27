import React from 'react';
import { useSelector } from 'react-redux';
import { selectEmail } from '../../redux/slice/authSlice';
import { Link } from 'react-router-dom';

const AdminRouter = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  const allowedEmails = [process.env.REACT_APP_ADMIN_USER1, process.env.REACT_APP_ADMIN_USER];

  if (allowedEmails.includes(userEmail)) {
    return children;
  }

  return (
    <section>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This page can only be viewed by admin user</p>
      </div>
      <br />
      <Link to="/">
        <button>&larr; Back To home</button>
      </Link>
    </section>
  );
};

export function AdminLink({ children }) {
  const userEmail = useSelector(selectEmail);

  const allowedEmails = [process.env.REACT_APP_ADMIN_USER1, process.env.REACT_APP_ADMIN_USER];

  if (allowedEmails.includes(userEmail)) {
    return children;
  }

  return null;
}

export default AdminRouter;

import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice'
import { Link } from 'react-router-dom';

const AdminRouter = ({children})  => {
  const userEmail = useSelector(selectEmail);

  if(userEmail === process.env.REACT_APP_ADMIN_USER) {
    return children
  }
  return(
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
}

export function AdminLink({children}) {
  const userEmail = useSelector(selectEmail);

  if(userEmail === process.env.REACT_APP_ADMIN_USER) {
    return children;
  }
  return null;
}

export default AdminRouter
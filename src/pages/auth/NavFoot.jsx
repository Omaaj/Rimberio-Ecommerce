import "./auth.css";
import { Link, NavLink } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../fireBase/config";
import { toast } from "react-toastify";


export const Nav = () => {
    const activeLink = ({isActive}) => {
        return isActive ? "actives" : 'actives active_links'
    }
    return (
        <>
            <div className="overlay"></div>
            <div className="header">
              <div className="logo">
                <Link to="/">
                  <img src="/img/Colorful Illustrative Online Shop Logo.png" alt="logo" />
                </Link>
              </div>
              <div className="register">
                <NavLink className={activeLink} to="/login">Login</NavLink>
                <NavLink className={activeLink} to="/register">Register</NavLink>
              </div>
            </div>
        </>
    )
}

export const Footers = () => {
    const date = new Date();
    const year = date.getFullYear();
    return(
        <>
            <footer className="footo">
                <div className="footo-1">
                    <ul>
                      <li><Link to="/">About Us</Link></li>
                      <li><Link to="/">Privacy Policy</Link></li>
                      <li><Link to="/">Terms Of Use</Link></li>
                    </ul>
                    <p>&copy; {year}. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    )
}

export const Google = ({redirectUser}) => {
  // const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  const signInwithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // const user = result.user;
      toast.success("Login Successfully");
      redirectUser()
    }).catch((error) => {
      toast.error(error.message)
    });
  }
  return(
    <>
      <div className="lines">
        <div className="lines_1"></div>
          <p>OR</p>
        </div>
        <div className="get-star" onClick={signInwithGoogle}>
            <div className="btn">
              <div className="icons">
                <FcGoogle /> 
              </div>
              <span>Sign in with Google</span>
            </div>
        </div>
    </>
  )
}
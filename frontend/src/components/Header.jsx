import { useState } from 'react';
import { HiOutlineMenuAlt3, HiShoppingBag, HiUser } from 'react-icons/hi';
import { IoChevronDown } from 'react-icons/io5';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/userActions';

const Header = () => {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="logo">Masterpiece Empire</Link>

      <div className="menu-toggle" onClick={() => setShow(!show)}>
        <HiOutlineMenuAlt3 size={24} color="white" />
      </div>

      <nav className={`nav ${show ? 'show' : ''}`}>
        <Link to="/cart" className="nav-link">
          <HiShoppingBag className="icon" />
          Cart
        </Link>

        {userInfo ? (
          <div
            className="dropdown"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <button className="dropdown-btn">
              {userInfo.name} <IoChevronDown />
            </button>
            {dropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile" className="dropdown-item">Profile</Link>
                </li>
                <li>
                  <button onClick={logoutHandler} className="dropdown-item">Logout</button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="nav-link">
            <HiUser className="icon" />
            Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;

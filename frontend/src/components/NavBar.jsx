import React , {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import {toast} from 'react-toastify'
import {logoutUser} from '../store/authSlice';

const Links = styled.div`
    color: white;
    display: flex;

    div {
        cursor: pointer;

        &: last-child {
            margin-left: 2rem;
        }
    }
    
`;

const AuthLinks = styled.div`
    a {
        &:last-child {
            margin-left: 2rem;
        }
    }
`;
const NavBar = () => {
    const cart = useSelector(state => state.cart);
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [itemsQuntity, setItemsQuntity] = useState(cart?.cartTotalQuantity);

    useEffect(()=>{
        setItemsQuntity(cart?.cartItems.length > 0 ? cart?.cartTotalQuantity: 0);
    }, [cart,itemsQuntity]);

    return <nav className="nav-bar">
        <Link to="/"><h2>OnlineShop</h2></Link>
           
        <Link to="/cart">
        <div className="nav-bag">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-handbag-fill" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z"/>
            </svg>
            <span className="bag-quantity">
                <span>{itemsQuntity}</span>
            </span>
        </div>
        </Link>

        {auth?._id ?(
        <Links>
            {auth?.isAdmin ? ( <div><Link to="admin">Admin</Link></div>) : null}
           
            <div onClick={() => {
                dispatch(logoutUser(null))
                navigate('/')
                toast.warning('Logged out !...',{ position: "top-left"})
            }}>
                LogOut
            </div>
        </Links>)
         : (
        <><AuthLinks>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </AuthLinks>
            </>)}

    </nav>
};

export default NavBar;

import { useEffect , useState} from "react";
import {useDispatch } from "react-redux";
import {orderedItemsClear} from '../store/cartSlice';

const CheckoutSuccess = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const [items, setItems] = useState(localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): []);

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        // const query = new URLSearchParams(window.location.search);
        
          setMessage("Order placed! You will receive an email confirmation.");
      
        localStorage.setItem("cartItems", JSON.stringify([]));
        dispatch(orderedItemsClear());
      }, [items, dispatch]);

    return (<div className="not-found">
        <h2>Check out Success</h2>
        <h3>{message}</h3>
        <img src="https://res.cloudinary.com/dbnbgnpmf/image/upload/v1666861515/verify-icon_xsoqeb.webp" width="250" alt="verify"/>
    </div>)
}

export default CheckoutSuccess;
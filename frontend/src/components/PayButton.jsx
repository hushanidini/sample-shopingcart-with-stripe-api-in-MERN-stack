import axios from "axios";
import { useSelector } from "react-redux";
import {endpointUrl} from '../store/api';

const PayButton = ({cartItems}) => {
    
 const user = useSelector((state) => state.auth);
    const handleCheckOut = () => {
    
        axios.post(`${endpointUrl}/api/stripe/create-checkout-session`, {
            cartItems,
            userId: user?._id
        }).then((res) =>{
            if(res?.data){
                window.location.href = res?.data
            } 
        }).catch((err) => console.log(err.message))
    }
    return (
        <>
        <button onClick={() =>handleCheckOut()}>Check out</button>
        </>
    )
};

export default PayButton;
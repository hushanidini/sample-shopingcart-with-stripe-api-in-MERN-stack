import React , {useState, useEffect}from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link , useNavigate} from "react-router-dom";
import { removeFromCart , decreaseCart, addToCart, clearCart, getTotals} from "../store/cartSlice";
import PayButton from '../components/PayButton';

const Cart = () => {
    const cart = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth)

    const [items, setItems] = useState(localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): []);

    useEffect(()=>{
        dispatch(getTotals())
        setItems(items)
    }, [cart, dispatch, items])

    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }

    const handleDecreaseCart = (cartItem) => {
        dispatch(decreaseCart(cartItem))
    }

    const handleIncreaseCart = (cartItem) => {
        dispatch(addToCart(cartItem))
    }

    const handleCartClear = () => {
        dispatch(clearCart());
    }
    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart?.cartItems.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty </p>
                    <div className="start-shopping">
                        <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                            width="20" height="20" 
                            fill="currentColor" 
                            className="bi bi-arrow-left-circle-fill" 
                            viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                </div>
            ): (
                <div className="cart-item-list">
                    <div className="titles">
                        <h3 className="product-title">Product</h3>
                        <h3 className="price">Price</h3>
                        <h3 className="quantity">Quantity</h3>
                        <h3 className="total">Total</h3>
                    </div>
                    <div className="cart-items">
                        {cart?.cartItems?.map((cartItem) => (
                            <div className="cart-item" key={cartItem?._id}>
                                <div className="cart-product">
                                    <img src={cartItem?.image} alt={cartItem?.name} />
                                    <div>
                                        <h3>{cartItem?.name}</h3>
                                        <p>{cartItem?.desc}</p>
                                        <button onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
                                    </div>
                                </div>
                                <div className="cart-product-price">${cartItem?.price}</div>
                                <div className="cart-product-quantity">
                                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                                    <div className="count">{cartItem?.cartQuantity}</div>
                                    <button onClick={() => handleIncreaseCart(cartItem)}>+</button>
                                </div>
                                <div className="cart-product-total-price">
                                    ${cartItem?.cartQuantity * cartItem?.price}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <div className="clear-cart" onClick={() => handleCartClear()}>
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="20" height="20" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                            Clear Cart
                            </div>
                        <div className="cart-checkout">
                            <div className="subtotal">
                                <span>Subtotal</span>
                                <span className="amount">${cart?.cartTotalAmount}</span>
                            </div>
                            <p>Taxes and shipping calculated at checkout.</p>
                            {auth?._id ? <PayButton cartItems={cart?.cartItems}/>
                            : <button onClick={() => navigate('/login')} className="cart-login">Login To Check Out<output></output></button>}
                            <div className="continue-shopping">
                                <Link to="/">
                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                        width="20" height="20" 
                                        fill="currentColor" 
                                        className="bi bi-arrow-left-circle-fill" 
                                        viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                                    </svg>
                                    <span>Continue Shopping</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
   
}

export default Cart;
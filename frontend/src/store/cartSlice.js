import {createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")): [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info(`Increased ${state.cartItems[itemIndex].name} cart quantity`,{
                    position: "top-left",
                });
            }else{
                const tempProduct = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} to cart`,{
                    position: "top-left",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action){
           const nextCartItems = state.cartItems.filter(
                cartItem => cartItem._id !== action.payload._id
                )
            state.cartItems = nextCartItems;
            //localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            // message
            toast.error(`${action.payload.name} removed from cart`,{
                position: "top-left",
            });
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info(`Decreased ${action.payload.name} cart quantity`,{
                    position: "top-left"
                })
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            }else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem._id !== action.payload._id
                    )
                state.cartItems = nextCartItems;
                //localStorage
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                // message
                toast.error(`${action.payload.name} removed from cart`,{
                    position: "top-left",
                });
            }
        },
        clearCart(state, action){
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            toast.error(`Cart cleared`,{
                position: "top-left",
            })

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        orderedItemsClear(state, action){
            state.cartItems = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
            // toast.success(`Order placed! You will receive an email confirmation.`,{
            //     position: "top-left",
            // })

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
              (cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
      
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;
      
                return cartTotal;
              },
              {
                total: 0,
                quantity: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
          },
    },
});

export const { addToCart, removeFromCart, decreaseCart , clearCart, orderedItemsClear, getTotals} = cartSlice.actions;

export default cartSlice.reducer;
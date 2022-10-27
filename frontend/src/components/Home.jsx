import React from "react";
// async thunk and redux
import { useSelector } from "react-redux";
// RTK query
import { useGetAllProductsQuery } from "../store/productsApi"; 
import { useDispatch } from "react-redux";
import { useNavigate  } from "react-router-dom";
import { addToCart } from "../store/cartSlice";

const Home = () => {
    // async thunk and redux
    //  const {items: data, status} = useSelector(state => state.products);
    // console.log('items', items)
    // RTK query
    const {data,error,isLoading} = useGetAllProductsQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate ();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        navigate('/cart');
    }

    return (
    <div className="home-container">
        {data?.length > 0  ?   (
            <>
            <h2>New Arrivals</h2>
            <div className="products">
                {data && data?.map(product => (
                    <div key={product?._id} className="product">
                        <h3>{product?.name}</h3>
                        <img src={product?.image} alt={product?.name} />
                        <div className="details">
                            <span className="desc">{product?.desc}</span>
                            <span className="price">${product?.price}</span>
                        </div>
                        <button onClick={() => handleAddToCart(product)}>Add To Cart</button>
                    </div>
                ))}
            </div>
            </>
        ): (<p>Ohh , Data not found</p>)}
    </div>
    ) 
}

export default Home;
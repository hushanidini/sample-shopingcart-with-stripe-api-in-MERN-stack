import styled from 'styled-components';
import React , {useState} from 'react';
import { useDispatch } from "react-redux";
import { PrimaryButton } from './CommonStyled';
import { productsCreate } from '../../store/productSlice';


const CreateProduct = () => { 
    const dispatch = useDispatch();
    const [productImg, setProductImg] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState(null);

  
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        console.log(file)
        TransFormFile(file)
    }

    const TransFormFile = (file) => {
        const reader = new FileReader()
        if(file){
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProductImg(reader.result);
            }
        }else{
            setProductImg("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(productsCreate({
            name,
            desc,
            price,
            image: productImg
        }))
    }
    return (
        <StyledCreateProduct> 
            <StyledForm onSubmit={handleSubmit}>
                <h3>Create a Product</h3>
                <input type="file" 
                accept='image/'
                 onChange={(e) => handleImageUpload(e)}
                 required
                 />
                 <input type="text" 
                 placeholder='Name'
                 onChange={(e) => setName(e)}
                 required
                 />

                <input type="text" 
                 placeholder='Short description'
                 onChange={(e) => setDesc(e)}
                 required
                 />

                <input type="number" 
                 placeholder='price'
                 onChange={(e) => setPrice(e)}
                 required
                 />

                 <PrimaryButton type='submit'>Submit</PrimaryButton>
            </StyledForm>
            <ImagePreview>
                {productImg ? (<img src={productImg} alt="product image" />)
                : (<p> product img preview will appear hear.</p>)}
            </ImagePreview>
        </StyledCreateProduct>
    )
}

export default CreateProduct;

const StyledCreateProduct = styled.div`
    display: flex;
    justify-content: space-between;
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-top: 2rem;
    select,
    input{
        padding: 7px;
        min-height: 30px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(182,182,182);
        margin: 0.3rem 0;
        $:focus {
            border: 2px solid rgb(0,208,255);
        }
    }
    select {
        color: rgb(95,95,95);
    }
`;

const ImagePreview = styled.div`
    margin: 2rem 0.2rem 2rem;
    padding: 2rem;
    border: 1px solid rgb(183,183,183);
    max-width: 300px;
    width:100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: rgb(78,78,78);
    img {
        max-width:100%;
    }
`;

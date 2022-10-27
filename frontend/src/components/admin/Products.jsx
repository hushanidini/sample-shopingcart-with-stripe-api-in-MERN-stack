import { useNavigate, Outlet } from "react-router-dom";
import {AdminHeaders, PrimaryButton} from '../admin/CommonStyled'
const Products = () => {
    const navigate = useNavigate();
    return (
        <>
        <AdminHeaders> <h2>Products</h2>
            <PrimaryButton onClick={()=> navigate('/admin/products/new')}>New Product</PrimaryButton>
        </AdminHeaders>
        <Outlet />
        </>
    )
}

export default Products;
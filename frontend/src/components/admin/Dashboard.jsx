import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


const Dashboard = () => {
    const auth = useSelector((state) => state.auth)
    if(!auth?.isAdmin) return <Styledp>Access denied</Styledp>
    return (
        <StyledDashbaord>
            <SideNav>
                <h3>Quick Links</h3>
                <NavLink className={({isActive})=> isActive ? "link-active": "link-inactive"} to="/admin">Dashboard</NavLink>
                <NavLink className={({isActive})=> isActive ? "link-active": "link-inactive"} to="/admin/products">Products</NavLink>
            </SideNav>
            <Content>
                <Outlet />
            </Content>
        </StyledDashbaord>
    )
}

export default Dashboard;

const StyledDashbaord = styled.div`
    display: flex;
    height: 100vh;
`;

const SideNav = styled.div`
    border-right: 1px solid gray;
    height: calc(100vh -70px);
    position: fixed;
    overflow-y: auto;
    width:200px;
    display: flex;
    flex-direction: column;
    padding: 2rem;

    h3 {
        margin: 0 0 1rem 0;
        padding: 0;
        text-transform: uppercase;
        font-size: 16px;
    }

    a {
        text-decoration: none;
        margin-bottom: 1rem;
    }
`;

const Content = styled.div`
    margin-left: 20%;
    padding: 2rem 3rem;
    width: 100%;
`;

const Styledp = styled.p`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: rgb(68, 68, 68);
        font-size: 25px;
        padding: 10%

`;

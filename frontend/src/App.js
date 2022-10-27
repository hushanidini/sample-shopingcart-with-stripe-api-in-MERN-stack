import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';

// admin section
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import CreateProduct from './components/admin/CreateProduct';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
         
          <Router>
          <ToastContainer />
          <NavBar />
            <Routes>
              <Route path="/" exact  element={<Home/>} /> 
              <Route path="/register" exact  element={<Register/>} /> 
              <Route path="/login" exact  element={<Login/>} /> 
              <Route path="/cart" element={<Cart/>}/>
              <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
              <Route path="/not-found" element={<NotFound/>}/>

              <Route path="/admin" element={<Dashboard/>}>
                <Route path="products" element={<Products/>}>
                    <Route path="new" element={<CreateProduct/>}/>
                </Route>
              </Route>
              
              
              <Route
                  path="*"
                  element={<Navigate to="not-found" replace />}
              />
            </Routes>
          </Router>
    </div>
  );
}

export default App;

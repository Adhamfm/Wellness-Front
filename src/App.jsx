import './App.css'
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Home from './pages/home';
import Signup from './pages/signup';
import FormTest from './pages/formTest';
import SignupCustomerForm from './pages/signupcustomer';
import Products from './pages/products';
import Meals from './pages/meals';
import ProductPage from './pages/productPage';
import MealPage from './pages/mealPage';
import NavBar from './components/layout/NavBar/NavBar';
import LoginCustomer from './pages/login';
import TabsTest from './pages/tabsTest';
import LoginSeller from './pages/loginSeller';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>} exact/>
        <Route path="/logincustomer" element={<LoginCustomer/>} exact/>
        <Route path="/loginseller" element={<LoginSeller/>} exact/>
        <Route path="/profile" element={<Profile/>} exact/>
        <Route path="/signup" element={<Signup/>} exact/>
        <Route path="/test" element={<FormTest/>} exact/>
        <Route path="/signupcus" element={<SignupCustomerForm/>} exact/>
        <Route path="/products" element={<Products/>} exact/>
        <Route path="/products/:proid" element={<ProductPage/>} exact/>
        <Route path="/meals" element={<Meals/>} exact/>
        <Route path="/meals/:mealid" element={<MealPage/>} exact/>
        <Route path="/tabtest" element={<TabsTest/>} exact/>
        <Route path="*" element={<div><NavBar/><h1>404 PAGE NOT FOUND</h1></div>} exact/>
      </Routes>
    </div>
  );
}

export default App

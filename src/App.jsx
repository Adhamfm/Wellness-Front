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
import Cart from './pages/cart';
import Footer from './components/layout/Footer/Footer';
import WishlistPage from './pages/wishlist';
import AddMealPage from './pages/addMeal';
import ProfileCustomer from './pages/profileCustomer';
import Feedback from './pages/feedback';
import ProfileView from './pages/profileView';
import EditMeal from './pages/editMeal';
import { createContext, useState } from 'react';
import Check from './pages/check';
import { AppStates } from './pages/check/index';



function App() {
  const [cartElements, setCartElements] = useState([]);
  return (
    <div>
      <AppStates.Provider value={{ cartElements, setCartElements }}>
        <Routes>
          <Route path="/" element={<Home/>} exact/>
          <Route path="/logincustomer" element={<LoginCustomer/>} exact/>
          <Route path="/loginseller" element={<LoginSeller/>} exact/>
          <Route path="/profile" element={<Profile/>} exact/>
          <Route path="/profile/:profileid" element={<ProfileView/>} exact/>
          <Route path="/profilecus" element={<ProfileCustomer/>} exact/>
          <Route path="/signup" element={<Signup/>} exact/>
          <Route path="/test" element={<FormTest/>} exact/>
          <Route path="/signupcus" element={<SignupCustomerForm/>} exact/>
          <Route path="/products" element={<Products/>} exact/>
          <Route path="/wishlist" element={<WishlistPage/>} exact/>
          <Route path="/addMealPage" element={<AddMealPage/>} exact/>
          <Route path="/products/:proid" element={<ProductPage/>} exact/>
          <Route path="/meals" element={<Meals/>} exact/>
          <Route path="/meals/edit/:mealid" element={<EditMeal/>} exact/>
          <Route path="/meals/:mealid" element={<MealPage/>} exact/>
          <Route path="/cart" element={<Cart/>} exact/>
          <Route path="/checkout/*" element={<Check />} />
          <Route path="/feedback" element={<Feedback/>} exact/>
          <Route path="/tabtest" element={<TabsTest/>} exact/>
          <Route path="*" element={<div><NavBar/><h1>404 PAGE NOT FOUND</h1></div>} exact/>
        </Routes>
      </AppStates.Provider>
    </div>
  );
}

export default App

import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
// import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import ListUser from './user/ListUser.js';
import Loginweb from "./login/Loginweb.js"
import Cookies from "js-cookie";
import axios from 'axios';
import Category from './category/Category';
import Casi from './casi/Casi';

function App() {
  const token = Cookies.get("cookielogin")
  const [roleAdmin, setRoldeAdmin] = useState('admin')
  const callApiAdmin = async () => {
    try {
      const role = await axios.get('http://localhost:5000/user/role', { headers: { Authorization: `Bearer ${token}` } });
      setRoldeAdmin(role)
    } catch (error) {
      return toast.error(error);
    }
  }
  useEffect(() => {
    callApiAdmin();
  }, [token]);

  return (
    <div className="App">
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick />
        <Routes >
          <Route path="/login" element={<Loginweb />} />
          {token && roleAdmin === 'admin' ? <>
            <Route path="/list-user" element={<ListUser />} />
            <Route path="/category" element={<Category />} />
            <Route path="/casi" element={<Casi />} />
          </>
            : <Route
              path="*"
              element={<Navigate to="/login" replace />}
            />}
        </Routes>
      </Router>
    </div >
  );
}

export default App;
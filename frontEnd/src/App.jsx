import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import React, { useEffect } from "react";
import { Routes, Route, Router, useLocation } from "react-router-dom";

import Home from "./pages/home/home";

import NewRent from "./pages/rents/newRents";
import AllRents from "./pages/rents/allRents";

import NewUser from "./pages/users/newUsers";
import EditUser from "./pages/users/editUsers";
import UserPage from "./pages/users/userPages";
import LoginUser from "./pages/users/loginUsers";

import NewBooks from "./pages/books/newBooks";
import AllBooks from "./pages/books/allBooks";
import EditBooks from "./pages/books/editBooks";

import NewAuthors from "./pages/authors/newAuthors";
import AllAuthors from "./pages/authors/allAuthors";
import EditAuthors from "./pages/authors/editAuthors";

import EditCategories from "./pages/categories/editCategories";
import NewCategories from "./pages/categories/newCategories";
import AllCategories from "./pages/categories/allCategories";

function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/rents/" element={<AllRents />} />
        <Route path="/rents/new" element={<NewRent />} />
      </Routes>

      <Routes>
        <Route path="/users/new" element={<NewUser />} />
        <Route path="/users/update" element={<EditUser />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/users/login" element={<LoginUser />} />
      </Routes>

      <Routes>
        <Route path="/books/new" element={<NewBooks />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/update" element={<EditBooks />} />
      </Routes>

      <Routes>
        <Route path="/authors/new" element={<NewAuthors />} />
        <Route path="/authors" element={<AllAuthors />} />
        <Route path="/authors/update" element={<EditAuthors />} />
      </Routes>

      <Routes>
        <Route path="/categories/update" element={<EditCategories />} />
        <Route path="/categories/new" element={<NewCategories />} />
        <Route path="/categories" element={<AllCategories />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import React, { useEffect } from "react";
import { Routes, Route, Router, useLocation } from "react-router-dom";
import Container from "./components/Container/Container";

import Home from "./pages/home/home";
import About from "./pages/about/about";
import NotFound from "./components/NotFound/NotFound";

import AllRents from "./pages/rents/allRents";
import EditRent from "./pages/rents/editRents";

import NewUser from "./pages/users/newUsers";
import EditUser from "./pages/users/editUsers";
import UserPage from "./pages/users/userPages";
import LoginUser from "./pages/users/loginUsers";

import AllBooks from "./pages/books/allBooks";
import EditBooks from "./pages/books/editBooks";
import OneBook from "./pages/books/oneBook";

import AllAuthors from "./pages/authors/allAuthors";
import EditAuthors from "./pages/authors/editAuthors";

import AllCategories from "./pages/categories/allCategories";
import EditCategories from "./pages/categories/editCategories";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/rents/" element={<AllRents />} />
          <Route path="/rents/update/:id" element={<EditRent/>} />

          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/update/:id" element={<EditUser />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/login" element={<LoginUser />} />

          <Route path="/books/:id" element={<OneBook />} />
          <Route path="/Books" element={<AllBooks />} />
          <Route path="/books/update/:id" element={<EditBooks />} />

          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/authors/update/:id" element={<EditAuthors />} />

          <Route path="/categories/update/:id" element={<EditCategories />} />
          <Route path="/categories" element={<AllCategories />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>

      <Footer />
    </>
  );
}

export default App;

import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import React, { useEffect } from "react";
import { Routes, Route, Router, useLocation } from "react-router-dom";
import Container from "./components/Container/Container";

import Home from "./pages/home/home";
import About from "./pages/about/about"
import NotFound from "./components/NotFound/NotFound";

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

import AllCategories from "./pages/categories/allCategories";
import NewCategories from "./pages/categories/newCategories";
import EditCategories from "./pages/categories/editCategories";

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about"  element={<About />} />

          <Route path="/rents/" element={<AllRents />} />
          <Route path="/rents/new" element={<NewRent />} />

          <Route path="/users/new" element={<NewUser />} />
          <Route path="/users/update" element={<EditUser />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/users/login" element={<LoginUser />} />

          <Route path="/books/new" element={<NewBooks />} />
          <Route path="/Books" element={<AllBooks />} />
          <Route path="/books/update" element={<EditBooks />} />

          <Route path="/authors/new" element={<NewAuthors />} />
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/authors/update" element={<EditAuthors />} />

          <Route path="/categories/update" element={<EditCategories />} />
          <Route path="/categories/new" element={<NewCategories />} />
          <Route path="/categories" element={<AllCategories />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>

      <Footer />
    </>
  );
}

export default App;

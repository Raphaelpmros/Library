import Footer from "./components/Footer"
import Navbar from "./components/Navbar";

import NewAuthors from "./pages/authors/newAuthors";
import AllAuthors from "./pages/authors/allAuthors";
import EditAuthors from "./pages/authors/editAuthors";

import NewBooks from "./pages/books/newBooks";
import AllBooks from "./pages/books/allBooks";
import EditBooks from "./pages/books/editBooks";

import EditCategories from "./pages/categories/editCategory";
import NewCategories from "./pages/categories/newCategories";
import AllCategories from "./pages/categories/allCategories";

import NewRent from "./pages/rents/newRents";
import AllRents from "./pages/rents/allRents";

import NewUser from "./pages/users/newUsers";
import EditUser from "./pages/users/editUser";
import UserPage from "./pages/users/userPage";
import LoginUser from "./pages/users/loginUser";

function App() {
  return (
    <>
      <Navbar />
      
      <Footer />
    </>
  );
}

export default App;

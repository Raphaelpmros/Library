import React, { useState, useEffect } from "react";
import NewBookModal from "./components/NewBookModal";
import ViewBooksComponents from "./components/ViewBooksComponent";
import { viewBooks } from "../../../requests_api/books";

export default function AllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await viewBooks();
        if (
          response &&
          response.viewBooks &&
          Array.isArray(response.viewBooks)
        ) {
          setBooks(response.viewBooks);
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for books:", error);
      }
    };

    fetchBooks();
  }, []);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <>
      {userData.admin === "1" && (
        <div className="flex justify-center pt-5">
          <NewBookModal />
        </div>
      )}

      {books.length === 0 && (
        <div
          className="mt-20 text-xl text-center flex justify-center flex-col"
          style={{ height: "60vh" }}
        >
          <h1 className="text-4xl">We don't have any books yet</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 place-items-center">
        {books.map((book) => (
          <ViewBooksComponents
            key={book.id}
            id={book.id}
            full_name={book.full_name}
            quantity={book.quantity}
            image={book.image}
          />
        ))}
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import NewBookModal from "./components/NewBookModal";
import ViewBooksComponents from "./components/ViewBooks";
import { viewBooks } from "../../../requests_api/books";

export default function AllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await viewBooks(); // Chama a função viewBooks para obter os dados
        if (
          response &&
          response.viewBooks &&
          Array.isArray(response.viewBooks)
        ) {
          setBooks(response.viewBooks); // Define os livros no estado após a resposta bem-sucedida
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for books:", error);
      }
    };

    fetchBooks();
  }, []); // O segundo argumento vazio [] indica que o useEffect só é executado uma vez após a montagem inicial

  return (
    <>
      <h1>All Books</h1>
      <NewBookModal />

      {/* Renderiza uma mensagem se não houver livros */}
      {books.length === 0 && (
        <div
          className="mt-20 text-xl text-center flex justify-center flex-col"
          style={{ height: "60vh" }}
        >
          <h1 className="text-4xl">We don't have any books yet</h1>
        </div>
      )}

      {/* Renderiza a grade de livros se houver livros no estado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
        {books.map((book) => (
          <ViewBooksComponents
            key={book.id}
            full_name={book.full_name}
            quantity={book.quantity}
            image={book.image}
          />
        ))}
      </div>
    </>
  );
}

import { newReviews, allReviews } from "../../../requests_api/reviews";
import { findBooks } from "../../../requests_api/books";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "flowbite-react";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Review from "./components/Review";
import * as React from "react";

export default function OneBook() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onPageChange = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const adminData = localStorage.getItem("user");
  const adminObject = JSON.parse(adminData);
  const [review, setReview] = useState([]);
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await findBooks(id);
        setBook(response[0]);
      } catch (error) {
        console.error("Error search book:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Livro Específico</h1>

      <div className="flex justify-center mt-5">
        <div className="max-w-sm bg-gray-800 rounded-lg shadow mb-5">
          <div className="flex justify-center">
            <img
              className="rounded-t-lg"
              src={book.image}
              alt={book.full_name}
            />
          </div>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {book.full_name}
            </h5>
            <h5 className="text-white">Description:</h5>
            <p className="mb-3 font-normal text-white">{book.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

import { findBooks } from "../../../requests_api/books";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pagination } from "flowbite-react";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import NewReview from "./components/NewReview";
import DeleteButton from "../../components/Buttons/DeleteButton";
import EditButtonModal from "../../components/Buttons/EditButton";
import { newRents } from "../../../requests_api/rents";
import { deleteBooks } from "../../../requests_api/books";
import { updateBook } from "../../../requests_api/books";
import RentBook from "../../components/Buttons/RentButton";

export default function OneBook() {
  const onPageChange = (page) => setCurrentPage(page);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const [rent, setRent] = useState({
    id_book: "",
    id_user: ""
  });

  console.log(rent)

  const handleDelete = async () => {
    try {
      await deleteBooks(id);
      navigate(`/books`);
    } catch (error) {
      console.error("Error deleting Book:", error.message);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await findBooks(id);
        setBook(response[0]);
        setRent((prevRent) => ({
          ...prevRent,
          id_book: id
        }))
      } catch (error) {
        console.error("Error searching for book:", error);
      }
    };

    fetchBooks();
  }, [id]);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
      setRent((prevRent) => ({
        ...prevRent,
        id_user: parsedUserData.id
      }));
    }
  }, []);

  const handleRent = async () => {
    try {
      await newRents(rent.id_book, rent.id_user)
    } catch (error) {
      console.error("Error renting Book:", error.message);

    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex justify-center p-5">
          <div className="max-w-sm bg-gray-800 rounded-lg shadow p-5">
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
            <div className="flex justify-center">
              {userData && (
                <div >
                  <RentBook rentFunction={handleRent} />
                </div>
              )}
              </div>
              <div>
              {userData.admin === "1" && (
                <div className="flex justify-center pt-3">
                  <EditButtonModal link="/books/update/" id={id} />
                  <DeleteButton deleteFunction={handleDelete} />
                </div>
              )}
            </div>
          </div>
        </div>
        <NewReview />
      </div>
    </>
  );
}

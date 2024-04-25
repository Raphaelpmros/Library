import { viewBooks } from "../../../requests_api/books";
import React, { useEffect, useState } from "react";
import { allRents } from "../../../requests_api/rents";
import { allUsers } from "../../../requests_api/users";
import RentsList from "./rentsTable/rentsList";
import RentsHead from "./rentsTable/rentsHead";
import { Pagination } from "flowbite-react";

export default function allRentsAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const User = localStorage.getItem("user");
  const [books, setBooks] = useState([]);
  const [rents, setRents] = useState([]);
  const [user, setUser] = useState([]);
  const userData = JSON.parse(User);

  console.log(rents)

  const onPageChange = (page) => setCurrentPage(page);

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const response = await allRents();
        if (
          response &&
          response.viewRents &&
          Array.isArray(response.viewRents)
        ) {
          const rentsArray = response.viewRents;
          setRents(rentsArray);
          setTotalPages(Math.ceil(rentsArray.length / 5));
        } else {
          console.error("Invalid response format from allRents():", response);
        }
      } catch (error) {
        console.error("Error fetching rents:", error);
      }
    };

    fetchRents();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await allUsers();
        setUser(response.viewUsers);
      } catch (error) {
        console.error("Erro search users:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await viewBooks();
        setBooks(response.viewBooks);
      } catch (error) {
        console.error("Erro search book:", error);
      }
    };

    fetchBooks();
  }, []);

  function formatDateTime(dateTimeString) {
    const datePart = dateTimeString.split("T")[0];
    return datePart.split("-").reverse().join("-");
  }

  const indexOfLastRent = currentPage * 5;
  const indexOfFirstRent = indexOfLastRent - 5;
  const currentRents = rents.slice(indexOfFirstRent, indexOfLastRent);
  return (
    <>
      {userData && userData.admin == 1 ? (
        <div>
          {rents.length == 0 ? (
            <div>
              <div
                className="pt-5 text-xl text-center flex justify-center flex-col"
                style={{ height: "65vh" }}
              >
                <h1 className="text-4xl">Don't have Rents yet</h1>
                <p className="">Rent some books</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center pt-5">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-white">
                    <RentsHead />
                    {currentRents.map((rent) => (
                      <RentsList
                        key={rent.id}
                        pick_up_date={formatDateTime(rent.pick_up_date)}
                        returns_date={formatDateTime(rent.returns_date)}
                        id_user={
                          user.find((user) => user.id === rent.id_user)
                            ?.full_name || "N/A"
                        }
                        id_books={
                          books.find((book) => book.id === rent.id_books)
                            ?.full_name || "N/A"
                        }
                        id={rent.id}
                      />
                    ))}
                  </table>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <Pagination
                  layout="pagination"
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={onPageChange}
                  previousLabel="Back"
                  nextLabel="Next"
                  showIcons
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="pt-5 text-xl text-center flex justify-center flex-col"
          style={{ height: "65vh" }}
        >
          <h1 className="text-4xl">Only admins can access this page</h1>
        </div>
      )}
    </>
  );
}

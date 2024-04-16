import React, { useState, useEffect } from "react";
import NewAuthorModal from "./components/NewAuthorModal";
import ViewAuthorsComponent from "./components/ViewAuthorsComponent";
import { viewAuthors } from "../../../requests_api/authors";

export default function AllAuthors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await viewAuthors();
        if (
          response &&
          response.viewAuthors &&
          Array.isArray(response.viewAuthors)
        ) {
          setAuthors(response.viewAuthors);
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for Authors:", error);
      }
    };

    fetchAuthors();
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
        <div className="flex justify-center">
          <NewAuthorModal />
        </div>
      )}

      {authors.length === 0 && (
        <div
          className="mt-20 text-xl text-center flex justify-center flex-col"
          style={{ height: "60vh" }}
        >
          <h1 className="text-4xl">We don't have any authors yet</h1>
        </div>
      )}

      <div className="text-center flex justify-center items-center flex-col">
        {authors.map((author) => (
          <ViewAuthorsComponent
            key={author.id}
            id={author.id}
            name={author.full_name}
            nationality={author.nationality}
          />
        ))}
      </div>
    </>
  );
}

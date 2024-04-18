import React, { useState, useEffect } from "react";
import NewCategoryModal from "./components/NewCategoryModal";
import ViewCategoryComponent from "./components/ViewCategoryComponent";
import { viewCategories } from "../../../requests_api/categories";

export default function AllCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await viewCategories();
        if (
          response &&
          response.viewCategories &&
          Array.isArray(response.viewCategories)
        ) {
          setCategories(response.viewCategories);
        } else {
          console.error("Error: Invalid data format received");
        }
      } catch (error) {
        console.error("Error searching for categories:", error);
      }
    };

    fetchCategories();
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
          <NewCategoryModal />
        </div>
      )}

      {categories.length === 0 && (
        <div
          className="mt-20 text-xl text-center flex justify-center flex-col"
          style={{ height: "60vh" }}
        >
          <h1 className="text-4xl">We don't have any categories yet</h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5 place-items-center">
        {categories.map((category) => (
          <ViewCategoryComponent
            key={category.id}
            id={category.id}
            name={category.name}
          />
        ))}
      </div>
    </>
  );
}
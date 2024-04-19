import { Link } from "react-router-dom";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import EditButton from "../../../components/Buttons/EditButton";
import { deleteCategories } from "../../../../requests_api/categories";
import { updateCategories } from "../../../../requests_api/categories";
import React, { useState, useEffect } from "react";

export default function ViewCategoryComponent({ id, name }) {
  const handleDelete = async () => {
    try {
      await deleteCategories(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

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
      <div
        className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ width: "15rem" }}
      >
        <div className="p-5">
          <h5 className="mb-2 text-1xl tracking-tight text-white">{name}</h5>
          {userData.admin === "1" && (
            <div className="flex justify-center pt-5">
              <DeleteButton deleteFunction={handleDelete} />
              <EditButtonModal link="/authors/update/" id={id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

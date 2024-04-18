import React from "react";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import EditButton from "../../../components/Buttons/EditButton";
import { deleteAuthor } from "../../../../requests_api/authors";
import { updateAuthor } from "../../../../requests_api/authors";

export default function ViewAuthorsComponent({ id, name, nationality }) {
  const handleDelete = async () => {
    try {
      await deleteAuthor(id);
      window.location.reload()
    } catch (error) {
      console.error("Error deleting author:", error.message);
    }
  };

  return (
    <div className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: "15rem" }}>
      <div className="p-5">
        <h5 className="mb-2 text-1xl tracking-tight text-white">
          {name} - {nationality}
        </h5>
        <DeleteButton deleteFunction={handleDelete} /> 
        <EditButton />
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import EditButton from "../../../components/Buttons/EditButton";

export default function ViewAuthorsComponent({ id, name, nationality }) {
  return (
    <>
      <div
        className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ width: "15rem" }}
      >
        <div className="p-5">
          <h5 className="mb-2 text-1xl tracking-tight text-white">
            {name} - {nationality}
          </h5>
          <DeleteButton/> <EditButton/>
        </div>
      </div>
    </>
  );
}

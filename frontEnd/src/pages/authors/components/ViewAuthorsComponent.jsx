import { Link } from "react-router-dom";

export default function ViewAuthorsComponent({ id, name, nationality }) {
  return (
    <>
      <div
        className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{ width: "18rem" }}
      >
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
            {name} - {nationality}
          </h5>
        </div>
      </div>
    </>
  );
}

import { deleteRents } from "../../../../requests_api/rents";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export default function RentsList({
  pick_up_date,
  returns_date,
  id_users,
  id_books,
  id,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminData = localStorage.getItem("user");
  const adminObject = JSON.parse(adminData);
  const navigate = useNavigate();

  const deleteRents = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    try {
      await deleteRents(id);

      notifySuccess();
    } catch (error) {
      console.error("Error calling API:", error.message);
      setIsSubmitting(true);
      notifyFail(`/Rents/${id}`);
    }
  };

  const notifySuccess = () => {
    toast.success("Rent returned successfully", {
      position: "bottom-right",
      autoClose: 1000,
      onClose: () => {
        navigate(0);
      },
    });
  };

  const notifyFail = (redirectUrl) => {
    toast.error("Failed to return rent.", {
      position: "bottom-right",
      autoClose: 1000,
      onClose: () => {
        window.location.href = redirectUrl;
      },
    });
  };

  return (
    <>
      <tbody>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
          >
            {id_users}
          </th>
          <td className="px-6 py-4">{pick_up_date}</td>
          <td className="px-6 py-4">{returns_date}</td>
          <td className="px-6 py-4">{id_books}</td>
          <td className="px-6 py-4">
            <a
              className={`font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer ${
                isSubmitting ? "pointer-events-none" : ""
              }`}
              aria-details={isSubmitting}
              onClick={deleteRents}
            >
              Return
            </a>
            {adminObject.admin == 1 && (
              <a
                href={`${id}/edit`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer ${isSubmitting ? 'pointer-events-none p-4"
              >
                Edit
              </a>
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
}

import { deleteRents } from "../../../../requests_api/rents";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import EditButtonModal from "../../../components/Buttons/EditButton";


export default function RentsList({
  pick_up_date,
  returns_date,
  id_user,
  id_books,
  id,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const adminData = localStorage.getItem("user");
  const adminObject = JSON.parse(adminData);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteRents(id);
      notifySucess();
    } catch (error) {
      console.error("Error deleting Book:", error.message);
      notifyFail(`/rents/${id}`);
    }
  };

  const notifySucess = () => {
    toast.success('Success!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => navigate(`/books`)
      });
  };

  const notifyFail = () => {
    toast.error('Something went wrong!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      onClose: () => window.location.reload()
      });
  };

  return (
    <>
      <tbody>
        <tr className="bg-gray-800 border-b dark:border-gray-700 text-center">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-white "
          >
            {id_user}
          </th>
          <td className="px-6 py-4">{pick_up_date}</td>
          <td className="px-6 py-4">{returns_date}</td>
          <td className="px-6 py-4">{id_books}</td>
          <td className="px-6 py-4">
          <DeleteButton deleteFunction={handleDelete} />
          <EditButtonModal link="/rents/update/" id={id} />
          </td>
        </tr>
      </tbody>
    </>
  );
}

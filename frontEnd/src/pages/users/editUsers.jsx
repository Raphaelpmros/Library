import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { findUser, updateUsers } from "../../../requests_api/users";
import { viewAuthors } from "../../../requests_api/authors";
import { viewCategories } from "../../../requests_api/categories";

export default function EditUser() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({
    full_name: "",
    image: "",
    full_address: "",
    additional_address_details: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await findUser(id);
        setFormData(response[0]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsers(id, formData);
      navigate("/users");
      notifySuccess();
    } catch (error) {
      console.error("Error calling API:", error.message);
      notifyFail();
    }
  };

  const notifySuccess = () => {
    toast.success("Users updated successfully", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  const notifyFail = () => {
    toast.error("Failed to update users", {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  return (
    <div
      className="flex items-center justify-center"
      style={{ height: "auto" }}
    >
      <div className="w-full max-w-lg p-4 bg-gray-800 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h5 className="text-xl font-medium text-white">Edit User</h5>
          <div className="mb-6">
            <label
              htmlFor="full_name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Edit Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              value={formData.full_name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="The hobbit"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="full_address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Edit address
            </label>
            <input
              type="text"
              id="full_address"
              name="full_address"
              onChange={(e) =>
                setFormData({ ...formData, full_address: e.target.value })
              }
              value={formData.full_address}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="additional_address_details"
              className="block mb-2 text-sm font-medium text-white"
            >
              Edit address details
            </label>
            <input
              type="text"
              id="additional_address_details"
              name="additional_address_details"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  additional_address_details: e.target.value,
                })
              }
              value={formData.additional_address_details}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Address details"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-white"
            >
              Edit phone number
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              value={formData.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="phone"
              required
            />
          </div>
          <div className="col-span-2">
            <label
              className="block mb-2 text-sm font-medium text-white dark:text-white"
              htmlFor="file_input"
            >
              Upload the user's image
            </label>
            <input
              className="block w-full text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="id_authors"
              className="block mb-2 text-sm font-medium text-white"
              value="Select the Author"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

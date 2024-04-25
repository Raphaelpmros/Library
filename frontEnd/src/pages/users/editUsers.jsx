import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { findUser, updateUsers } from "../../../requests_api/users";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";

export default function EditUser() {
  const { id } = useParams();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [imageUrl, setImageUrl] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    image: "",
    full_address: "",
    additional_address_details: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  console.log(imageUrl)
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file);
    }
  };

  const formChange = (e) => {
    if (e.target.id === "passwordConfirm") {
      setPasswordConfirm(e.target.value);
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const containsNumber = (password) => {
    const numbers = password.match(/\d/g);
    return numbers ? numbers.length : 0;
  };

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

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!containsNumber(formData.password) || formData.password.length < 5) {
      notifyFail("The password is very weak. Try a more complex password.");
      return;
    }

    try {
      const formDataObject = new FormData();
      formDataObject.append("full_name", formData.full_name);
      formDataObject.append("username", formData.username);
      formDataObject.append("password", formData.password);
      formDataObject.append("description", formData.description);
      formDataObject.append("image", imageUrl);

      if (formData.password !== passwordConfirm) {
        notifyFail("Passwords do not match");
        return;
      }

      await updateUsers(id, formData);
      navigate("/");
      notifySuccess();
      logout();
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
              onChange={formChange}
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
              onChange={formChange}
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
              onChange={formChange}
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
              type="text"
              id="phone"
              name="phone"
              onChange={formChange}
              value={formData.phone}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="phone"
              required
            />
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={formChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                tabIndex={-1}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          <div className="">
            <label
              htmlFor="passwordConfirm"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Type your password again
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="passwordConfirm"
                onChange={formChange}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                tabIndex={-1}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
          </div>

          <div className="text-sm	bg-gray-200 rounded-lg drop-shadow-lg">
            <h1 className="text-black text-center text-lg">
              Password validation:
            </h1>
            {formData.password.length < 8 ? (
              <p className="text-red-500 p-2">
                Password must contain 8 character
              </p>
            ) : (
              <p className="text-green-500 p-2">
                Password must contain 5 character
              </p>
            )}
            {containsNumber(formData.password) < 2 ? (
              <p className="text-red-500 p-2">
                Password must contain at least 2 numbers
              </p>
            ) : (
              <p className="text-green-500 p-2">
                Password contains at least 2 numbers
              </p>
            )}
          </div>

          <div className="">
            <label
              className="block mb-2 text-sm font-medium text-white dark:text-white"
              htmlFor="file_input"
            >
              Upload your profile picture
            </label>
            <input
              className="block w-full text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
              onChange={handleFileChange}
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

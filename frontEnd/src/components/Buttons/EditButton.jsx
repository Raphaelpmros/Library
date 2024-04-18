import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { updateAuthor, findAuthor } from "../../../requests_api/authors";
import { toast } from "react-toastify";

export default function EditButton({ authorId }) {
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
      full_name: "",
      nationality: "",
    });
  
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
  
    const fetchAuthorData = async () => {
      try {
        // Substitua 'getAuthorById' pela função apropriada para buscar os dados do autor
        const response = await findAuthor(authorId); // Implemente essa função na sua API
  
        if (response && response.data) {
          const { full_name, nationality } = response.data;
          setFormData({ full_name, nationality });
        }
      } catch (error) {
        console.error("Error fetching author data:", error);
      }
    };
  
    useEffect(() => {
      if (open) {
        fetchAuthorData();
      }
    }, [open]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setIsSubmitting(true);
        await updateAuthor(formData);
        notifySucess();
        onCloseModal(); // Fechar o modal após sucesso
      } catch (error) {
        notifyFail("Something went wrong");
        console.error("Error calling API:", error.message);
        console.error("Server response:", error.response.data);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    const notifySucess = () => {
      toast.success("Author updated successfully", {
        position: "bottom-right",
        autoClose: 1000,
      });
    };
  
    const notifyFail = () => {
      toast.error("Failed to update author", {
        position: "bottom-right",
        autoClose: 1000,
      });
    };
  
    return (
      <div>
        <EditIcon sx={{ color: "green" }} onClick={onOpenModal} />
        <Modal open={open} onClose={onCloseModal} center className="bg-gray-700">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 bg-gray-700">
                <h3 className="text-lg font-semibold text-white">Edit Author</h3>
              </div>
  
              <form className="p-4 md:p-5 bg-gray-700" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="full_name" className="block mb-2 text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="full_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="nationality" className="block mb-2 text-sm font-medium text-white">
                      Nationality
                    </label>
                    <input
                      type="text"
                      id="nationality"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Edit author
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
  
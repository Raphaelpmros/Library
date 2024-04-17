import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteButton from "../../components/Buttons/DeleteButton";
import EditButton from "../../components/Buttons/EditButton";

export default function Perfil() {
  const [userData, setUserData] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("user");
    if (userDataFromStorage) {
      const parsedUserData = JSON.parse(userDataFromStorage);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div
          className="max-w-sm bg-gray-800 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          style={{ width: "20rem" }}
        >
          <div className="flex justify-center" style={{ height: "25rem" }}>
            {" "}
            <img
              className="rounded-t-lg object-cover w-auto"
              src={userData.image}
              alt=""
            />
          </div>
          <div className="p-5">
            <div className="flex justify-center">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                Email: {userData.email}
              </h5>
            </div>
            <div className="flex justify-center">
              <p className="mb-3 font-normal text-white">
                Name: {userData.full_name}
              </p>
            </div>
            <div className="flex justify-center">
              <p className="mb-3 font-normal text-white">
                CPF: {userData.cpf}
               </p>
            </div>
            <div className="flex justify-center">
              <p className="mb-3 font-normal text-white">
                Address: {userData.full_address} -{" "}
                {userData.additional_address_details}
              </p>
            </div>
            <div className="flex justify-center text-white">
              <p className="mb-3 font-normal text-white">
                Phone: {userData.phone}
              </p>
            </div>
            <div className="flex justify-center text-white">
              <p className="mb-3 font-normal text-white">
                <DeleteButton/><EditButton/>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

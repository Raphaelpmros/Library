import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

export default function EditButtonModal({ link, id }) {
  return (
    <div>
      <Link to={`${link}${id}`}>
        <EditIcon sx={{ color: "green" }} />
      </Link>
    </div>
  );
}
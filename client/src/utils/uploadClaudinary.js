import React from "react";
import { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } from "../config";
const upload_preset = VITE_UPLOAD_PRESET;
const cloud_name = VITE_CLOUD_NAME;


const uploadClaudinary = async (file) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("upload_preset", upload_preset);
  uploadData.append("cloud_name", cloud_name);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );
  const data = await res.json();
  return data;
};

export default uploadClaudinary;

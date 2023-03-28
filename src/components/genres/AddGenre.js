import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddGenre() {
  const apiUrl = "http://localhost:8000/api";
  const apiKey = localStorage.getItem("apiKey");

  const navigate = useNavigate();

  const screenClick = (evt) => {
    if (evt.target.id === "screen-view") navigate("/dashboard/genres");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    axios
      .post(apiUrl + "/genres", form, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        if (res.status === 200) navigate("/dashboard/genres");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] flex items-center justify-center"
      id="screen-view"
      onClick={screenClick}
    >
      <div
        className="w-auto h-auto p-8 bg-[#0e1420] rounded-xl overflow-y-scroll"
        id="form-container"
      >
        <h1 className="font-bold text-xl">Add Genre</h1>
        <form className="w-[350px] mt-4" onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 bg-blue-500 hover:bg-blue-600 transition-all duration-100 ease-in-out rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

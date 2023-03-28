import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import AddFile from "./AddFile";

import Delete from "./Delete";

export default function Files(props) {
  const apiUrl = "http://localhost:8000/api";
  const apiKey = localStorage.getItem("apiKey");

  const [data, setData] = useState([]);
  const loadingRef = useRef(null);

  const [deleteState, setDeleteState] = useState(null);

  const getData = useCallback(() => {
    loadingRef.current.continuousStart();

    loadingRef.current.staticStart();

    axios
      .get(apiUrl + "/files", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        setData(res.data);
        loadingRef.current.complete();
      })
      .catch((err) => console.log(err));
  }, []);

  const resetDelSelect = () => {
    setDeleteState(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day[d.getDay()]}, ${d.getDate()} ${
      month[d.getMonth()]
    } ${d.getFullYear()}`;
  };

  const iconSet = (type) => {
    if (type === "image/jpeg" || type === "image/png")
      return <i className="fa-light fa-image"></i>;
    if (type === "video/mp4" || type === "video/x-matroska")
      return <i className="fa-light fa-video"></i>;
    return <i className="fa-light fa-ellipsis"></i>;
  };

  const setMessage = (msg) => {
    props.message(msg);
  };

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="w-full h-screen p-16 pb-32 overflow-y-scroll">
      <LoadingBar color="#f11946" ref={loadingRef} />
      <h1 className="font-bold text-2xl">Files</h1>
      <Link to={"/dashboard/files/add-file"}>
        <div className="w-fit h-12 bg-blue-500 flex items-center justify-center my-4 px-4 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-100">
          Add File
        </div>
      </Link>
      <div className="w-full h-auto grid grid-cols-3 mt-8 gap-4">
        {data
          ? data.map((r, i) => (
              <div className="w-full h-auto bg-[#0e1420] rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-0 hover:shadow-lg transition-all duration-100 ease-in-out">
                <div className="w-full h-auto p-4">
                  <div className="font-semibold">{r.name}</div>
                  <div className="h-[200px] my-2 text-gray-400 overflow-hidden text-ellipsis flex items-center justify-center text-6xl">
                    {iconSet(r.type)}
                  </div>
                  <div className="text-sm py-2 text-gray-400">
                    {formatDate(r.updated_at)}
                  </div>
                  <div className="w-full h-auto mt-2 flex gap-2">
                    <div className="w-8 h-8 text-xs rounded-lg flex items-center justify-center hover:bg-blue-500 transition-all duration-100 ease-in-out">
                      <i className="fa-solid fa-pen"></i>
                    </div>
                    <div
                      className="w-8 h-8 text-xs rounded-lg flex items-center justify-center hover:bg-red-500 transition-all duration-100 ease-in-out"
                      onClick={() => setDeleteState(r)}
                    >
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
      <Routes>
        <Route path="add-file" element={<AddFile />} />
      </Routes>
      <Delete
        show={deleteState !== null}
        reset={resetDelSelect}
        data={deleteState}
        setMsg={setMessage}
      />
    </div>
  );
}

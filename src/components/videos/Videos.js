import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import AddVideo from "./AddVideo";
import Delete from "./Delete";

export default function Videos() {
  const apiUrl = "http://localhost:8000/api";
  const apiKey = localStorage.getItem("apiKey");
  const [data, setData] = useState([]);
  const loadingRef = useRef(null);

  const [deleteState, setDeleteState] = useState(null);

  const getData = useCallback(() => {
    loadingRef.current.continuousStart();

    loadingRef.current.staticStart();
    axios
      .get(apiUrl + "/videos", {
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

  const resetDelSelect = () => {
    setDeleteState(null);
  };

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className="w-full h-screen p-16 pb-32 overflow-y-scroll">
      <LoadingBar color="#f11946" ref={loadingRef} />
      <h1 className="font-bold text-2xl">Videos</h1>
      <Link to={"/dashboard/videos/add-video"}>
        <div className="w-fit h-12 bg-blue-500 flex items-center justify-center my-4 px-4 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-100">
          Add Video
        </div>
      </Link>
      <div className="w-full h-auto grid grid-cols-3 mt-8 gap-4">
        {data
          ? data.map((r, i) => (
              <Link key={i + 1}>
                <div className="w-full h-auto bg-[#0e1420] rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-0 hover:shadow-lg transition-all duration-100 ease-in-out">
                  <img
                    src={"http://127.0.0.1:8000/storage/" + r.images}
                    alt=""
                  />
                  <div className="w-full h-auto p-4">
                    <div className="font-semibold">{r.name}</div>
                    <div className="max-h-[200px] text-sm my-2 text-gray-400 overflow-hidden text-ellipsis">
                      {r.descriptions}
                    </div>
                    <div className="text-sm py-2 text-gray-400">
                      {formatDate(r.created_at)}
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
              </Link>
            ))
          : ""}
      </div>
      <Routes>
        <Route path="add-video" element={<AddVideo />} />
      </Routes>
      <Delete
        show={deleteState !== null}
        reset={resetDelSelect}
        data={deleteState}
      />
    </div>
  );
}

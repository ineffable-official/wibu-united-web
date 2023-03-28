import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

import AddStudio from "./AddStudio";
import Delete from "./Delete";

export default function Studios() {
  const apiUrl = "http://localhost:8000/api";
  const apiKey = localStorage.getItem("apiKey");

  const [data, setData] = useState([]);
  const loadingRef = useRef(null);

  const [deleteState, setDeleteState] = useState(null);

  const getData = useCallback(() => {
    loadingRef.current.continuousStart();

    loadingRef.current.staticStart();

    axios
      .get(apiUrl + "/studios", {
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

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="w-full h-screen p-16 pb-32 overflow-y-scroll">
      <LoadingBar color="#f11946" ref={loadingRef} />
      <h1 className="font-bold text-2xl">Studios</h1>
      <Link to={"/dashboard/studios/add-studio"}>
        <div className="w-fit h-12 bg-blue-500 flex items-center justify-center my-4 px-4 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-100">
          Add Studio
        </div>
      </Link>
      <div className="w-full h-auto grid grid-cols-6 mt-8 gap-4">
        {data
          ? data.map((r, i) => (
              <div className="w-full h-auto bg-[#0e1420] rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-0 hover:shadow-lg transition-all duration-100 ease-in-out relative ">
                <div
                  className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center absolute top-1 right-2 text-[8px] cursor-pointer hover:bg-red-700"
                  onClick={() => setDeleteState(r)}
                >
                  <i className="fa-light fa-x"></i>
                </div>
                <div className="w-full h-auto p-4 text-center">
                  <div className="font-semibold">{r.name}</div>
                </div>
              </div>
            ))
          : ""}
      </div>
      <Routes>
        <Route path="add-studio" element={<AddStudio />} />
      </Routes>
      <Delete
        show={deleteState !== null}
        reset={resetDelSelect}
        data={deleteState}
      />
    </div>
  );
}

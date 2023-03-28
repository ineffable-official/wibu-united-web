import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import AdminSidebar from "../../../src/components/AdminSidebar";

export default function Animes() {
  const apiUrl = "https://api.ineffablely.site";
  const [data, setData] = useState([]);
  const [apiKey, setApiKey] = useState(null);

  const getData = useCallback(() => {
    axios
      .get(apiUrl + "/api/animes")
      .then((res) => setData(res.data.data))
      .catch((err) => {
        throw err;
      });
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
    setApiKey(localStorage.getItem("api-key"));
    getData();
  }, [getData]);
  return (
    <div className="w-screen h-screen flex font-medium">
      <AdminSidebar />
      <div className="w-full h-full">
        <div className="w-full h-screen p-16 pb-32 overflow-y-scroll">
          <h1 className="font-bold text-2xl">Animes</h1>
          <Link href={"/admin/animes/add"}>
            <div className="w-fit h-12 bg-blue-500 flex items-center justify-center my-4 px-4 rounded-lg hover:bg-blue-600 transition-all ease-in-out duration-100 text-white">
              Add Anime
            </div>
          </Link>
          <div className="w-full h-auto grid grid-cols-3 mt-8 gap-4">
            {data
              ? data.map((r, i) => (
                  <Link href={"/admin"} key={i + 1}>
                    <div className="w-full h-auto rounded-2xl overflow-hidden border-[1px] border-gray-200 hover:border-0 hover:shadow-lg transition-all duration-100 ease-in-out">
                      <picture>
                        <img src={apiUrl + "/storage/" + r.images} alt="" className="w-full"/>
                      </picture>
                      <div className="w-full h-auto p-4">
                        <div className="font-semibold">{r.name}</div>
                        <div className="max-h-[200px] text-sm my-2 text-gray-400 overflow-hidden text-ellipsis">
                          {r.descriptions}
                        </div>
                        <div className="text-sm py-2 text-gray-400">
                          {formatDate(r.created_at)}
                        </div>
                        <div className="w-full h-auto mt-2 flex gap-2">
                          <div className="w-8 h-8 text-xs rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-100 ease-in-out">
                            <i className="fa-solid fa-pen"></i>
                          </div>
                          <div
                            className="w-8 h-8 text-xs rounded-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-100 ease-in-out"
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
        </div>
      </div>
    </div>
  );
}

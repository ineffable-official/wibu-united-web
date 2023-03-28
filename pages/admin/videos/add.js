import { useEffect, useReducer, useState } from "react";
import AdminSidebar from "../../../src/components/AdminSidebar";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function AddVideo() {
  const [apiKey, setApiKey] = useState(null);

  const apiUrl = "https://api.ineffablely.site/api";

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [animeList, setTypeList] = useState([]);
  const [anime, setType] = useState();
  const [animeInput, setTypeInput] = useState();
  const [message, setMessage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [submitBtn, setSubmitBtn] = useState(false);

  const router = useRouter();

  const openAnimesOptions = (event) => {
    const elmt = document.getElementById("animes-options");
    elmt.style.display = "flex";

    const query = event.target.value;
    setTypeInput(query);

    axios
      .post(apiUrl + "/animes/search?q=" + query, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        setTypeList(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const setSelectedType = (r) => {
    setType(r.id);
    setTypeInput(r.name);
    const elmt = document.getElementById("animes-options");
    elmt.style.display = "none";
  };

  const onImagesChange = (event) => {
    const imagesSrc = document.getElementById("images-src");
    imagesSrc.innerText = event.target.value;
  };

  const onVideosChange = (event) => {
    const videosSrc = document.getElementById("videos-src");
    videosSrc.innerText = event.target.value;
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    setUploading(true);

    const form = new FormData(evt.target);

    axios
      .post(apiUrl + "/videos", form, {
        onUploadProgress: (progressEvent) => {
          var percent =
            Math.round(progressEvent.loaded * 100) / progressEvent.total;

          setUploadProgress(percent);
        },
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        if (res.data.status === 1) {
          router.push("/admin/videos");
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    setApiKey(localStorage.getItem("api-key"));
  }, []);
  return (
    <div className="w-screen h-screen flex font-medium">
      <AdminSidebar apiKey={apiKey} />
      <div className="w-full h-screen overflow-y-scroll p-16" id="screen-view">
        <h1 className="font-bold text-xl">Add Video</h1>
        <div className="w-auto p-2 px-3"></div>
        <form className="w-[350px] mt-4" onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama"
              className="w-full h-12  border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.name ? "rgb(239 68 68)" : "" }}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="slug"
              id="slug"
              placeholder="Slug"
              style={{ borderColor: message.slug ? "rgb(239 68 68)" : "" }}
              className="w-full h-12  border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Anime"
              className="w-full h-12  border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.type ? "rgb(239 68 68)" : "" }}
              onChange={openAnimesOptions}
              value={animeInput}
            />
            <div
              className="w-full h-auto p-2 bg-white absolute rounded-xl shadow-xl border-[1px] border-gray-200 flex-col hidden z-20"
              id="animes-options"
            >
              {animeList
                ? animeList.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(0,0,0,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedType(r)}
                      key={i + 1}
                    >
                      {r.name}
                    </div>
                  ))
                : ""}
            </div>
            <input type="number" name="anime_id" hidden={true} value={anime} />
          </div>

          <div className="mb-4">
            <textarea
              type="text"
              name="descriptions"
              id="descriptions"
              placeholder="Descriptions"
              className="w-full h-auto  border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 py-2 transition-all duration-100 ease-in-out text-sm"
              style={{
                borderColor: message.descriptions ? "rgb(239 68 68)" : "",
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="images"
              id="images"
              placeholder="Thumbnail url"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.name ? "rgb(239 68 68)" : "" }}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="videos"
              id="videos"
              placeholder="Video url"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.name ? "rgb(239 68 68)" : "" }}
            />
          </div>
          {uploading ? (
            <div className="w-full h-auto my-4 rounded-lg bg-[rgba(0,0,0,0.25)]">
              <div
                className="w-full h-8 bg-blue-500 rounded-lg text-white transition-all duration-100 ease-in-out flex items-center justify-center text-xs"
                style={{ width: uploadProgress + "%" }}
              >
                {uploadProgress.toFixed(0) + "%"}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex">
            <Link
              href={"/admin/videos"}
              className="w-full h-11 flex items-center justify-center"
            >
              Back
            </Link>
            <button
              type="submit"
              className="w-full h-11 bg-blue-500 hover:bg-blue-600 text-white transition-all duration-100 ease-in-out rounded-lg"
            >
              {submitBtn ? "Saved" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

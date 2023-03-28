import axios from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddVideo() {
  const apiUrl = "http://localhost:8000/api";
  const apiKey = localStorage.getItem("apiKey");
  const navigate = useNavigate();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [animeList, setTypeList] = useState([]);
  const [anime, setType] = useState();
  const [animeInput, setTypeInput] = useState();
  const [message, setMessage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
        setTypeList(res.data);
      })
      .catch((err) => {
        console.log(err);
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

  const screenClick = (evt) => {
    if (evt.target.id === "screen-view") navigate("/dashboard/videos");
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
          navigate("/dashboard/videos");
        }
        setMessage(res.data.message);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.25)] flex items-center justify-center"
      id="screen-view"
      onClick={screenClick}
    >
      <div
        className="w-auto h-[400px] p-8 bg-[#0e1420] rounded-xl overflow-y-scroll"
        id="form-container"
      >
        <h1 className="font-bold text-xl">Add Video</h1>
        <div className="w-auto p-2 px-3"></div>
        <form className="w-[350px] mt-4" onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
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
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Anime"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.type ? "rgb(239 68 68)" : "" }}
              onChange={openAnimesOptions}
              value={animeInput}
            />
            <div
              className="w-full h-auto p-2 bg-[#0d131d] absolute rounded-xl shadow-xl border-2 border-gray-900 flex-col hidden z-20"
              id="animes-options"
            >
              {animeList
                ? animeList.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(255,255,255,0.05)] text-xs cursor-pointer"
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
              className="w-full h-auto border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] p-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{
                borderColor: message.descriptions ? "rgb(239 68 68)" : "",
              }}
            />
          </div>
          <div className="mb-4">
            <div className="w-full h-auto flex flex-row items-center">
              <label
                htmlFor="images"
                className="text-xs p-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-center"
              >
                Upload Thumbnail
              </label>
              <div className="text-xs ml-2" id="images-src"></div>
            </div>
            <input
              type="file"
              name="images"
              id="images"
              hidden
              onChange={onImagesChange}
            />
          </div>
          <div className="mb-4">
            <div className="w-full h-auto flex flex-row items-center">
              <label
                htmlFor="videos"
                className="text-xs p-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-center"
              >
                Upload Video
              </label>
              <div className="text-xs ml-2" id="videos-src"></div>
            </div>
            <input
              type="file"
              name="videos"
              id="videos"
              hidden
              onChange={onVideosChange}
            />
          </div>
          {uploading ? (
            <div className="w-full h-auto my-4 rounded-lg bg-[rgba(0,0,0,0.25)]">
              <div
                className="w-full h-8 bg-blue-500 rounded-lg transition-all duration-100 ease-in-out flex items-center justify-center text-xs"
                style={{ width: uploadProgress + "%" }}
              >
                {uploadProgress.toFixed(0) + "%"}
              </div>
            </div>
          ) : (
            ""
          )}
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

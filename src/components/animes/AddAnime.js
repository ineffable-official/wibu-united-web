import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAnime() {
  const apiUrl = "http://localhost:8000/api";

  const navigate = useNavigate();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [genreList, setGenreList] = useState([]);
  const [studiosList, setStudioList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [animeSeasons, setAnimeSeasons] = useState([]);

  const [genre, setGenre] = useState([]);
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [premiered, setPremiered] = useState();
  const [studio, setStudio] = useState();

  const [typeInput, setTypeInput] = useState();
  const [statusInput, setStatusInput] = useState();
  const [studioInput, setStudioInput] = useState();
  const [seasonsInput, setSeasonsInput] = useState();

  const apiKey = localStorage.getItem("apiKey");

  const [message, setMessage] = useState({
    message: {
      studios: ["The studios field is required."],
      duration: ["The duration field is required."],
    },
  });

  const openTypeOptions = (event) => {
    const elmt = document.getElementById("types-options");
    elmt.style.display = "flex";

    const query = event.target.value;
    setTypeInput(query);

    axios
      .post(apiUrl + "/types/search?q=" + query)
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
    const elmt = document.getElementById("types-options");
    elmt.style.display = "none";
  };

  const openStatusOptions = (event) => {
    const elmt = document.getElementById("status-options");
    const query = event.target.value;
    setStatusInput(query);

    axios
      .post(apiUrl + "/status/search?q=" + query)
      .then((res) => {
        setStatusList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    elmt.style.display = "flex";
  };

  const setSelectedStatus = (i) => {
    setStatus(i.id);
    setStatusInput(i.name);
    const elmt = document.getElementById("status-options");
    elmt.style.display = "none";
  };

  const openSeasonsOptions = (event) => {
    const elmt = document.getElementById("seasons-options");
    const query = event.target.value;
    setSeasonsInput(query);

    axios
      .post(apiUrl + "/seasons/search?q=" + query)
      .then((res) => {
        setAnimeSeasons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    elmt.style.display = "flex";
  };

  const setSelectedSeasons = (id) => {
    setPremiered(id.id);
    setSeasonsInput(id.name);
    const elmt = document.getElementById("seasons-options");
    elmt.style.display = "none";
  };

  const openStudiosOptions = (event) => {
    const elmt = document.getElementById("studios-options");
    const query = event.target.value;
    setStudioInput(query);

    axios
      .post(apiUrl + "/studios/search?q=" + query)
      .then((res) => {
        setStudioList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    elmt.style.display = "flex";
  };

  const setSelectedStudios = (id) => {
    setStudio(id.id);
    setStudioInput(id.name);
    const elmt = document.getElementById("studios-options");
    elmt.style.display = "none";
  };

  const onImagesChange = (event) => {
    const imagesSrc = document.getElementById("images-src");
    imagesSrc.innerText = event.target.value;
  };

  const screenClick = (evt) => {
    if (evt.target.id === "screen-view") navigate("/dashboard/animes");
  };

  const getGenreList = useCallback(() => {
    axios
      .get(apiUrl + "/genres", {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        setGenreList(res.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  const selectGenre = (ops) => {
    const g = genre;
    if (g.includes(ops.id)) {
      const i = g.indexOf(ops.id);
      g.splice(i);
      setGenre(g);
      forceUpdate();
      return;
    }

    g.push(ops.id);
    setGenre(g);
    forceUpdate();
  };

  const checkSelected = (ops) => {
    const g = genre;
    if (g.includes(ops.id)) return true;
  };

  const submitHandler = (evt) => {
    evt.preventDefault();

    const form = new FormData(evt.target);

    axios
      .post(apiUrl + "/animes", form, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })
      .then((res) => {
        if (res.data.status === 1) navigate("/dashboard/animes");
        setMessage(res.data.message);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getGenreList();
  }, [getGenreList]);

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
        <h1 className="font-bold text-xl">Add Anime</h1>
        <div className="w-auto p-2 px-3"></div>
        <form className="w-[350px] mt-4" onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama anime"
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
              placeholder="Type"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.type ? "rgb(239 68 68)" : "" }}
              onChange={openTypeOptions}
              value={typeInput}
            />
            <div
              className="w-full h-auto p-2 bg-[#0d131d] absolute rounded-xl shadow-xl border-2 border-gray-900 flex-col hidden z-20"
              id="types-options"
            >
              {typeList
                ? typeList.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(255,255,255,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedType(r)}
                    >
                      {r.name}
                    </div>
                  ))
                : ""}
            </div>
            <input type="number" name="type" hidden={true} value={type} />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="episodes"
              id="episodes"
              style={{ borderColor: message.episodes ? "rgb(239 68 68)" : "" }}
              placeholder="Episodes"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Status"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              onChange={openStatusOptions}
              value={statusInput}
              style={{ borderColor: message.status ? "rgb(239 68 68)" : "" }}
            />
            <div
              className="w-full h-auto p-2 bg-[#0d131d] absolute rounded-xl shadow-xl border-2 border-gray-900 flex-col hidden z-20"
              id="status-options"
            >
              {statusList
                ? statusList.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(255,255,255,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedStatus(r)}
                    >
                      {r.name}
                    </div>
                  ))
                : ""}
            </div>
            <input type="number" name="status" hidden={true} value={status} />
          </div>
          <div className="mb-4">
            <div className="text-sm mb-2 text-gray-400">Aired</div>
            <div className="flex gap-2">
              <input
                type="date"
                name="aired_from"
                id="aired_from"
                style={{
                  borderColor: message.aired_from ? "rgb(239 68 68)" : "",
                }}
                className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              />
              <input
                type="date"
                name="aired_to"
                id="aired_to"
                style={{
                  borderColor: message.aired_to ? "rgb(239 68 68)" : "",
                }}
                className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Premiered"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              onChange={openSeasonsOptions}
              style={{ borderColor: message.seasons ? "rgb(239 68 68)" : "" }}
              value={seasonsInput}
            />
            <div
              className="w-full h-auto p-2 bg-[#0d131d] absolute rounded-xl shadow-xl border-2 border-gray-900 flex-col hidden z-20"
              id="seasons-options"
            >
              {animeSeasons
                ? animeSeasons.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(255,255,255,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedSeasons(r)}
                    >
                      {r.name}
                    </div>
                  ))
                : ""}
            </div>
            <input
              type="number"
              name="seasons"
              hidden={true}
              value={premiered}
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Studios"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              onChange={openStudiosOptions}
              style={{ borderColor: message.studios ? "rgb(239 68 68)" : "" }}
              value={studioInput}
            />
            <div
              className="w-full h-auto p-2 bg-[#0d131d] absolute rounded-xl shadow-xl border-2 border-gray-900 flex-col hidden z-20"
              id="studios-options"
            >
              {studiosList
                ? studiosList.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(255,255,255,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedStudios(r)}
                    >
                      {r.name}
                    </div>
                  ))
                : ""}
            </div>
            <input type="number" name="studios" hidden={true} value={studio} />
          </div>
          <div className="mb-4">
            <div className="w-full h-auto border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] p-4 py-2 outline-none rounded-xl">
              <div
                className="text-sm text-gray-400"
                style={{ color: message.genres ? "rgb(239 68 68)" : "" }}
              >
                Genre
              </div>
              <div className="w-auto h-auto p-2 flex flex-row items-center gap-2 overflow-x-scroll">
                {genreList.map((g) => (
                  <div
                    className="w-fit p-2 rounded-lg text-xs px-4 cursor-pointer"
                    style={{
                      backgroundColor: checkSelected(g)
                        ? "rgb(29 78 216)"
                        : "rgba(255,255,255,0.075)",
                    }}
                    onClick={() => selectGenre(g)}
                  >
                    {g.name}
                  </div>
                ))}
              </div>
            </div>
            <input
              type="string"
              name="genres"
              hidden={true}
              value={`[${genre}]`}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="duration"
              id="duration"
              placeholder="Duration"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.duration ? "rgb(239 68 68)" : "" }}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="score"
              id="score"
              placeholder="Score"
              className="w-full h-12 border-2 border-gray-800 bg-[rgba(0,0,0,0.1)] px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.score ? "rgb(239 68 68)" : "" }}
            />
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

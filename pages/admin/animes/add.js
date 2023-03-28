import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useReducer, useState } from "react";
import AdminSidebar from "../../../src/components/AdminSidebar";

export default function AddAnimes() {
  const router = useRouter();
  const apiUrl = "https://api.ineffablely.site/api";

  const [apiKey, setApiKey] = useState(null);
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
  const [submitBtn, setSubmitBtn] = useState(false);

  const [message, setMessage] = useState([]);

  const openTypeOptions = (event) => {
    const elmt = document.getElementById("types-options");
    elmt.style.display = "flex";

    const query = event.target.value;
    setTypeInput(query);

    axios
      .post(apiUrl + "/types/search?q=" + query)
      .then((res) => {
        setTypeList(res.data.data);
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
        setStatusList(res.data.data);
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
        setAnimeSeasons(res.data.data);
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
        setStudioList(res.data.data);
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

  const getGenreList = useCallback(() => {
    axios
      .get(apiUrl + "/genres", {
        headers: { Authorization: "Bearer " + apiKey },
      })
      .then((res) => {
        setGenreList(res.data.data);
      })
      .catch((err) => {});
  }, [apiKey]);

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
        if (res.data.status === 1) {
          router.push("/admin/animes");
        } else {
          setMessage(res.data.message);
        }
        setSubmitBtn(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    setApiKey(localStorage.getItem("api-key"));
    getGenreList();
  }, [getGenreList]);

  return (
    <div className="w-screen h-screen flex font-medium">
      <AdminSidebar apiKey={apiKey} />
      <div className="w-full h-screen overflow-y-scroll p-16" id="screen-view">
        <h1 className="font-bold text-xl">Add Anime</h1>
        {!message ? (
          <div className="w-[350px] p-2 px-3 bg-red-400 text-white rounded-xl">
            {message[0]}
          </div>
        ) : (
          ""
        )}
        <form className="w-[350px] mt-4" onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nama anime"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
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
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Type"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.type ? "rgb(239 68 68)" : "" }}
              onChange={openTypeOptions}
              value={typeInput}
            />
            <div
              className="w-full h-auto p-2 bg-white absolute rounded-xl border-[1px] border-gray-200 flex-col hidden z-20"
              id="types-options"
            >
              {typeList
                ? typeList.map((r, i) => (
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
            <input type="number" name="type" hidden={true} value={type} />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="episodes"
              id="episodes"
              style={{
                borderColor: message.episodes ? "rgb(239 68 68)" : "",
              }}
              placeholder="Episodes"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Status"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              onChange={openStatusOptions}
              value={statusInput}
              style={{
                borderColor: message.status ? "rgb(239 68 68)" : "",
              }}
            />
            <div
              className="w-full h-auto p-2 bg-white absolute rounded-xl border-[1px] border-gray-200 flex-col hidden z-20"
              id="status-options"
            >
              {statusList
                ? statusList.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(0,0,0,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedStatus(r)}
                      key={i + 1}
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
                className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              />
              <input
                type="date"
                name="aired_to"
                id="aired_to"
                style={{
                  borderColor: message.aired_to ? "rgb(239 68 68)" : "",
                }}
                className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Premiered"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              onChange={openSeasonsOptions}
              style={{
                borderColor: message.seasons ? "rgb(239 68 68)" : "",
              }}
              value={seasonsInput}
            />
            <div
              className="w-full h-auto p-2 bg-white absolute rounded-xl border-[1px] border-gray-200 flex-col hidden z-20"
              id="seasons-options"
            >
              {animeSeasons
                ? animeSeasons.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(0,0,0,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedSeasons(r)}
                      key={i + 1}
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
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              onChange={openStudiosOptions}
              style={{
                borderColor: message.studios ? "rgb(239 68 68)" : "",
              }}
              value={studioInput}
            />
            <div
              className="w-full h-auto p-2 bg-white absolute rounded-xl border-[1px] border-gray-200 flex-col hidden z-20"
              id="studios-options"
            >
              {studiosList
                ? studiosList.map((r, i) => (
                    <div
                      className="w-full h-11 flex items-center justify-center rounded-xl mb-2 hover:bg-[rgba(0,0,0,0.05)] text-xs cursor-pointer"
                      onClick={() => setSelectedStudios(r)}
                      key={i + 1}
                    >
                      {r.name}
                    </div>
                  ))
                : ""}
            </div>
            <input type="number" name="studios" hidden={true} value={studio} />
          </div>
          <div className="mb-4">
            <div className="w-full h-auto border-[1px] border-gray-800 p-4 py-2 outline-none rounded-xl">
              <div
                className="text-sm text-gray-400"
                style={{ color: message.genres ? "rgb(239 68 68)" : "" }}
              >
                Genre
              </div>
              <div className="w-auto h-auto p-2 flex flex-row items-center gap-2 overflow-x-scroll">
                {genreList.map((g, i) => (
                  <div
                    className="w-fit p-2 rounded-lg text-xs px-4 cursor-pointer"
                    style={{
                      color: checkSelected(g)
                        ? "rgb(255,255,255)"
                        : "rgb(0,0,0)",

                      backgroundColor: checkSelected(g)
                        ? "rgba(0,0,0, 0.5)"
                        : "rgba(0,0,0,0.075)",
                    }}
                    onClick={() => selectGenre(g)}
                    key={i + 1}
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
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{
                borderColor: message.duration ? "rgb(239 68 68)" : "",
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="score"
              id="score"
              placeholder="Score"
              className="w-full h-12 border-[1px] border-gray-800 px-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
              style={{ borderColor: message.score ? "rgb(239 68 68)" : "" }}
            />
          </div>
          <div className="mb-4">
            <textarea
              type="text"
              name="descriptions"
              id="descriptions"
              placeholder="Descriptions"
              className="w-full h-auto border-[1px] border-gray-800 p-4 outline-none rounded-xl focus:border-gray-700 transition-all duration-100 ease-in-out text-sm"
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
          <div className="flex">
            <Link
              href={"/admin/animes"}
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

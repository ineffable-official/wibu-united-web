import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const apiUrl = "https://api.ineffablely.site";
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    axios
      .post(apiUrl + "/api/login", form)
      .then((res) => {
        if (res.data.status) {
          router.push("/admin");
          localStorage.setItem("api-key", res.data.data.token);
        } else {
          setMsg(res.data.message);
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  return (
    <div className="w-screen h-screen text-white bg-[#111926] flex items-center justify-center">
      <div className="w-[350px] h-auto p-8 bg-[#0e1420] rounded-xl">
        <h1 className="text-2xl font-semibold">Login</h1>
        <div className="my-2 text-red-500 text-sm text-center">{msg}</div>
        <form className="mt-4" onSubmit={onSubmit}>
          <div className="flex">
            <div className="w-10 h-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)] rounded-l-xl">
              <i className="fa-light fa-user-circle"></i>
            </div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full h-10 bg-[rgba(0,0,0,0.25)] px-4 text-sm focus:bg-[rgba(0,0,0,0.5)] rounded-r-xl"
            />
          </div>
          <div className="flex mt-2">
            <div className="w-10 h-10 flex items-center justify-center bg-[rgba(0,0,0,0.25)] rounded-l-xl">
              <i className="fa-light fa-key"></i>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full h-10 bg-[rgba(0,0,0,0.25)] px-4 text-sm focus:bg-[rgba(0,0,0,0.5)] rounded-r-xl"
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-blue-500 mt-2 rounded-xl font-medium hover:bg-blue-600 text-sm"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

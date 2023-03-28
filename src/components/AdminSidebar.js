import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AdminSidebar(props) {
  const [dataMaster, setDataMaster] = useState(false);
  const router = useRouter();

  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    setApiKey(router.query.apiKey);
  }, [router.query]);

  return (
    <div className="w-[300px] h-screen p-4 overflow-y-scroll">
      <div className="w-full h-12 flex items-center px-2 font-bold text-3xl">WU</div>
      <div className="w-auto h-auto flex flex-col mt-3">
        <Link href={"/admin"}>
          <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)] rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
            <div className="w-12 h-12 flex items-center justify-center mr-2">
              <i className="fa-light fa-gauge"></i>
            </div>
            <div className="w-auto h-auto text-sm">Dashboard</div>
          </div>
        </Link>
        <Link href={"/admin/animes"}>
          <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
            <div className="w-12 h-12 flex items-center justify-center mr-2">
              <i className="fa-light fa-films"></i>
            </div>
            <div className="w-auto h-auto text-sm">Animes</div>
          </div>
        </Link>
        <Link href={"/admin/videos"}>
          <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
            <div className="w-12 h-12 flex items-center justify-center mr-2">
              <i className="fa-light fa-video"></i>
            </div>
            <div className="w-auto h-auto text-sm">Videos</div>
          </div>
        </Link>
        <Link href={"/admin/files"}>
          <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
            <div className="w-12 h-12 flex items-center justify-center mr-2">
              <i className="fa-light fa-files"></i>
            </div>
            <div className="w-auto h-auto text-sm">Files</div>
          </div>
        </Link>
        <div
          className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2"
          onClick={() =>
            dataMaster ? setDataMaster(false) : setDataMaster(true)
          }
        >
          <div className="w-12 h-12 flex items-center justify-center mr-2">
            <i className="fa-light fa-box"></i>
          </div>
          <div className="w-auto h-auto text-sm">Data Master</div>
        </div>
        {dataMaster ? (
          <div className="flex flex-col">
            <Link href={"/admin/types"}>
              <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)] rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
                <div className="w-12 h-12 flex items-center justify-center mr-2"></div>
                <div className="w-auto h-auto text-sm">Types</div>
              </div>
            </Link>
            <Link href={"/admin/studios"}>
              <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
                <div className="w-12 h-12 flex items-center justify-center mr-2"></div>
                <div className="w-auto h-auto text-sm">Studios</div>
              </div>
            </Link>
            <Link href={"/admin/genres"}>
              <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
                <div className="w-12 h-12 flex items-center justify-center mr-2"></div>
                <div className="w-auto h-auto text-sm">Genres</div>
              </div>
            </Link>
            <Link href={"/admin/seasons"}>
              <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
                <div className="w-12 h-12 flex items-center justify-center mr-2"></div>
                <div className="w-auto h-auto text-sm">Seasons</div>
              </div>
            </Link>
            <Link href={"/admin/status"}>
              <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
                <div className="w-12 h-12 flex items-center justify-center mr-2"></div>
                <div className="w-auto h-auto text-sm">Status</div>
              </div>
            </Link>
          </div>
        ) : (
          ""
        )}
        <Link href={"/admin/about"}>
          <div className="w-full h-auto flex items-center hover:bg-[rgba(0,0,0,0.05)]  rounded-lg text-gray-400 transition-all ease-in-out duration-150 mb-2">
            <div className="w-12 h-12 flex items-center justify-center mr-2">
              <i className="fa-light fa-question-circle"></i>
            </div>
            <div className="w-auto h-auto text-sm">About</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

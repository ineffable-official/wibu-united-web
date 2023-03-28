import { useEffect, useState } from "react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState("00:00:00");
  const [durationInSecond, setDurationInSecond] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [currentTimeInSecond, setCurrentTimeInSecond] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timerangeList, setTimerangeList] = useState([]);

  const play = () => {
    const source = document.getElementById("video-source");

    source.play();
    setIsPlaying(true);
  };

  const pause = () => {
    const source = document.getElementById("video-source");

    source.pause();
    setIsPlaying(false);
  };

  const mute = () => {
    const source = document.getElementById("video-source");

    source.volume = 0;
    setIsMute(true);
  };

  const unmute = () => {
    const source = document.getElementById("video-source");

    source.volume = 1;
    setIsMute(false);
  };

  const videoOnLoad = (e) => {
    const date = new Date(e.target.duration * 1000);

    var convert = 0;

    convert = date.toISOString().substring(11, 19);

    setDuration(convert);
    setDurationInSecond(e.target.duration);
  };

  const handleDurationChange = (e) => {
    const timeline = document.getElementById("timeline");
    const rect = timeline.getBoundingClientRect();
    e.target.ontimeupdate = () => {
      const date = new Date(e.target.currentTime * 1000);

      var convert = 0;

      convert = date.toISOString().substring(11, 19);

      setCurrentTime(convert);
      setCurrentTimeInSecond(e.target.currentTime);

      const range = e.target.buffered;

      const timerangeList = [];
      let start, end;

      for (let r = 0; r < range.length; r++) {
        start = (range.start(r) / e.target.duration) * 100;
        end = (range.end(r) / e.target.duration) * 100;

        let longTime = end - start;

        let cltpx = (longTime / 100) * rect.width;
        let cptw = (start / 100) * rect.width;
        timerangeList.push({ startX: cptw, long: cltpx });

        setTimerangeList(timerangeList);
      }
    };
  };

  const getVideoPosition = (e) => {
    const rect = e.target.getBoundingClientRect();

    const x = e.clientX - rect.left;

    const posInPercent = (x / e.target.clientWidth) * 100;

    var vidTimePosInSecond = (posInPercent / 100) * durationInSecond;

    if (vidTimePosInSecond < 0) {
      vidTimePosInSecond = 0;
    }

    setVidCurrentTime(vidTimePosInSecond);
  };

  const setVidCurrentTime = (pos) => {
    const source = document.getElementById("video-source");

    source.currentTime = pos;
  };

  const loading = () => {
    const source = document.getElementById("video-source");

    if (source.networkState === 2) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const openFullscreen = () => {
    const videoCont = document.getElementById("video-player");

    if (videoCont.requestFullscreen) {
      videoCont.requestFullscreen();
    } else if (videoCont.webkitRequestFullscreen) {
      videoCont.webkitRequestFullscreen();
    } else if (videoCont.msRequestFullscreen) {
      videoCont.msRequestFullscreen();
    }

    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const forward = (second) => {
    const ct = currentTimeInSecond;

    if (ct < 0 || ct > durationInSecond) {
      return;
    } else {
      const result = ct + second;

      setVidCurrentTime(result);
    }
  };
  const backward = (second) => {
    const ct = currentTimeInSecond;

    if (ct < 0 || ct > durationInSecond) {
      return;
    } else {
      const result = ct - second;

      setVidCurrentTime(result);
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      if (isPlaying === false) {
        play();
      } else {
        pause();
      }
    }

    if (e.keyCode === 39) {
      forward(10);
    }

    if (e.keyCode === 37) {
      backward(10);
    }
  };

  useEffect(() => {
    loading();
  });

  return (
    <div
      className="w-fit h-fit relative"
      id="video-player"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full h-full flex justify-center items-center">
        <video
          id="video-source"
          onLoadedData={videoOnLoad}
          onDurationChange={handleDurationChange}
          style={{ width: "100%", height: "auto" }}
        >
          <source
            src="https://rr1---sn-hq2gph5-jb3s.googlevideo.com/videoplayback?expire=1679171663&ei=z68VZJ6nGJDEgwOZhrHQAw&ip=185.224.82.193&id=ce84c416521459f7&itag=18&source=blogger&susc=bl&eaua=NJlFCGKk4aI&mime=video/mp4&vprv=1&dur=1350.913&lmt=1584541622306477&sparams=expire,ei,ip,id,itag,source,susc,eaua,mime,vprv,dur,lmt&sig=AOq0QJ8wRQIgaZ-rcb8-qEVyGRtygoRkRjGuFYnEXULaSIQ1-w8dvc8CIQDrg1XGYQmqL7HLONRwQwh_lmLMlpj_heXERqiZVTivGQ%3D%3D&redirect_counter=1&rm=sn-4g5ekl7l&req_id=3e93d45391e436e2&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=vb&mip=103.131.18.13&mm=31&mn=sn-hq2gph5-jb3s&ms=au&mt=1679141694&mv=u&mvi=1&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAOrjX2wpl2S0N7Y9Kh-JwL5BxeWQ7Vig4ZQl6ZBJ1D8oAiEA24TX7DOcWrVR63YJsc02RNxirzHGMYaHsj81E83mO0c%3D   b"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="w-full h-full absolute top-0 left-0">
        <div className="w-full h-full relative">
          {isLoading === true ? (
            <div className="w-[70px] h-[70px] absolute left-[50%] top-[40%] translate-x-[50%] translate-y-[-50%] text-6xl text-white loading flex justify-center items-center">
              <i className="fa-duotone fa-spinner-third"></i>
            </div>
          ) : (
            ""
          )}
          <div className="w-full h-fit absolute bottom-0">
            <div className="w-full h-auto p-2 mt-auto px-4">
              <div className="grid grid-cols-10 items-center text-white">
                <div className="p-2 text-sm">{currentTime}</div>
                <div
                  className="col-span-8 w-full h-[4px] bg-[rgba(255,255,255,0.25)] relative"
                  onClick={getVideoPosition}
                  id="timeline"
                >
                  <div
                    className="h-[4px] bg-red-500 rounded-full z-20 absolute top-0"
                    style={{
                      width:
                        (currentTimeInSecond / durationInSecond) * 100 + "%",
                    }}
                  ></div>
                  <div className="z-10 absolute top-0" id="timerange-list">
                    <div className="flex relative">
                      {timerangeList.map((t) => (
                        <div
                          className=" h-[4px] bg-[rgba(255,255,255,0.5)] absolute rounded-full"
                          key={Math.random() * 100}
                          style={{
                            width: t.long + "px",
                            transform: `translateX(${t.startX}px)`,
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-2 text-sm">{duration}</div>
              </div>
            </div>
            <div className="w-full h-auto p-2 text-white">
              <div className="flex w-fit h-fit mx-auto gap-1 items-center ">
                {isMute === false ? (
                  <div
                    className="w-9 h-9 flex justify-center items-center rounded-lg hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                    onClick={mute}
                  >
                    <i className="fa-solid fa-volume"></i>
                  </div>
                ) : (
                  <div
                    className="w-9 h-9 flex justify-center items-center rounded-lg hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                    onClick={unmute}
                  >
                    <i className="fa-solid fa-volume-xmark"></i>
                  </div>
                )}
                <div
                  className="w-9 h-9 flex justify-center items-center rounded-lg hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                  onClick={backward.bind(this, 10)}
                >
                  <i className="fa-solid fa-backward"></i>
                </div>
                {isPlaying === false ? (
                  <div
                    className="w-12 h-12 flex justify-center items-center rounded-full hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                    onClick={play}
                  >
                    <i className="fa-solid fa-play"></i>
                  </div>
                ) : (
                  <div
                    className="w-12 h-12 flex justify-center items-center rounded-full hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                    onClick={pause}
                  >
                    <i className="fa-solid fa-pause"></i>
                  </div>
                )}
                <div
                  className="w-9 h-9 flex justify-center items-center rounded-lg hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                  onClick={forward.bind(this, 10)}
                >
                  <i className="fa-solid fa-forward"></i>
                </div>
                <div className="w-9 h-9 flex justify-center items-center rounded-lg hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out">
                  <i className="fa-solid fa-cog"></i>
                </div>
                {isFullscreen === false ? (
                  <div
                    className="w-9 h-9 flex justify-center items-center rounded-lg hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                    onClick={openFullscreen}
                  >
                    <i className="fa-solid fa-expand"></i>
                  </div>
                ) : (
                  <div
                    className="w-9 h-9 flex justify-center items-center rounded-lg hover:bg-[rgba(255,255,255,0.25)] cursor-pointer transition-all duration-150 ease-in-out"
                    onClick={closeFullscreen}
                  >
                    <i className="fa-solid fa-compress"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

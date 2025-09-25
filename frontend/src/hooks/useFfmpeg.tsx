import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export const useFfmpeg = () => {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const messageRef = useRef<HTMLParagraphElement | null>(null);

  const loadFfmpeg = async () => {
    console.log("loadFFmpeg");
    const baseURL =
      "https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.10/dist/esm";
    const ffmpeg = ffmpegRef.current;

    // ffmpeg.on("log", ({ message }) => {
    //   if (messageRef.current) messageRef.current.innerHTML = message;
    // });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
      workerURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.worker.js`,
        "text/javascript",
      ),
    });

    setLoaded(true);
  };

  return { loaded, loadFfmpeg, ffmpegRef, videoRef, messageRef };
};

import { memo, useEffect } from "react";
import { useFfmpeg } from "../../../hooks/useFfmpeg.tsx";
import "./ProjectEditorPageV2.css";
import Sidebar from "../../../components/simple-sidebar/Sidebar.tsx";

const ProjectEditorPageV2 = () => {
  const { loaded, loadFfmpeg } = useFfmpeg();

  useEffect(() => {
    if (!loaded) {
      loadFfmpeg().then();
    }
  }, [loaded, loadFfmpeg]);

  // const transcode = async () => {
  //   const videoURL =
  //     "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/video-15s.avi";
  //   const ffmpeg = ffmpegRef.current;
  //   await ffmpeg.writeFile("input.avi", await fetchFile(videoURL));
  //   await ffmpeg.exec(["-i", "input.avi", "output.mp4"]);
  //   const fileData = await ffmpeg.readFile("output.mp4");
  //   const data = new Uint8Array(fileData as ArrayBuffer);
  //   if (videoRef.current) {
  //     videoRef.current.src = URL.createObjectURL(
  //       new Blob([data.buffer], { type: "video/mp4" }),
  //     );
  //   }
  // };

  return (
    <div className="content">
      <Sidebar></Sidebar>
    </div>
  );

  // return loaded ? (
  //   <>
  //     <div className="editor-content-wrapper">
  //       <video ref={videoRef} controls></video>
  //     </div>
  //     <br />
  //     <button onClick={transcode}>Transcode avi to mp4</button>
  //     <p ref={messageRef}></p>
  //   </>
  // ) : (
  //   <p>Loading ffmpeg...</p>
  // );
};

export default memo(ProjectEditorPageV2);

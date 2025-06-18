// todo
export default function VideoGrid({ files }: { files: string[] }) {
  return (
    <div id="videoPreviews" className="video-grid">
      {files.map((file, index) => (
        <video key={index} controls src={file} />
      ))}
    </div>
  );
}

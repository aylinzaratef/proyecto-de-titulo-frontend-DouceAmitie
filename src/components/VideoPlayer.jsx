import { Component } from "react";
import ReactPlayer from "react-player";

export const Video = (url) => {
  console.log(url.url);
  return (
    <div className="contenedor">
      <div className="row">
        <div className="col-12">
          <ReactPlayer
            url={url.url}
            controls
            width="95%"
            height="50vh"
            className="react-player-position"
          />
        </div>
      </div>
    </div>
  );
};

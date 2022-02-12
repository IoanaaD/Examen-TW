import React, { Fragment, useState, useEffect } from "react";
import http from "../../services/http";
import { useParams } from "react-router-dom";

function VideoById() {
  const [currentVideo, setCurrentVideo] = useState();
  const { id } = useParams();
  useEffect(() => {
    http.get(`/video/${id}`).then((res) => {
      setCurrentVideo(res.data);
    });
  }, []);
  return (
    <Fragment>
      {currentVideo && (
        <>
          <div className="card-custom">
            <h4>
              The video with the title :{" "}
              <span style={{ color: "purple" }}>{currentVideo.title}</span>
            </h4>
            <p>And with the description : {currentVideo.description}</p>
            <p>
              Belongs to the favouriteList with the id :{" "}
              <span style={{ color: "purple" }}>
                {currentVideo.favouriteListId}
              </span>
            </p>
          </div>
        </>
      )}
    </Fragment>
  );
}

export default VideoById;

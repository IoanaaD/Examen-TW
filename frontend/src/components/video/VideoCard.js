import React, { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import { EditVideoForm } from "./EditVideoForm";
import http from "../../services/http";
import { Link } from "react-router-dom";

function VideoCard({ video, onVideoDelete, error }) {
  const [currentVideo, setCurrentVideo] = useState(video);
  const [isEditMode, setIsEditMode] = useState(false);

  const onVideoEdit = (video) => {
    http.patch(`/video/${currentVideo.id}`, video).then((res) => {
      setCurrentVideo({
        ...currentVideo,
        description: res.data.description,
        title: res.data.title,
        url: res.data.url,
        favouriteListId: res.data.favouriteListId,
      });
      setIsEditMode(false);
      console.log(res.data);
    });
  };

  return (
    <Fragment>
      {isEditMode ? (
        <EditVideoForm video={video} onVideoEdit={onVideoEdit} />
      ) : (
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
          <Button onClick={() => setIsEditMode(true)}>Edit</Button>{" "}
          <Button
            variant="danger"
            onClick={() => onVideoDelete(currentVideo.id)}
          >
            Delete
          </Button>
          <Link
            style={{
              display: "inline-block",
              marginLeft: "8px",
              textDecoration: "none",
              color: "green",
              fontWeight: "bold",
            }}
            to={`/videos/${currentVideo.id}`}
          >
            See more
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default VideoCard;

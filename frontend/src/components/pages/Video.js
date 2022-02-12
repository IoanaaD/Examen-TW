/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../video/VideoCard";
import http from "../../services/http";
import { VideoForm } from "../video/VideoForm";

const Video = () => {
  const [videos, setVideos] = useState([]);
  let getVideos = async () => {
    axios.get("/video").then((res) => setVideos(res.data));
  };
  const [error, setError] = useState();

  useEffect(() => {
    getVideos();
  }, []);

  const onVideoDelete = (id) => {
    http.delete(`/video/${id}`).then((res) => {
      const newArray = videos.filter((video) => video.id !== id);
      setVideos([...newArray]);
    });
  };

  const onVideoAdd = (video) => {
    http
      .post("/video", video)
      .then((res) => {
        setError();
        setVideos([...videos, res.data]);
      })
      .catch((e) => setError(e.response.data.message));
  };
  return (
    <>
      <div>
        <VideoForm onVideoAdd={onVideoAdd} error={error} />{" "}
        {videos.length > 0 &&
          videos.map((video) => (
            <VideoCard
              key={video.id}
              onVideoDelete={onVideoDelete}
              video={video}
            />
          ))}
      </div>
    </>
  );
};

export default Video;

import React, { useEffect, useState } from "react";
import { isUserAuthenticated } from "../../Helper";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import VideoPlayer from "./components/Videoplayer";
import { Redirect } from "react-router-dom";
import axios from "axios";

function VideoList() {
  const [isLoading, setLoading] = useState(true);
  const [videolist, setVideolist] = useState([]);
  const [currentVideoEmbedId, setCurrentVideoEmdedId] = useState("");
  const apiUrl = "http://localhost:5000/api/patient/videos";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((res) => {
        console.log(res);
        setVideolist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // setVideolist(tempVideoList);
        console.log(err);
        setLoading(false);
      });
  }, []);

  const playVideo = (url) => {
    console.log("playVideo");
    console.log(url);
    setCurrentVideoEmdedId(url);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  return (
    <>
      {currentVideoEmbedId != "" && (
        <VideoPlayer linkId={currentVideoEmbedId} />
      )}
      <ListGroup>
        {videolist.map((item, idx) => (
          <ListGroup.Item
            key={idx}
            action
            onClick={() => {
              playVideo(item.url);
            }}
          >
            {item.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default VideoList;

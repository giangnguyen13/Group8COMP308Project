import React, { useEffect } from "react";
import PropTypes from "prop-types";

const YoutubeEmbed = ({ linkId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      // src={`${link}`}
      src={`https://www.youtube.com/embed/${linkId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

export default YoutubeEmbed;

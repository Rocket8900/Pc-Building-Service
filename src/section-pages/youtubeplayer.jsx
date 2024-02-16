import React, { useRef } from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }) => {
  const playerRef = useRef(null);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      playlist: videoId,
      controls: 0,
      loop: 1,
      mute: 1,
    },
  };

  const onVideoEnd = (event) => {
    // Access the player instance
    const player = playerRef.current.internalPlayer;
    // Check if the player exists and restart the video when it ends
    if (player) {
      player.seekTo(0); // Restart the video
      player.playVideo(); // Start playing the video again
    }
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onEnd={onVideoEnd} ref={playerRef} />
    </div>
  );
};

export default YouTubePlayer;

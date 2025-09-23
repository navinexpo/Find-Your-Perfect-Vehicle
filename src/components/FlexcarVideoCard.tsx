import React, { useRef, useState } from "react";
import { THEME_COLOR } from "@/constants";

export const FlexcarVideoCard: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="vehicle-card flexcar-video-card">
      <div className="vehicle-image-container video-container">
        <video
          ref={videoRef}
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
          className="vehicle-image video-player"
          tabIndex={-1}
        />
        <button
          className="video-overlay-btn"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={handlePlayPause}
        >
          {isPlaying ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="8" y="8" width="5" height="16" rx="2" fill="#fff" />
              <rect x="19" y="8" width="5" height="16" rx="2" fill="#fff" />
            </svg>
          ) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M10 8V24L24 16L10 8Z" fill="#fff" />
            </svg>
          )}
        </button>
      </div>
      <div className="vehicle-details">
        <h3 className="vehicle-title">Big Buck Bunny (Sample Video)</h3>
        <div className="vehicle-trim" style={{ marginBottom: 8 }}>
          Free sample video for testing play and pause functionality.
        </div>
      </div>
      <style>{`
				.flexcar-video-card .video-container {
					position: relative;
				}
				.flexcar-video-card .video-player {
					width: 100%;
					height: 200px;
					object-fit: cover;
					border-radius: 0.75rem 0.75rem 0 0;
					background: #000;
				}
				.flexcar-video-card .video-overlay-btn {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					background: rgba(16,19,87,0.7);
					border: none;
					border-radius: 50%;
					width: 56px;
					height: 56px;
					display: flex;
					align-items: center;
					justify-content: center;
					cursor: pointer;
					z-index: 2;
					transition: background 0.2s;
				}
				.flexcar-video-card .video-overlay-btn:hover {
					background: ${THEME_COLOR}cc;
				}
				.flexcar-video-card .vehicle-details {
					padding: 1.5rem;
				}
				.flexcar-video-card .vehicle-title {
					margin: 0 0 0.5rem 0;
					font-size: 1.25rem;
					font-weight: 700;
					color: #fff;
				}
				.flexcar-video-card .vehicle-trim {
					color: #e0e0e0;
					font-size: 1rem;
				}
        .flexcar-video-card {
          background: #ababc7ff;
          color: #fff;
        }
			`}</style>
    </div>
  );
};

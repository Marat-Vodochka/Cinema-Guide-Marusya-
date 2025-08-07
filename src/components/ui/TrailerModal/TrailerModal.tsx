import React, { useState, useRef } from "react";
import s from "./TrailerModal.module.scss";
import IconClose from "../../../assets/icons/icon-close.svg?react";

type TrailerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl?: string;
  movieTitle?: string;
};

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, trailerUrl, movieTitle }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  if (!isOpen) return null;

  // Получаем id видео из ссылки, если это YouTube
  let embedUrl = "";
  if (trailerUrl) {
    if (trailerUrl.includes("youtube.com") || trailerUrl.includes("youtu.be")) {
      const match = trailerUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
      const videoId = match ? match[1] : "";
      embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&enablejsapi=1&rel=0&modestbranding=1` : trailerUrl;
    } else {
      embedUrl = trailerUrl;
    }
  }

  const togglePlayPause = () => {
    if (iframeRef.current) {
      if (isPlaying) {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setShowControls(true);
      } else {
        iframeRef.current.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        setShowControls(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent}>
        <button className={s.closeBtn} onClick={onClose}>
          <IconClose className={s.removeIcon} />
        </button>
        
        {embedUrl ? (
          <div className={s.videoContainer}>
            <iframe
              ref={iframeRef}
              width="100%"
              height="400"
              src={embedUrl}
              title="Трейлер"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            
            <div className={s.videoOverlay} onClick={togglePlayPause}>
            </div>
            
            {showControls && movieTitle && (
              <div className={s.videoTitle}>
                {movieTitle}
              </div>
            )}
          </div>
        ) : (
          <div className={s.noTrailer}>Трейлер недоступен</div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
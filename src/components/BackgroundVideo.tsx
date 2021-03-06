import React, { useState, useEffect, useRef, useCallback } from 'react'

interface VideoMetaData {
  videoWidth: number;
  videoHeight: number;
}
interface BackgroundVideoProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean
  scale?: number;
  className?: string
  scaleToViewHeight?: boolean;
  onLoadedData?: () => void;
}
const BackgroundVideo = React.forwardRef<
  HTMLVideoElement,
  BackgroundVideoProps
>(({ src, autoPlay, loop, scale, className, scaleToViewHeight, onLoadedData }, ref) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [metadata, setMetadata] = useState<VideoMetaData>({
    videoWidth: 0,
    videoHeight: 0
  });
  const [videoTranslateX, setVideoTranslateX] = useState(0);
  const [videoTranslateY, setVideoTranslateY] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const resizeVideo = useCallback(() => {
    const containerHeight = videoContainerRef!.current!.offsetHeight;
    const containerWidth = videoContainerRef!.current!.offsetWidth;
    setViewHeight(containerHeight);

    const videoHeight = metadata.videoHeight;
    const videoWidth = metadata.videoWidth;

    const dx = videoWidth / 2 - containerWidth / 2;
    const dy = videoHeight / 2 - containerHeight / 2;

    if (dx > 0) {
      setVideoTranslateX(dx);
    }
    if (dy > 0) {
      setVideoTranslateY(dy);
    }
  }, [metadata.videoHeight, metadata.videoWidth])

  useEffect(() => {
    resizeVideo()
    window.addEventListener('resize', resizeVideo)
    return window.removeEventListener('resize', resizeVideo)
  }, [metadata, resizeVideo]);

  return (
    <div
      ref={videoContainerRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <video
        className={className}
        style={{
          transform: `translate(-${videoTranslateX}px, -${videoTranslateY}px) scale(${
            scale ? scale : 1
          })`,
          height: `${scaleToViewHeight ? viewHeight + "px" : "auto"}`
        }}
        ref={ref}
        tabIndex={0}
        preload="auto"
        muted
        playsInline
        autoPlay={autoPlay}
        loop={loop}
        onLoadedData={(e) => {
          setMetadata({
            videoHeight: e.currentTarget.offsetHeight,
            videoWidth: e.currentTarget.offsetWidth
          });
          if (onLoadedData) onLoadedData();
        }}
      >
        <source type="video/mp4" src={src} />
      </video>
    </div>
  );
});

export default BackgroundVideo;

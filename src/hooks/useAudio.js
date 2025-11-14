import { useState, useRef, useEffect } from 'react';

export const useAudio = (url, { autoPlay = false, loop = false, volume = 0.7 } = {}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audioRef.current = new Audio(url);
    audioRef.current.loop = loop;
    audioRef.current.volume = volume;
    
    audioRef.current.addEventListener('loadedmetadata', () => {
      setDuration(audioRef.current.duration);
    });
    
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current.currentTime);
    });

    if (autoPlay) play();
    
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [url]);

  const play = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = () => isPlaying ? pause() : play();

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return { isPlaying, play, pause, toggle, duration, currentTime, seek };
};

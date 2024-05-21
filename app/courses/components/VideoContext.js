'use client'
import React, { createContext, useState, useContext } from 'react';

const VideoContext = createContext();

export const useVideo = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [viewPreview, setViewPreview] = useState(false);

  const togglePreview = () => {
    setViewPreview(prev => !prev);
  };

  return (
    <VideoContext.Provider value={{ viewPreview, togglePreview,setViewPreview }}>
      {children}
    </VideoContext.Provider>
  );
};
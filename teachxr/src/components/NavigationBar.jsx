import React, { useState } from "react";
import CenterButton from "./CenterButton";
import Mute from "./Mute";
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavigationBar = ({
  startCallInline,
  handleMuteToggle,
  isMuted,
  connected,
  endCall,
}) => {
  const navigate = useNavigate()
  return (
    <nav className="flex justify-center w-full">
      <div className="bg-gray-900 rounded-full py-4 px-3 flex justify-around items-center w-full">
        <NavItem icon="home" label="Home" onClick={() => navigate('/')}/>
        <Mute
          handleMuteToggle={handleMuteToggle}
          isMuted={isMuted}
        />
        <CenterButton
          startCallInline={startCallInline}
          endCall={endCall}
          label="Call TeachXR"
          isMuted={isMuted}
          connected={connected}
        />
        <NavItem icon="clock" label="History" />
        <NavItem icon="user" label="Profile" />
      </div>
    </nav>
  );
};

export default NavigationBar;

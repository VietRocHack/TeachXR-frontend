import React from "react";
import NavItem from "./NavItem";

const Mute = ({ handleMuteToggle,isMuted}) => {
  return (
    <NavItem
      icon={isMuted ? "mute" : "mic"}
      label={isMuted ? "Unmute" : "Mute"} // Button label
      onClick={() => handleMuteToggle()}
    />
  );
};

export default Mute;

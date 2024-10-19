import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
const CenterButton = ({ startCallInline, connected, endCall }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartCall = () => {
    setIsLoading(true);
    startCallInline();
  };

  // Once connected state updates to true, stop the loading indicator
  if (connected && isLoading) {
    setIsLoading(false);
  }

  return (
    <>
      {!connected ? (
        <button
          onClick={handleStartCall}
          className="bg-blue-500 text-white p-4 rounded-full mx-2"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 17H11V13H7V11H11V7H13V11H17V13H13V17ZM12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      ) : (
        <button onClick={endCall}>
          Turn Off
        </button>
      )}
    </>
  );
};

export default CenterButton;

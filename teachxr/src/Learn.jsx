import React from "react"
import robot1 from './assets/robot1.png'
import robot2 from './assets/robot2.png'
import image from './assets/image.png'
import settings from './assets/settings.png'

import { useState } from "react"
import NavigationBar from "./NavigationBar"
import ChatBot from "./ChatBot"

const Learn = () => {
    const [isVoiceMode, setIsVoiceMode] = useState(false);

    const toggleVoiceMode = () => {
        setIsVoiceMode(!isVoiceMode);
    };

    return (
        <div className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen flex">
            {/* Left section: Learn component (2/3 of the screen) */}
            <div className="w-2/3 flex items-center justify-center mt-8 mb-8">
                <div className="flex flex-col items-center justify-center w-full h-full m-8 space-y-12">
                
                    <div className="flex relative items-center justify-center w-full max-w-3xl h-[600px] rounded-lg overflow-hidden mt-8 mb-8">
                        {isVoiceMode ? (
                            <img
                                src={robot1}
                                alt="AI Assistant Avatar"
                                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105"
                            />
                        ) : (
                            <>
                                <img
                                    src={robot1}
                                    alt="Friendly robot assistant"
                                    className="absolute left-12 w-24 transform rotate-12 transition-transform hover:scale-110 animate-bounce"
                                />
                                <img
                                    src={image}
                                    alt="AI learning concept"
                                    className="w-40 transition-transform hover:scale-105"
                                />
                                <img
                                    src={robot2}
                                    alt="Another friendly robot assistant"
                                    className="absolute top-0 right-12 w-24 transform transition-transform hover:scale-110 animate-spin"
                                />
                            </>
                        )}
                    </div>

                    {/* Control buttons */}
                    <NavigationBar toggleVoiceMode={toggleVoiceMode}/>
                </div>

            </div>

            {/* Right section: Placeholder for ChatBot (1/3 of the screen) */}
            <div className="w-1/3 flex items-center justify-center bg-black">
                {/* <div className="bg-purple-700 text-white py-4 px-6 rounded-lg">
                </div> */}
                    <ChatBot />
            </div>
        </div>
    );
};

export default Learn;

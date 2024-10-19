import React from "react"
import robot1 from './assets/robot1.png'
import robot2 from './assets/robot2.png'

import { useState } from "react"
import NavigationBar from "./NavigationBar"
import ChatBot from "./ChatBot"

const Learn = () => {
    const [isVoiceMode, setIsVoiceMode] = useState(false);

    const toggleVoiceMode = () => {
        setIsVoiceMode(!isVoiceMode);
    };

    return (
        <div className="bg-gradient-to-b from-darkPurple to-deepIndigo min-h-screen flex">
            {/* Left section: Learn component (2/3 of the screen) */}
            <div className="w-2/3 flex items-center justify-center mt-8 mb-8">
                <div className="flex flex-col items-center justify-center w-full h-full m-8 space-y-12">
                
                    <div className="flex flex-col relative items-center justify-center w-full max-w-3xl h-[600px] rounded-lg overflow-hidden mt-8 mb-8">
                        {isVoiceMode ? (
                            <img
                                src={robot1}
                                alt="AI Assistant Avatar"
                                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-lg transition-transform hover:scale-105"
                            />
                        ) : (
                            // <>
                            //     <img
                            //         src={robot1}
                            //         alt="Friendly robot assistant"
                            //         className="absolute left-12 w-24 transform rotate-12 transition-transform hover:scale-110 animate-bounce"
                            //     />
                            //     <img
                            //         src={image}
                            //         alt="AI learning concept"
                            //         className="w-40 transition-transform hover:scale-105"
                            //     />
                            //     <img
                            //         src={robot2}
                            //         alt="Another friendly robot assistant"
                            //         className="absolute top-0 right-12 w-24 transform transition-transform hover:scale-110 animate-spin"
                            //     />
                            // </>
                            <>
                                {/* <img
                                    src={robot1}
                                    alt="Friendly robot assistant"
                                    className="absolute left-12 w-24 transform rotate-12 transition-transform hover:scale-110 animate-bounce"
                                /> */}
                                <div className="relative">
                                    {/* Outermost Gradient Circle with Shadow */}
                                    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full h-64 w-64 animate-pulse shadow-[0_0_50px_15px_rgba(139,92,246,0.3)]"></div>

                                    {/* Additional Outer Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full h-60 w-60 animate-pulse"></div>
                                    </div>

                                    {/* Original Outer Gradient Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full h-56 w-56 animate-pulse"></div>
                                    </div>

                                    {/* Additional Middle Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full h-52 w-52"></div>
                                    </div>

                                    {/* Original Middle Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full h-48 w-48"></div>
                                    </div>

                                    {/* Additional Inner Circle */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-full h-44 w-44 flex items-center justify-center shadow-lg"></div>
                                    </div>

                                    {/* Original Inner Circle with Text */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-gradient-radial from-teal-400 via-emerald-500 to-cyan-600 rounded-full h-40 w-40 flex items-center justify-center shadow-lg">
                                            <span className="text-white text-xl font-semibold"></span>
                                        </div>
                                    </div>
                                </div>
                                {/* Informative Message */}
                                <p className="text-blue-200 text-center mt-8 text-lg opacity-75">
                                    Touch to empower your learning
                                </p>
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

import React from "react"
import robot1 from './assets/robot1.png'
import robot2 from './assets/robot2.png'
import image from './assets/image.png'
import settings from './assets/settings.png'

const Learn = () => {
    return (
        <div className="bg-gradient-to-b from-purple-900 to-indigo-900 min-h-screen flex">
            {/* Left section: Learn component (2/3 of the screen) */}
            <div className="w-2/3 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full h-full m-8 space-y-12">
                    {/* Upper section with robots and image */}
                    <div className="relative flex items-center justify-center w-full max-w-3xl h-80 rounded-lg shadow-lg overflow-hidden">
                        <img
                            src={robot1}
                            alt="Friendly robot assistant"
                            className="absolute left-12 w-24 transform rotate-12 transition-transform hover:scale-110 animate-bounce"
                        />

                        {/* Main image in the center */}
                        <img
                            src={image}
                            alt="AI learning concept"
                            className="w-40 transition-transform hover:scale-105"
                        />

                        {/* Robot 2 - right with animation */}
                        <img
                            src={robot2}
                            alt="Another friendly robot assistant"
                            className="absolute top-0 right-12 w-24 transform rotate-[-12deg] transition-transform hover:scale-110 animate-spin"
                        />
                    </div>

                    {/* Control buttons */}
                    <div className="flex space-x-10 flex-row justify-center">
                        <button className="border border-white text-white py-4 px-8 rounded-lg text-lg transform transition-all duration-300 bg-transparent flex items-center space-x-4">
                            <img src={settings} alt="Settings Icon" className="w-6 h-6" />
                            <span>Voice</span>
                        </button>
                        <button className="border border-white text-white py-4 px-8 rounded-lg text-lg transform transition-all duration-300 bg-transparent flex items-center space-x-4">
                            <img src={settings} alt="Settings Icon" className="w-6 h-6" />
                            <span>Home</span>
                        </button>
                        <button className="border border-white text-white py-4 px-8 rounded-lg text-lg transform transition-all duration-300 bg-transparent flex items-center space-x-4">
                            <img src={settings} alt="Settings Icon" className="w-6 h-6" />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Right section: Placeholder for ChatBot (1/3 of the screen) */}
            <div className="w-1/3 flex items-center justify-center bg-black">
                <div className="bg-purple-700 text-white py-4 px-6 rounded-lg">
                <p>ChatBot will be here</p>
                </div>
            </div>
        </div>
    );
};

export default Learn;

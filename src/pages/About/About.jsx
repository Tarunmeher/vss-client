import React from "react";

const About = () => {
    return (
        <div className="relative h-screen flex items-center px-8 md:px-24 bg-transparent">
            {/* Left Content */}
            <div className="text-white max-w-xl z-10">
                <span className="bg-[#0077b6] text-white font-semibold text-sm px-4 py-1 inline-block mb-4 tracking-wide">
                    ABOUT CAMPUS
                </span>
                <h1 className="text-4xl text-black md:text-5xl font-bold leading-tight mb-4">
                    Welcome To <span className="text-[#ffb703]">Vrindavan</span> Smart School
                </h1>
                <p className="text-lg text-gray-700 border-l-4 border-red-600 pl-4">
                    Our mission is to prepare education leaders and innovators who will change the world by expanding opportunities and outcomes for learners everywhere.
                </p>
            </div>

            {/* Right Image */}
            <div className="flex-1 hidden md:block">
                <img
                    src="https://cdn.pixabay.com/photo/2025/04/14/18/05/mountain-9533968_1280.jpg"
                    alt="Campus"
                    className="w-full h-auto object-contain rounded-md"
                />
            </div>
        </div>
    );
};

export default About;

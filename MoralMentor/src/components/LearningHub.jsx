import React from "react";
import { useNavigate } from "react-router-dom";

const LearningHub = () => {
    const navigate = useNavigate();
    return(
        <div className="bg-[#F3E8FF] h-screen">
            <h2 className="font-semibold text-center pt-10">Learning Hub - Explore Ethical Concepts</h2>
            <h2 className="font-semibold text-center">Quick, engaging lessons to enhance your moral reasoning</h2>
            <h1 className="font-bold text-center pt-13">Choose a theme to explore!</h1>

            <div className="flex justify-evenly pt-10">
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🤝</span><span>Loyalty</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🗣️</span><span>Honesty</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">😈</span><span>Cheating</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🧑‍🦱</span><span>Personal Values</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🍷</span><span>Alcoholism</span>
                </div>
            </div>

            <div className="flex justify-evenly pt-10">
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">❌</span><span>Misconduct</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">⚖️</span><span>Fairness</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">📋</span><span>Responsibility</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🫂</span><span>Friendship</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🚫</span><span>Bullying</span>
                </div>  
            </div>

            <div className="flex justify-evenly pt-10">
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12  bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">👔</span><span>Societal Expectations</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🗨</span><span>Integrity dilemma</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🟰</span><span>Equality</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">📜</span><span>Plagiarism</span>
                </div>
                <div className="cursor-pointer flex items-center justify-center pr-5 pl-2 py-2 text-1xl font-bold text-black w-40 h-12 bg-[#DCCEF8]" onClick={() => navigate("/quiz")}>
                    <span className="mr-2">🙅</span><span>Good touch bad touch</span>
                </div>
            </div>


        </div>
            
    );
};

export default LearningHub;


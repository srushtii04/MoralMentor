import React from "react";
import { useNavigate } from "react-router-dom";
import animated from "../assets/animated.png";
import quiz from "../assets/quiz.png";
import debate from "../assets/debate.png";
import resources from "../assets/resources.png";

const About = () => {
    const navigate = useNavigate();
    return(
        <div className="bg-[#F3E8FF] h-screen">
            <h1 className="text-3xl font-bold pl-9 pt-9">About Us</h1>
            <p className="text-1xl pl-9 pt-5 black">At MoralMentor, we make ethical learning engaging and interactive. Explore real-world dilemmas through scenario-based quizzes, storytelling, and live debates.<br/> Track progress, discuss choices, and enhance moral reasoning in a fun, immersive way.<br/> Every decision shapes your journey! 🚀</p>
            <div className="flex space-x-4 p-9 justify-between">
                <div className="cursor-pointer w-60 h-75 bg-[#E5D4FF]" onClick={() => navigate("/flipcards")}>
                    <h3 className="text-2xl pt-2 pl-4">Animated Flip Cards</h3>
                    <img
                        src={animated}
                        alt="image"
                        className="p-4"
                    />
                </div>
                <div className="cursor-pointer w-60 h-75 bg-[#E5D4FF]" onClick={() => navigate("/hub")}>
                <h3 className="text-2xl pt-2 pl-4">Scenario-Based Quizzes</h3>
                    <img
                        src={quiz}
                        alt="image"
                        className="p-4"
                    />
                </div>
                <div className="cursor-pointer w-60 h-75 bg-[#E5D4FF]" onClick={() => navigate("/debates")}>
                <h3 className="text-2xl pt-2 pl-4">Live Ethical Debates</h3>
                    <img
                        src={debate}
                        alt="image"
                        className="p-4 h-60"
                    />
                </div>
                <div className="cursor-pointer w-60 h-75 bg-[#E5D4FF]" onClick={() => navigate("/resources")}>
                <h3 className="text-2xl pt-2 pl-4">Resource Library</h3>
                    <img
                        src={resources}
                        alt="image"
                        className="p-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;

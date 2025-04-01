import React from "react";

const LearningHub = () => {
    return(
        <div className="bg-[#F3E8FF] h-screen">
            <h2 className="font-semibold text-center pt-10">Learning Hub - Explore Ethical Concepts</h2>
            <h2 className="font-semibold text-center">Quick, engaging lessons to enhance your moral reasoning</h2>
            <h1 className="font-bold text-center pt-13">Choose a theme to explore!</h1>
            <div className="flex justify-center pt-4">
                <div className="flex">
                    <input  
                        type="text" 
                        placeholder="Search for themes..." 
                        class="w-100 p-2 -center border border-gray-400 rounded-l-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600">
                        Search
                    </button>
                </div>
            </div>

            <div className="flex justify-evenly pt-10">
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
            </div>

            <div className="flex justify-evenly pt-10">
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
            </div>

            <div className="flex justify-evenly pt-10">
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
                <div className="w-40 h-10 bg-[#DCCEF8]">Sample1</div>
            </div>


        </div>
            
    );
};

export default LearningHub;


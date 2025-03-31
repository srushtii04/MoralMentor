import React from "react";

const FlipCards = () =>{
    return(
        <div className="bg-[#F3E8FF] h-screen">
            <h1 className="font-bold text-center text-3xl py-8">Flip the Card, Face the Choice</h1>
            <div className="flex justify-evenly">
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Should people be held accountable for unintended harm they cause?</p>
                    <div className="flex justify-evenly">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Is it unethical to buy products from companies that exploit workers?</p>
                    <div className="flex justify-evenly">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Is it ethical to use AI-generated content without crediting the original creator?</p>
                    <div className="flex justify-evenly">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Is it ethical to punish students for speaking against school policies?</p>
                    <div className="flex justify-evenly mt-6">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                
            </div>

            <div className="flex justify-evenly pt-10">
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Is stealing always morally wrong, even in extreme survival situations?</p>
                    <div className="flex justify-evenly">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Is it ethical for companies to prioritize profits over social responsibility?</p>
                    <div className="flex justify-evenly">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Should students be allowed to use AI tools like ChatGPT for academic work?</p>
                    <div className="flex justify-evenly">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                <div className="bg-[#E5D4FF] w-50 h-45">
                    <p className="font-medium p-3">Should students be required to report unethical behavior of their peers?</p>
                    <div className="flex justify-evenly">
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">Yes</button>
                        <button className="font-medium text-white w-12 h-8 bg-[#865CC7] rounded cursor-pointer">No</button>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default FlipCards;
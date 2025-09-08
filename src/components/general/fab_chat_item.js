import { css, StyleSheet } from "aphrodite";
import React from "react";

/*
    type: 'user' | 'bot'
*/
const FabChatItem = ({type, isForm = false, children}) => {

    return(
        <div className={`flex items-end gap-1 transition-all duration-[0.5s] will-change-auto animate-message-slide ${type === 'user' ? 'justify-end' : 'justify-start'} font-['Montserrat']`}>
            {
                type === 'bot' && 
                <div className="rounded-full bg-primary-color aspect-square w-6 overflow-hidden flex items-center justify-center">
                    <img className="w-full aspect-square" src="/favicon.ico" alt="chat image" />
                </div>
            }
            <div className={`rounded-lg bg-[#181818] max-w-[80%] p-1 transition-all duration-[0.5s] will-change-auto 
                min-h-6 flex flex-col justify-center ${type === 'user' ? 'rounded-br-none bg-[#dee7f4]' : 
                'rounded-bl-none bg-[#F3F3F3]'}`}>
                {
                    children ? children : 
                    <div className="flex gap-2 mx-2">
                        <div className={`w-2 aspect-square rounded-full ${type === 'user' ? 'bg-[#d6e2f4]' : 'bg-[#b3b0af]'} animate-bounce1`}></div>
                        <div className={`w-2 aspect-square rounded-full ${type === 'user' ? 'bg-[#d6e2f4]' : 'bg-[#b3b0af]'} animate-bounce2`}></div>
                        <div className={`w-2 aspect-square rounded-full ${type === 'user' ? 'bg-[#d6e2f4]' : 'bg-[#b3b0af]'} animate-bounce3`}></div>
                    </div>
                }
            </div>
            {
                type === 'user' && 
                <div className="rounded-full bg-[#dee7f4] text-black aspect-square w-[0.8rem] flex items-center justify-center">
                    <span className="material-symbols-outlined notranslate text-[0.5rem]! h-2! w-2! font-bold!">check</span>
                </div>
            }
        </div>
    );
}

export default FabChatItem;
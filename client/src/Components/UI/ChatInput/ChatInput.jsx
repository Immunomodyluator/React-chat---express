import React from 'react';
import classes from './ChatInput.module.css'
import SvgSend from "../../SVG/Send/SvgSend";
import SvgSmile from "../../SVG/Smile/SvgSmile";

const ChatInput = () => {
    return (
        <div className={classes.chatInput}>
            <SvgSmile></SvgSmile>
            <div className={classes.chatInput__area} id="chatInput__area" contentEditable="true" role="textbox"
                 aria-multiline="true" onKeyDown={onEnterPress}></div>
            <SvgSend></SvgSend>
        </div>
    );
};

function onEnterPress(event) {
    if(event.key === 'Enter'){
        event.preventDefault()
    }
}


export default ChatInput;
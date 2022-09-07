import React from 'react';
import classes from './ChatBox.module.css'

const ChatBox = (props) => {
    return (
        <div className={classes.chatBox}>
            {props.children}
        </div>
    );
};

export default ChatBox;
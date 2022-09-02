import React from 'react';
import classes from './ChatBody.module.css'

const ChatBody = (props) => {
    return (
        <div className={classes.chatBody}>
            {props.children}
        </div>
    );
};

export default ChatBody;
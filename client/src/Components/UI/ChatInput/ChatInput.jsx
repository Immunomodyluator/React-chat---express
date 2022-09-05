import React, { useContext, useRef } from 'react';
import classes from './ChatInput.module.css';
import SvgSend from '../../SVG/Send/SvgSend';
import SvgSmile from '../../SVG/Smile/SvgSmile';
import axios from 'axios';
import { Context } from '../../../index';

const ChatInput = () => {
  const { store } = useContext(Context);
  const messageInput = useRef();
  function onEnterPress(event) {
    if (event.key === 'Enter') {
      const message = messageInput.current?.textContent;
      const login = store.user?.login;
      store
        .sendMessage(login, message)
        .then((r) => {
          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
      event.preventDefault();
    }
  }

  return (
    <div className={classes.chatInput}>
      <SvgSmile></SvgSmile>
      <div
        ref={messageInput}
        className={classes.chatInput__area}
        id='chatInput__area'
        contentEditable='true'
        role='textbox'
        aria-multiline='true'
        onKeyDown={onEnterPress}
      ></div>
      <SvgSend></SvgSend>
    </div>
  );
};

export default ChatInput;

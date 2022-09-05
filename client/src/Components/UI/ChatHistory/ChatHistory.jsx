import React, { useContext, useEffect, useState } from 'react';
import classes from './ChatHistory.module.css';
import { Context } from '../../../index';

export default function ChatHistory({ socket }) {
  const { store } = useContext(Context);
  const { message, setMessage } = useState({});
  useEffect(() => {
    socket.on('addMessage', () => {
      store.getMessage().then((message) => {
        console.log('dsd');
        setMessage(message);
      });
      console.log('Тут');
    });
    return () => {
      socket.off('addMessage');
    };
  }, [socket]);

  return (
    <div className={classes.chatHistory}>
      <div>
        {message?.map((mes) => {
          return <div key={mes.id}>{mes}</div>;
        })}
      </div>
    </div>
  );
}

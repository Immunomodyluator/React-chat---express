import React, { useContext, useEffect, useState } from 'react';
import classes from './ChatHistory.module.css';
import { Context } from '../../../index';

export default function ChatHistory({ socket }) {
  const { store } = useContext(Context);
  const [message, setMessage] = useState({});
  useEffect(() => {
    store.getMessage().then((message) => {
      setMessage(message);
    });
  }, []);
  useEffect(() => {
    socket.on(
      'addMessage',
      () => {
        store.getMessage().then((message) => {
          setMessage(message);
        });
        return () => {
          socket.off('addMessage');
        };
      },
      [socket]
    );
  });

  return (
    <div className={classes.chatHistory}>
      <p>
        {message.data?.map((mes) => {
          return (
            <li
              key={mes.id}
            >{`${mes.login} : ${mes.date} : ${mes.message}`}</li>
          );
        })}
      </p>
    </div>
  );
}

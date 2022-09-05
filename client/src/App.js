import React, { useContext, useEffect, useState } from 'react';
import './styles/app.css';
import Layout from './Components/containers/Layout/Layout';
import SideBarBox from './Components/containers/SideBarBox/SideBarBox';
import SideBarHeader from './Components/UI/SideBarHeader/SideBarHeader';
import SideBarBody from './Components/UI/SideBarBody/SideBarBody';
import ChatHeader from './Components/UI/ChatHeader/ChatHeader';
import ChatBox from './Components/containers/ChatBox/ChatBox';
import ChatBody from './Components/containers/ChatBody/ChatBody';
import ChatInput from './Components/UI/ChatInput/ChatInput';
import ChatHistory from './Components/UI/ChatHistory/ChatHistory';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://46.32.70.189:3000');

function App() {
  let navigate = useNavigate();
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store
        .checkAuth()
        .then(() => {})
        .catch(() => navigate('/auth'));
    } else {
      navigate('/auth');
    }
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      store.setConnectedSocket(`Да`);
    });

    socket.on('disconnect', () => {
      store.setConnectedSocket(`Нет`);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className='App'>
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email} и подключен к сокету - ${store.isConnectedSocket}`
          : 'Авторизуйтесь'}
      </h1>
      <button
        onClick={() => {
          socket.disconnect();
        }}
      >
        Отключить сокет
      </button>
      <button
        onClick={() => {
          socket.connect();
        }}
      >
        Включить сокет
      </button>
      <Layout>
        <SideBarBox>
          <SideBarHeader></SideBarHeader>
          <SideBarBody></SideBarBody>
        </SideBarBox>
        <ChatBox>
          <ChatHeader></ChatHeader>
          <ChatBody>
            <ChatHistory socket={socket}></ChatHistory>
            <ChatInput socket={socket}></ChatInput>
          </ChatBody>
        </ChatBox>
      </Layout>
    </div>
  );
}

export default observer(App);

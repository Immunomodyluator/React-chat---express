import React, { useContext, useEffect } from 'react'
import './styles/app.css'
import Layout from './Components/containers/Layout/Layout'
import SideBarBox from './Components/containers/SideBarBox/SideBarBox'
import SideBarHeader from './Components/UI/SideBarHeader/SideBarHeader'
import SideBarBody from './Components/UI/SideBarBody/SideBarBody'
import ChatHeader from './Components/UI/ChatHeader/ChatHeader'
import ChatBox from './Components/containers/ChatBox/ChatBox'
import ChatBody from './Components/containers/ChatBody/ChatBody'
import ChatInput from './Components/UI/ChatInput/ChatInput'
import ChatHistory from './Components/UI/ChatHistory/ChatHistory'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'

function App() {
  let navigate = useNavigate()
  const { store } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store
        .checkAuth()
        .then(() => {})
        .catch(() => navigate('/auth'))
    } else {
      navigate('/auth')
    }
  }, [])

  return (
    <div className='App'>
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : 'Авторизуйтесь'}
      </h1>
      <Layout>
        <SideBarBox>
          <SideBarHeader></SideBarHeader>
          <SideBarBody></SideBarBody>
        </SideBarBox>
        <ChatBox>
          <ChatHeader></ChatHeader>
          <ChatBody>
            <ChatHistory></ChatHistory>
            <ChatInput></ChatInput>
          </ChatBody>
        </ChatBox>
      </Layout>
    </div>
  )
}

export default observer(App)

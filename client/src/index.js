import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import AuthR from './routes/AuthR'
import Store from './store/store'
import { createContext } from 'react'

const store = new Store()

export const Context = createContext({
  store
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Context.Provider value={{ store }}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='auth' element={<AuthR />} />
      </Routes>
    </BrowserRouter>
  </Context.Provider>
)

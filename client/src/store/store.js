import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'
import axios from 'axios'

export default class Store {
  user = {}
  isAuth = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool) {
    this.isAuth = bool
  }

  setUser(user) {
    this.user = user
  }

  async registration(email, password, login) {
    try {
      const response = await AuthService.registration(email, password, login)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password)
      localStorage.setItem('token', response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e.response?.data?.message)
    }
  }

  async logout() {
    const response = await AuthService.logout()
    localStorage.removeItem('token')
    this.setAuth(false)
    this.setUser({})
  }

  async checkAuth() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/refresh`,
      { withCredentials: true }
    )
    localStorage.setItem('token', response.data.accessToken)
    this.setAuth(true)
    this.setUser(response.data.user)
  }
}

import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios from 'axios';
import MessageService from '../services/MessageService';

export default class Store {
  user = {};
  isAuth = false;
  isConnectedSocket = '';

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setConnectedSocket(isConnected) {
    this.isConnectedSocket = isConnected;
  }

  async registration(email, password, login) {
    try {
      const response = await AuthService.registration(email, password, login);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    const response = await AuthService.logout();
    localStorage.removeItem('token');
    this.setAuth(false);
    this.setUser({});
  }

  async checkAuth() {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/refresh`,
      { withCredentials: true }
    );
    localStorage.setItem('token', response.data.accessToken);
    this.setAuth(true);
    this.setUser(response.data.user);
  }

  sendMessage(login, message) {
    try {
      const response = MessageService.sendMessage(login, message);
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  getMessage() {
    try {
      const response = MessageService.getMessage();
      return response;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}

import { AxiosResponse } from 'axios';
import api from '../http';
import { AuthResponse } from '../models/AuthResponse';

export default class Userervice {
  static fetchUsers() {
    return api.get('/users');
  }
}

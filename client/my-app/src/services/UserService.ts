import { AxiosResponse } from 'axios';
import api from '../http';
import { AuthResponse } from '../models/AuthResponse';
import { IUser } from '../models/IUser';

export default class Userervice {
  static fetchUsers() {
    return api.get<IUser>('/users');
  }
}

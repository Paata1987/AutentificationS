import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Context } from '.';
import { observer } from 'mobx-react-lite';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

function App() {
  const { store } = useContext(Context);

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <div>Loading ....</div>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>
        {' '}
        {store.isAuth
          ? `::::: User ${store.user.email} Authorized :::::`
          : `User ${store.user.email} is NOT authorized!!!`}
      </h1>
      <h1>
        {' '}
        {store.user.isActivated
          ? 'account is active'
          : 'account is not active : activate!'}{' '}
      </h1>
      <button onClick={() => store.logout()}>LOG OUT</button>
      <button onClick={getUsers}>get Users</button>

      {users.map((x) => (
        <div key={x.email}> {x.email} </div>
      ))}
    </div>
  );
}

export default observer(App);

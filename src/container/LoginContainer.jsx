import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  changeLoginField,
} from 'state/actions';

export default function LoginContainer() {
  const dispatch = useDispatch();

  const { loginField: { email, password } } = useSelector((state) => ({
    loginField: state.loginField,
  }));

  function handleChangeLoginFields(event) {
    const { name, value } = event;
    dispatch(changeLoginField({ name, value }));
  }

  return (
    <form>
      <div>
        <label htmlFor="login-email">E-mail</label>
        <input
          type="email"
          name="email"
          id="login-email"
          onChange={handleChangeLoginFields}
          value={email}
        />
      </div>

      <div>
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          name="password"
          id="login-password"
          onChange={handleChangeLoginFields}
          value={password}
        />
      </div>

      <button type="submit">Log In</button>
    </form>
  );
}

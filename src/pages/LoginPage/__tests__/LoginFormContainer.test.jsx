import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from '../LoginFormContainer';

jest.mock('react-redux');
jest.mock('../../../services/storage');

describe('LoginFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      accessToken: given.accessToken,
      userLoginInputs: { email: 'test@naver', password: 'te' },
    }));
  });

  context('accessToken이 없을 때', () => {
    given('accessToken', () => '');
    it('input을 입력하면 변경된 입력을 반영하는 dispatch함수가 실행된다.', () => {
      const { queryByLabelText } = render(<LoginFormContainer />);
      const controls = [
        { label: 'E-mail', origin: 'test@naver', value: 'test@naver.com' },
        { label: 'Password', origin: 'te', value: 'test' },
      ];

      controls.forEach(({ label, origin, value }) => {
        expect(queryByLabelText(label).value).toBe(origin);

        fireEvent.change(queryByLabelText(label), { target: { value } });

        expect(dispatch).toBeCalled();
      });
    });

    it('Login 버튼을 클릭하면 로그인하는 dispatch함수가 실행된다.', () => {
      const { queryByText } = render(<LoginFormContainer />);

      fireEvent.click(queryByText('Log In'));

      expect(dispatch).toBeCalled();
    });
  });

  context('accessToken이 있을 때', () => {
    given('accessToken', () => 'ACCESS_TOKEN');
    it('로그아웃버튼을 보여준다.', () => {
      const { queryByText } = render(<LoginFormContainer />);

      expect(queryByText('Log out')).toBeInTheDocument();
    });

    it('로그아웃 버튼을 누르면 accessToken을 제거하는 dispatch와 saveItem이 실행된다.', () => {
      const { queryByText } = render(<LoginFormContainer />);

      fireEvent.click(queryByText('Log out'));

      expect(dispatch).toBeCalled();
    });
  });
});

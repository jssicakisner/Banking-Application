import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Login from './Components/login';

test('login', () => {
  const {getByRole,getByPlaceholderText} = render(<Login/>);
  getByPlaceholderText('Enter email');
  getByPlaceholderText('Enter password');
  getByRole('button');
});

test("user with invalid email and password", () => {
  const {getByRole,getByText,getByDisplayValue,getByPlaceholderText} = render(<Login/>);
  const email = getByPlaceholderText('Enter email');
  fireEvent.change(email, {target:{value:'abel@mit'}});
  getByDisplayValue('abel@mit');
  const pwd = getByPlaceholderText('Enter password');
  fireEvent.change(pwd, {target:{value:'test'}});
  getByDisplayValue('test');
  const button = getByRole('button');
  fireEvent.click(button);
  getByText('password must be at least 8 characters');
  getByText('email is not valid');
});
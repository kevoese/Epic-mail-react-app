/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import 'jsdom-global/register';
import Form from '@components/Form';
import Input from '@components/Form/input';

describe('Form component', () => {
  it('should render the input component', () => {
    const handleChange = jest.fn();
    const value = '';
    const component = shallow(
      <Input
        id="password"
        value={value}
        onChange={handleChange}
        classes="passwrd"
        pattern="^[\w@.]{7,20}$"
        type="password"
        placeholder="Password"
        required
      />
    );
    expect(component).toMatchSnapshot();
  });
});

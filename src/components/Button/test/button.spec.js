/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import 'jsdom-global/register';
import Button from '@components/Button';

let handleClick;

describe('Button component', () => {
  beforeEach(async () => {
    handleClick = jest.fn();
  });

  it('should render the button without loading when submitting is false', () => {
    const component = shallow(
      <Button isSubmitting={false} onClick={handleClick} classes="">
        test
      </Button>,
    );
    expect(component).toMatchSnapshot();
  });

  it.only('should render the button with loading when submitting is true', () => {
    const component = shallow(
      <Button isSubmitting onClick={handleClick} classes="">
        test
      </Button>,
    );

    component.find('button').simulate('click');
    expect(component.text()).toEqual('Loading...');
    expect(component).toMatchSnapshot();
  });
});

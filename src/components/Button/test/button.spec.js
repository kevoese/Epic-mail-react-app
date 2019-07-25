/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import 'jsdom-global/register';
import Button from '@components/Button';

describe('Button component', () => {
  it('should render the button without loading when submitting is false', () => {
    const handleClick = jest.fn();
    const component = shallow(
      <Button isSubmitting={false} onClick={handleClick} classes="">
        test
      </Button>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the button with loading when submitting is true', () => {
    const handleClick = jest.fn();
    const component = shallow(
      <Button isSubmitting={false} onClick={handleClick} classes="">
        test
      </Button>
    );
    expect(component).toMatchSnapshot();
  });
});

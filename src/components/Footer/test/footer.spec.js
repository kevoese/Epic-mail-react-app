/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import 'jsdom-global/register';
import Footer from '@components/Footer';

describe('Footer component', () => {
  it('should render the Footer component', () => {
    const component = shallow(<Footer />);
    expect(component).toMatchSnapshot();
  });
});

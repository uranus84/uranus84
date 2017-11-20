import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// import App from '../client/components/App.jsx';
import Login from '../client/components/Login.jsx';

describe('<Login />', () => {
  const wrapper = shallow(<Login />);
  it('component should initialize a username and password state', () => {
		expect(wrapper.state.username).to.exist;
		expect(wrapper.state.password).to.exist;
  });
});

// expect(wrapper.find('Login')).to.have.length(1);
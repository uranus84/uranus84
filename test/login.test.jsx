import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// import App from '../client/components/App.jsx';
import Login from '../client/components/Login.jsx';

describe('<Login />', () => {
  const wrapper = mount(<Login />);
  it('component should initialize a username and password state', () => {
		expect(wrapper.state().username).to.exist;
		expect(wrapper.state().password).to.exist;
  });
  it('component should update state when login button is clicked', () => {
		wrapper.ref('username').get(0).value = 'foo';
		wrapper.ref('password').get(0).value = 'bar';
		const p = wrapper.find('form');
		p.simulate('submit');
		expect(wrapper.ref('username').get(0).value).to.equal('foo');
		expect(wrapper.ref('password').get(0).value).to.equal('bar');
  });
  it('component should submit a get request when login button is clicked', () => {

  });
  it('component should redirect if user and password is found', () => {

  });
  it('component should handle errors if user and password is not found', () => {

  });
  it('component should redirect when signup button is clicked', () => {

  })
});

// expect(wrapper.find('Login')).to.have.length(1);
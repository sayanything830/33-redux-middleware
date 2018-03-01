import React from 'react';
import {configure, shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoryForm from '../component/category/category-form/index';
require('jest');

configure({adapter: new Adapter()});

describe('<CategoryForm />', function() {
  describe('Shallow mounting', () => {
    beforeAll(() => this.wrapper = shallow(<CategoryForm />));
    afterAll(() => this.wrapper.unmount());

    it('should render a category form component', () => {
      expect(this.wrapper.length).toBe(1);
      expect(this.wrapper.find('.category-form').length).toBe(1);
    });
    it('should have a default state object with a name and property', () => {
      expect(this.wrapper.state().name).toEqual('');
    });
    it('should change the state object with form input provided', () => {
      this.wrapper.find('.category-form input[type="text"]').simulate('change', {target: {name: 'name', value: 'hello'}});
      expect(this.wrapper.state().name).toEqual('hello');
    });
  });
  describe('Full Mounting', () => {
    beforeAll(() => {
      this.wrapper = mount(<CategoryForm />);
      this.wrapper.setProps({onComplete: jest.fn()});
    });
    afterAll(() => this.wrapper.unmount());

    it('should render a category form component', () => {
      expect(this.wrapper.length).toBe(1);
    });
    it('should reset the state.name value to empty string on form submit', () => {
      this.wrapper.setState({name: 'bye'});
      this.wrapper.simulate('submit', {preventDefault: jest.fn()});
      expect(this.wrapper.state().name).toEqual('');
    });
    it('should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled();
    });
  });
});

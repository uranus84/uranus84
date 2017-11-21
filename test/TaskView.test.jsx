import React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';

import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import TodaysChores from '../client/components/TodaysChores.jsx';
import TodaysChoreEntry from '../client/components/TodaysChoreEntry.jsx';
import FutureChores from '../client/components/FutureChores.jsx';
import FutureChoreEntry from '../client/components/FutureChoreEntry.jsx';

import App from '../client/components/App.jsx';
import Login from '../client/components/Login.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('TodaysChores', () => {
  it('renders one TodaysChoreEntry for each chore', () => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = '09:00:00';
    const dateTime = `${date} ${time}`;

    const chores = [
      {
        chore_name: 'Mow lawn',
        next_date: dateTime,
        frequency: 'weekly',
        last_date_completed: '2017-11-18 09:00:00',
        completed: false,
      },
      {
        chore_name: 'Wash dishes',
        next_date: dateTime,
        frequency: 'daily',
        last_date_completed: '2017-11-18 09:00:00',
        completed: false,
      },
    ];

    const wrapper = shallow(<TodaysChores chores={chores} />);
    expect(wrapper.find('.todays-chores-list').to.have.length(2));
  });
});

describe('TodaysChoreEntry', () => {
  describe('rendering', () => {
    it('renders the name and last completed date of the chore', () => {
      const today = new Date();
      const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
      const time = '09:00:00';
      const dateTime = `${date} ${time}`;

      const chore = {
        chore_name: 'Mow lawn',
        next_date: dateTime,
        frequency: 'weekly',
        last_date_completed: '2017-11-18 09:00:00',
        completed: false,
      };

      const wrapper = shallow(<TodaysChoreEntry chore={chore} />);
      expect(wrapper.find('.chore-name').text().toBe('Mow lawn'));
      expect(wrapper.find('.chore-last-done').text().toBe('2017-11-18 09:00:00'));
      // might need to change the date checker based on how we render dates in app
    });
  });

  xdescribe('behavior', () => {
    it('marks chore as completed when checkbox clicked', () => {

    });

    it('updates chore info in db when edited', () => {

    });

    it('appears in Future Chores when due date is changed to future', () => {

    });
  });
});

describe('FutureChores', () => {
  it('renders one TodaysChoreEntry for each chore', () => {
    const chores = [
      {
        chore_name: 'Mow lawn',
        next_date: '2017-12-18 09:00:00',
        frequency: 'weekly',
        last_date_completed: '2017-11-18 09:00:00',
        completed: false,
      },
      {
        chore_name: 'Wash dishes',
        next_date: '2017-12-18 09:00:00',
        frequency: 'daily',
        last_date_completed: '2017-11-18 09:00:00',
        completed: false,
      },
    ];

    const wrapper = shallow(<FutureChores chores={chores} />);
    expect(wrapper.find('.future-chores-list').to.have.length(2));
  });
});

describe('FutureChoreEntry', () => {
  describe('rendering', () => {
    it('renders the name, frequency, and due date of the chore', () => {

      const chore = {
        chore_name: 'Mow lawn',
        next_date: '2017-12-18 09:00:00',
        frequency: 'weekly',
        last_date_completed: '2017-11-18 09:00:00',
        completed: false
      };

      const wrapper = shallow(<FutureChoreEntry chore={chore} />);
      expect(wrapper.find('.chore-name').text().toBe('Mow lawn'));
      expect(wrapper.find('.chore-freq').text().toBe('weekly'));
      expect(wrapper.find('.chore-due').text().toBe('2017-12-18 09:00:00'));
      // might need to change the date checker based on how we render dates in app
    });
  });

  xdescribe('behavior', () => {
    it('marks chore as completed when checkbox clicked', () => {

    });

    it('updates chore info in db when edited', () => {

    });

    it('appears in Todays Chores when due date is changed to today or earlier', () => {

    });
  });
});

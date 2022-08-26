import React from 'react'
import renderer from 'react-test-renderer';
import QuesAns from '../QuesAns.jsx';

it('questions and answers matches snapshot', () => {
  const tree = renderer.create(<QuesAns />).toJSON();
  expect(tree).toMatchSnapshot();
});
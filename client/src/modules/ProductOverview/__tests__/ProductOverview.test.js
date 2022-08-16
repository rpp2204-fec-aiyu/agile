import React from 'react'
import renderer from 'react-test-renderer'
import ProductOverview from '../ProductOverview.jsx'

it('Renders ProductOverview component', () => {
  const component = renderer.create(<ProductOverview />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
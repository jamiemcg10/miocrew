import React from 'react'
import Menu from './Menu'

describe('<Menu />', () => {
  it('mounts', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
  })
})

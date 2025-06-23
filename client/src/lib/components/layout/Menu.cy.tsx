import React from 'react'
import Menu from './Menu'

describe('<Menu />', () => {
  it('Mounts (>= sm)', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
  })

  it('Mounts (< sm)', () => {
    cy.mount(<Menu open={true} matches={false} handleClose={() => {}} />)
  })

  it('Has "Dashboard" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Dashboard')
  })

  it('"Dashboard" option has correct href', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Dashboard').closest('a').should('have.attr', 'href', '/dashboard')
  })

  it('Has "Messages" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Messages')
  })

  it('Has "Create trip" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Create trip')
  })

  it('Has "Past trips" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Past trips')
  })

  it('"Past trips" option has correct href', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Past trips').closest('a').should('have.attr', 'href', '/past')
  })

  it('Has "Settings" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Settings')
  })

  it('Has "Log out" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Log out')
  })
})

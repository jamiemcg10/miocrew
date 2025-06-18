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

  it('Has "Schedule" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Schedule')
  })

  it('Has "Tasks" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Tasks')
  })

  it('Has "Planning" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Planning')
  })

  it('Has "Expenses" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Expenses')
  })

  it('Has "Messages" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Messages')
  })

  it('Has "Past trips" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Past trips')
  })

  it('Has "Settings" option', () => {
    cy.mount(<Menu open={true} matches={true} handleClose={() => {}} />)
    cy.contains('Settings')
  })
})

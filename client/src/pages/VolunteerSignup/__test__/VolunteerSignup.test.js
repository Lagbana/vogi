import React from 'react'
import { render, cleanup } from '@testing-library/react'
import VolunteerSignup from '../'

afterEach(cleanup)

test('renders without crashing', () => {
  render(<VolunteerSignup />)
})

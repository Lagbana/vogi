import React from 'react'
import { render, cleanup } from '@testing-library/react'
import PartnerSignup from '../'

afterEach(cleanup)

test('renders without crashing', () => {
  render(<PartnerSignup />)
})

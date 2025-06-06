'use client'
 
import { reset } from '../actions/admin'
 
export default function BtnReset() {
  return (
      <button
      className='admin-reset-btn'
        onClick={async () => {
          await reset()
        }}
      >
        Reset
      </button>
  )
}
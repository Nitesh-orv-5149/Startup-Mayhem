import React from 'react'
import ResetButton from '../components/ResetButton'
import PhaseChangeButton from '../components/PhaseChangeButton'

export default function AdminSettings() {
  return (
    <div className='flex flex-col bg-black min-h-screen text-white gap-10'>
        <h1>AdminSettings</h1>
        <ResetButton/>
        <PhaseChangeButton/>
    </div>
  )
}

import React from 'react'
import { buyCard } from './firebase/Teamfunctions'

export default function Tests() {
  return (
    <div>
      <button onClick={() => buyCard('Q22wSbrv47WN2EzLc81q', 'qqc3XcycBXDMRyY0Y7IO')} className='p-2 bg-green-300 hover:bg-green-800 ml-10'>buy card team 1</button>
      <button onClick={() => buyCard('ZoRmd7SH3iDx08gx3oou', 'qqc3XcycBXDMRyY0Y7IO')} className='p-2 bg-green-300 hover:bg-green-800 ml-10'>buy card team 2</button>
    </div>
  )
}

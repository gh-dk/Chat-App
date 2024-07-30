import React from 'react'
i
import Nav from "../component/nav";
import Message from '../component/message'

export default function AppLayout() {
  return (
    <>
        <div className='viewPage'>
        <Outlet/>
        {/* <Message/> */}
        </div>
        <Nav/>
    </>
  )
}

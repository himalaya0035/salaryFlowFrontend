import React from 'react'
import Sidebar from './Components/Sidebar/Sidebar'
import TopBar from './Components/TopBar/TopBar'

function Layout({children}) {
  return (
    <React.Fragment>
      <Sidebar/>
      <TopBar/>
      <div className='p-4 md:ml-[270px]'>
        {children}
      </div>
    </React.Fragment>
  )
}

export default Layout
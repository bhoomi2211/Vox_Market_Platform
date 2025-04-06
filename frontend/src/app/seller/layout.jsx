import React from 'react'
import SellerNavBar from './navbar'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    return (
        <>
            <SellerNavBar />
            <Sidebar>
                {children}
            </Sidebar>
        </>
    )
}

export default Layout
import React from 'react'
import Sidebar from './sidebars/Sidebar'
import { useCookies } from 'react-cookie'

const Profile = () => {
    const [cookie, createcookie, removecookie] = useCookies();
    return (
        <>
            <div className="sidebar-main">
                <Sidebar />
                <div className="main-content">
                    <div className="header">
                        <h1>My Profile</h1>
                    </div>
                    <div className="dashboard-cards">
                        <div className="card">
                            <h2 className='text-primary'>My Store</h2>
                            <p>{cookie.storeid}</p>
                        </div>
                        <div className="card">
                            <h2>My Name</h2>
                            <p>nn</p>
                        </div>
                        <div className="card">
                            <h2 className='text-danger'>My type</h2>
                            <p>1mn</p>
                        </div>
                        <div className="card">
                            <h2 className='text-danger'>Returned Orders</h2>
                            <p>1,234</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
import React from 'react'
import Adminsidebar from './Adminsidebar'
import Managersidebar from './Managersidebar'
import Deliveryboysidebar from './Deliveryboysidebar'
import Distributorsidebar from './Distributorsidebar'
import { useCookies } from 'react-cookie'

const Sidebar = () => {
  const [cookie, createcookie, removecookie] = useCookies();

  if (cookie?.adminCookie) {
    return <Adminsidebar />;
  } else if (cookie?.deliveryboyCookie) {
    return <Deliveryboysidebar />;
  } else if (cookie?.managerCookie) {
    return <Managersidebar />;
  } else if (cookie?.distributorCookie) {
    return <Distributorsidebar />;
  } else {
    return <Distributorsidebar />; // Default sidebar
  }

}

export default Sidebar
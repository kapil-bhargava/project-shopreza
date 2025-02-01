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
  }
  else {
    if (cookie["emptype"] == "manager") {
      return <Managersidebar />;
    }
    else if (cookie["emptype"] == "distributor") {
      return <Distributorsidebar />;
    }
    else if (cookie["emptype"] == "deliveryboy") {
      return <Deliveryboysidebar />;
    }
    else {
      return <Distributorsidebar />; // Default sidebar
    }
  }


}

export default Sidebar
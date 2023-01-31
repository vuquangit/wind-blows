import React from 'react'
import menuList from './ListMenu'
import MenuItem from './MenuItem'

const TabMenu = () => {
  const _renderMenu = () =>
    menuList.map((item, idx) => <MenuItem {...item} key={idx} />)

  return <div className='personal__tab-pages--menu'>{_renderMenu()}</div>
}

export default TabMenu

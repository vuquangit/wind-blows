import React from 'react'
import menuLists from './MenuLists'
import MenuItem from './MenuItem'
import './menuAccount.scss'

const MenuAccount = () => {
  const _renderMenu = () =>
    menuLists.map((item, idx) => <MenuItem {...item} key={idx} />)

  return <div className='menu-account'>{_renderMenu()}</div>
}

export default MenuAccount

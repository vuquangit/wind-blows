import React, { useCallback } from 'react'
import MenuItem from './MenuItem'
import menuConfig from './menuConfig'

const Menu = () => {
  const _renderMenuItem = useCallback((item, idx) => {
    const childProps = { ...item, key: idx }
    return (
      <MenuItem {...childProps} />
    )
  }, [])

  return (
    <div className='header__menu'>
      <div className='header__menu--items'>
        {menuConfig.map(_renderMenuItem)}
      </div>
    </div>
  )
}

export default Menu

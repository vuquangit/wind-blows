import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'

const MenuItem = ({ label = '', href = '', location }) => {
  const classItem = classNames('menu-account__item', {
    'menu-account__item--visited': href === location.pathname
  })

  return (
    <div>
      <Link to={href} className={classItem}>
        {label}
      </Link>
    </div>
  )
}

export default withRouter(MenuItem)

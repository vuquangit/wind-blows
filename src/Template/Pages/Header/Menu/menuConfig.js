import { faHeartbeat, faUser, faGlobeAsia } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

const menuConfig =
[
  {
    title: 'Explore',
    href: '/explore',
    icon: faGlobeAsia
  },
  {
    title: 'Messenger',
    href: '/messenger',
    icon: faFacebookMessenger
  },
  {
    title: 'Activity',
    href: '/activity',
    icon: faHeartbeat
  },
  {
    title: 'Personal Page',
    href: '/:username',
    icon: faUser
  }
]

export default menuConfig

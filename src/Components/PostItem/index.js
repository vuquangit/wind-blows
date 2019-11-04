import React from 'react'
import numeral from 'numeral'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart , faComment} from '@fortawesome/free-solid-svg-icons'
import './postItem.scss'

function PostItem({
  thumbnailSrc = '',
  numLikes = 0,
  numComments = 0,
  ...restProps
}) {

  const [isHover, setIsHouver] = React.useState(false)

  const handleMouseHover =()=> setIsHouver(!isHover)

  return (
    <div className='post-item'>
      <div 
        className='post-item__content'
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseHover}
      >
        <div>        
          <img alt='alt image' src={thumbnailSrc} />        
        </div>
        <div>
          <span aria-label='Carousel' className='filled' />
        </div>
        {
          isHover && ( <div className='post-item__LC'>
            <div className='post-item__LC--content'>
              <div className='LC-item'>
                <FontAwesomeIcon icon={faHeart} />{` ${numeral(numLikes).format('0.[00]a')}`}
              </div>
              <div className='LC-item'>
                <FontAwesomeIcon icon={faComment} />{` ${numeral(numComments).format('0.[00]a')}`}
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
  )
} 

export default PostItem

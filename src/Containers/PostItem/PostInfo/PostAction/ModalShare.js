import React from 'react'
import { Modal, message } from 'antd'
import {
  faFacebookSquare,
  faFacebookMessenger,
  faLinkedin,
  faTwitter,
  faPinterestSquare
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { get } from 'lodash'
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton
} from 'react-share'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import ShareButtonWrapper from './ShareButtonWrapper'

const ModalShare = ({
  postId = '',
  sidecarChildren = {},
  visibleModal,
  handleCancelModal
}) => {
  const FBAppID = process.env.FACEBOOK_APP_ID
  const postImageLink = get(sidecarChildren, '[0].url', '')
  const postLink = `${get(window, 'location.origin', '')}/p/${postId}`
  const handleCopyLink = () => {
    message.success('Post link is copied')
  }

  // console.log(postImageLink);

  return (
    <Modal
      title='Share'
      visible={visibleModal}
      onCancel={handleCancelModal}
      className='action__share-modal'
      footer={null}
      closable
      centered
    >
      <div className='action__share-modal--content'>
        <FacebookShareButton url={postLink} quote='The wind blows post'>
          <ShareButtonWrapper icon={faFacebookSquare}>
            Share to Facebook
          </ShareButtonWrapper>
        </FacebookShareButton>
        <FacebookMessengerShareButton url={postLink} appid={`${FBAppID}`}>
          <ShareButtonWrapper icon={faFacebookMessenger}>
            Share to Messenger
          </ShareButtonWrapper>
        </FacebookMessengerShareButton>
        <TwitterShareButton url={postLink}>
          <ShareButtonWrapper icon={faTwitter}>
            Share to Twitter
          </ShareButtonWrapper>
        </TwitterShareButton>
        <LinkedinShareButton url={postLink}>
          <ShareButtonWrapper icon={faLinkedin}>
            Share to Linkedin
          </ShareButtonWrapper>
        </LinkedinShareButton>
        {postImageLink && (
          <PinterestShareButton url={postLink} media={`${postImageLink}`}>
            <ShareButtonWrapper icon={faPinterestSquare}>
              Share to Pinterest
            </ShareButtonWrapper>
          </PinterestShareButton>
        )}
        <EmailShareButton url={postLink}>
          <ShareButtonWrapper icon={faEnvelope}>
            Share to Email
          </ShareButtonWrapper>
        </EmailShareButton>
        <CopyToClipboard text={postLink} onCopy={() => handleCopyLink()}>
          <ShareButtonWrapper icon={faLink}>Copy Link</ShareButtonWrapper>
        </CopyToClipboard>
        <ShareButtonWrapper onClick={handleCancelModal}>
          Cancel
        </ShareButtonWrapper>
      </div>
    </Modal>
  )
}

export default ModalShare

import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import axios from 'utils/axiosConfig'
import { get, isEmpty, filter } from 'lodash'
import { useSelector } from 'react-redux'
import { Button } from 'antd'

import CommentContent from './CommentContent'
import AddComment from '../AddComments'

const CommentListItem = ({
  isCaption = true,
  postId = '',
  id: commentId = '',
  deleted = false,
  totalChildComments = 0,
  isHomePage = false,
  handleDeleteComment = () => {},
  ...restProps
}) => {
  const viewerId = useSelector((state = {}) => get(state, 'profile.data.user.id', ''))

  // fetch comments data
  const [childComments, setChildComments] = useState({
    isLoading: false,
    data: [],
    error: null,
    limit: 3,
    page: 0,
    totalChildComments: totalChildComments,
  })

  useEffect(() => {
    const source = axios.CancelToken.source()

    const feactCommentsData = async () => {
      setChildComments(prevState => ({ ...prevState, isLoading: true }))

      try {
        const response = await axios({
          method: 'get',
          url: '/post/comments/child',
          params: {
            parentCommentId: commentId,
            viewerId: viewerId,
            limit: childComments.limit,
            page: childComments.page,
          },
          headers: {
            'Content-Type': 'application/json',
          },
          cancelToken: source.token,
        })

        // console.log("reponse child comments", response);

        if (!isEmpty(response.data)) {
          setChildComments(prevState => ({
            ...prevState,
            data: [...get(response, 'data.childComments'), ...prevState.data],
            totalChildComments: get(response, 'data.totalChildComments'),
            isLoading: false,
          }))
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          // console.log("cancelled fetch comments");
        } else {
          setChildComments(prevState => ({ ...prevState, isLoading: false }))
          console.log(error)
        }
      }
    }

    if (!isCaption && isViewReplies) feactCommentsData()

    // unmount
    return () => {
      source.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childComments.page])

  const handleAddChildComment = res => {
    setChildComments(prevState => ({
      ...prevState,
      data: [...prevState.data, res],
      totalChildComments: prevState.totalChildComments + 1,
    }))
  }
  const handleDeleteChildComment = commentId => {
    setChildComments(prevState => ({
      ...prevState,
      data: filter(prevState.data, item => item.id !== commentId),
      totalChildComments:
        prevState.totalChildComments - 1 > 0 ? prevState.totalChildComments - 1 : 0,
    }))

    // console.log("delete child comment", childComments);
  }

  // reply to
  const [replyTo, setReplyTo] = useState('')
  const handleReplyTo = (username = '') => {
    setReplyTo(username)
  }

  // show replies
  const [isViewReplies, setIsViewReplies] = useState(false)
  const handleViewReplies = () => {
    if (childComments.totalChildComments > 0) {
      if (childComments.totalChildComments === childComments.data.length)
        setIsViewReplies(!isViewReplies)
      else {
        setIsViewReplies(true)

        if (childComments.totalChildComments > childComments.data.length) {
          setChildComments(prevState => ({
            ...prevState,
            page: prevState.page + 1,
          }))
        }
      }
    }
  }

  const textViewReplies =
    childComments.totalChildComments - childComments.data.length
      ? `View replies (${childComments.totalChildComments - childComments.data.length})`
      : isViewReplies
      ? 'Hide replies'
      : `View replies (${childComments.data.length})`

  // className
  const itemW1 = classNames('CL__item--W1', { CL__CMTW1: isHomePage })

  return (
    <div className='CL__item'>
      <div className={itemW1} role='menuitem'>
        <CommentContent
          {...restProps}
          isCaption={isCaption}
          postId={postId}
          id={commentId}
          isHomePage={isHomePage}
          isReply={!!replyTo}
          handleReplyTo={handleReplyTo}
          handleDeleteComment={handleDeleteComment}
        />
        {!isHomePage && childComments.totalChildComments && childComments.totalChildComments > 0 ? (
          <div className='child-comments'>
            <div className='child-comments__view-replies'>
              <Button
                loading={childComments.isLoading}
                onClick={handleViewReplies}
                className='child-comments__view-replies--btn'
              >
                <div className='dashed-line' />
                <span>{textViewReplies}</span>
              </Button>
            </div>
            {isViewReplies && childComments.data && childComments.data.length > 0 ? (
              <div className='child-comments__items'>
                {childComments.data.map((item, idx) => (
                  <div key={item.id || idx} className='child-comments__items--item'>
                    <CommentContent
                      {...item}
                      isCaption={false}
                      isHomePage={isHomePage}
                      isReply={!!replyTo}
                      handleReplyTo={handleReplyTo}
                      handleDeleteComment={handleDeleteChildComment}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
        {replyTo && (
          <div className='CL__item--reply'>
            <AddComment
              postId={postId}
              isRepply={!!replyTo}
              replyTo={replyTo}
              parentCommentId={commentId}
              handleAddComment={handleAddChildComment}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentListItem

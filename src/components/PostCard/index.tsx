import Field from '../Field'
import React from 'react'
import { PostCardProps } from './postCard.interface'
import './postCard.css'

export const PostCard: React.FC<PostCardProps> = (props) => {
  const { post } = props

  return (
    <Field>
      <div className='postDetails'>
      <div>{new Date(post.created_time).toUTCString()}</div>
      <hr />
      <div>{post.message}</div>
      </div>
    </Field>
  )
}

export default PostCard

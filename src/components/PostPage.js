import React from 'react'
import '../style.css'

export default function PostPage ({ post }) {
  return (
    <div>
      {post.content}
    </div>
  )
}
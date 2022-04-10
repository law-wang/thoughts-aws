import { Auth } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import { Blog } from './models'
import Auth from './components/Auth'
import BlogPage from './components/BlogPage'
import PostPage from './components/PostPage'
import BlogCreate from './components/BlogCreate'
import './style.css'


function Main() {
  const [blogs, setBlogs] = useState([])

  return (
    <div className='Main'>
      hello
    </div>
  )
}

export default Main

import { Auth } from 'aws-amplify'
import { DataStore } from '@aws-amplify/datastore'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Blog } from '../models'
import Login from './Auth'
import BlogPage from './BlogPage'
import CreatePost from './CreatePost'

import '../style.css'

function Main() {
  const [blogs, setBlogs] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const getData = async () => {
      try {
        // query for all blog posts, then store them in state
        const blogData = await DataStore.query(Blog)
        setBlogs(blogData)

        // fetch the current signed in user
        const user = await Auth.currentAuthenticatedUser()

        // check to see if they're a member of the admin user group
        setIsAdmin(user.signInUserSession.accessToken.payload['cognito:groups'].includes('admin'))
        setUser(user)

      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [])

  return (
    <div className='Main'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<CreatePost user={isAdmin} blog={blogs[0]} />} />
        <Route exact path='/' element={<BlogPage />} />
      </Routes>
    </div>
  )
}

export default Main
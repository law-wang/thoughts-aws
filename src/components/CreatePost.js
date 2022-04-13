
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { DataStore } from 'aws-amplify'

import { Tag, Post } from '../models'
import '../style.css'

function CreatePost ({ user, blog }) {

    const [posts, setPosts] = useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    useEffect(() => {
        const getData = async () => {
            const posts = await DataStore.query(Post)
            setPosts(posts)
        }
        getData()
    }, [])

    const onSubmit = async (data) => {
        console.log(data)

        const newPost = await DataStore.save(new Post({
            content: data.Content,
            tag: data.Tag,
            blogID: blog.id,
            createdAt: new Date().toISOString(),
            time: new Date().toISOString(),
            num: posts.length + 1
        }))

        reset()
    }
    console.log(errors)

    return (
        user ? 
        <div id="post-create">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Content" {...register("Content", {required: true})} />

                <input {...register("Tag", { required: true })} type="radio" value={Tag.THOUGHTS} /> Thoughts
                <input {...register("Tag", { required: true })} type="radio" value={Tag.PLAYLISTS} /> Playlists
                <input {...register("Tag", { required: true })} type="radio" value={Tag.QUOTES} />
 Quotes
                <input type="submit" />
            </form>
        </div>
        : 
        <div>Access Denied.</div>
    )
}

export default CreatePost
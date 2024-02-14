import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from './api/axios'

const FullPost = ({posts,setPosts}) => {
    const {id} = useParams()
    const allposts = posts
    // console.log(typeof(id))
    // console.log(allposts)
    const navigate = useNavigate()

    const post = allposts.find((post)=>post.id === Number(id))
    // const post2 = allposts.filter(post=>post.id===Number(id))
    // console.log(post)
    // console.log(post2)
    const handleDelete = (id)=>{

      const remainPosts = allposts.filter((post)=>(post.id!==Number(id)))

      setPosts(remainPosts)
      // localStorage.setItem("post_data",JSON.stringify(remainPosts))
      axios.delete(`/post/${post.id}`)

      navigate("/")

    }
    

  return (
    <div>
      {
        post &&
        <article className='post-preview'>
          <h1 className='post-preview-title'>{post.title}</h1>
          <p className='post-preview-body'>{post.body}</p>
          <div className='btn-group'>
            <button
            type='button'
            onClick={()=>handleDelete(post.id)}
            className='post-preview-delete'
            >Delete</button>
            <button
            type='button'
            className='post-preview-edit'
            ><Link to={`/${post.id}/edit`} style={{color:"black"}}>Edit</Link></button>
          </div>
        </article>
      }
      {
        !post &&
        <article className='post-preview'>
          <h1 className='post-preview-title'>No Post Yet</h1>
          <Link to="/"><p className='post-preview-link'>Visit our home page</p></Link>
        </article>
      }
    </div>
  )
}

export default FullPost
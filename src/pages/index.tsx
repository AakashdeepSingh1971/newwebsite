import Head from "next/head";
import { useEffect, useState } from "react";
import { getReference, setPost } from "./api/_firebase";
import moment from 'moment';
import Noman from './test'

export default function Home() {

  const [posts, setPosts] = useState([]);

  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getReference("/blog/posts").then((ref) => {
      ref.on("child_added", (data) => {
        let d: any = data.toJSON();
        setPosts((p) => p.concat(d));
      })
    })
  }, [])

  const submit = (e: any) => {
    e.preventDefault();
    setPost( title,content, name )
  }

  return (
    <div className="bg-cover bg-gray-900 " >
      <div > <h1 className="text-center  bg-green-300 text-8xl pt-5" style={{fontFamily:'Lobster, cursive'}} > Blogs </h1>
      <h6 className="text-center bg-green-300  text-8xl pt-5" style={{fontFamily:'Lobster, cursive'}}></h6>
      </div>
      <div className="flex flex-row space-x-8 pl-10 pb-5  w-full bg-green-300" >
        <h6>link</h6>
        <h6>link</h6>
        <h6>link</h6>
        <h6>link</h6>
        <h6>link</h6>
        <h6>link</h6>
      </div>

      <Head>
        <title>NextWind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="grid grid-cols-2 gap-4 p-5 text-left text-white">

        {posts && posts.map((p: any) => <BlogCard data={p} key={p.id} />)}

      </div>
      <div>
        <form onSubmit={submit} className="flex flex-col w-64 p-5 space-y-3" >
        <input placeholder="Title" className="rounded-full py-2 px-2  border border-red-500 focus:ring-4 ring-red-200"
            onChange={
              (e) => { setTitle(e.target.value) }
            } type="text" value={title} />

          <input placeholder="Content" className="rounded-full py-2 px-2  border border-red-500 focus:ring-4 ring-red-200"
            onChange={
              (e) => { setContent(e.target.value) }
            } type="text" value={content} />

          <input placeholder="Name" className="rounded-full py-2 px-2 border border-red-500 focus:ring-4" onChange={
            (e) => { setName(e.target.value) }
          } type="text" value={name} />

          <button type="submit" onClick={() => setTitle(title) } className=" rounded-full py-2 px-2 border border-white text-white  hover:border-gray-500 "> Submit </button>
          
        </form>
        
      </div>
      <div className="bg-green-300
       text-center ">
          <h3>BY-Team Technophiles</h3>
      </div>
    </div>
  );
}

const BlogCard = (data: any) => {
  return (
    <div className="rounded-3xl border-2 bg text-color p-5 " 
     >
      <h1>{data.data.title}</h1>
      {data.data.content}

      <h6>By- {data.data.name}</h6>

      {moment(data.data.timestamp).format('Do MMMM YYYY')}
    </div>
  )
}
const Modal = () => {
  return(
    <div className="modal position:fixed; bg-black bg-opacity-10 disply:flex aline-item:center justify-content:center">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">
            hello
          </h4>
        </div>
        <div className="modal-body">
          this is body
        </div>
        <div className="modal-footer">
          <button className="button"> close </button>
        </div>
      </div>
    </div>
  )
}

//make a function for making title bold 
//empty submit click
//first letter caps 
//small modal window 
//up vote no. on main screen and modal ma kara ga upvote 
//modal add
//progress bar 
//toast
//views and upvote or rateing
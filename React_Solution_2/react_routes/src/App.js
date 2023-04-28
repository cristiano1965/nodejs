import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useLocation
} from 'react-router-dom'

import './App.css';

import blogData from './data'

import { useState } from 'react'

function Page(props) {
    return props.pageName != 'blog' ?
        <h1>{props.pageName}</h1> :
        <Blog pageName={props.pageName}/>
}

function Aggiungi(props) {

        const [name, setName] = useState('');
        const [posts, setPosts] = useState(blogData.posts); //legge sempre lo stesso blogData.posts iniziale (4 posts)
       
        const ultimo = posts.length - 1

    return (
        <>
            <h1>{props.pageName}</h1>
            <input value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={() => {
                setPosts([        // ne aggiunge uno, ma solo all'istanza locale di posts: non altera il blogData.posts iniziale !!!
                    ...posts,
                    {
                        title: name + ultimo,
                        author: "Giovanni Nuovo " + ultimo,
                        featureImage: "https://picsum.photos/600/200",
                        bio: "Lorem Ipsum Nuovo " + ultimo,
                        content: "Lorem ipsum dummy text for 'Un nuovo post'" + ultimo
                    }
                ]);
                console.log(posts)

               
                alert('Aggiunto' + ultimo +'!')
            }
             
            }>
                Aggiungi
            </button>
            <ul>
                {posts.map(post => (
                    <li>{post.title}</li>
                ))}
            </ul>
        </>
    )

}



function Blog(props) {

   
    const [posts, setPosts] = useState(blogData.posts);
    const quanti = posts.length 

    /* const ultimoPost = {
        title: "Un ultimo  post",
        author: "Ultinmo (cantante",
        featureImage: "https://picsum.photos/600/200",
        bio: "Lorem Ipsum ultimo",
        content: "Lorem ipsum dummy text for 'Un ultimo post'"
    }

    const updatedPostsArray = [...posts, ultimoPost];

    setPosts(updatedPostsArray);
    */

    return (
        <div>
            <h1>{props.pageName} ({ quanti})</h1>
        {posts.map((post, i) => {
            const postId = i + 1
            return <>
                <h2><Link to={"/blog/" + postId}>{post.title}</Link></h2>
                <img src={post.featureImage} />
                </>
        })}
       
        
       </div >
    )
}

function BlogDetails() {
    const [posts] = useState(blogData.posts)

    const params = useParams()
    const location = useLocation()
    const postId = params.slug
    const post = posts[postId - 1]
    //console.log(location)

    return (
        <div className='card' style={{width: '480px', margin: '24px auto', padding: '12px', border:'1px solid #c8c8c8',borderRadius: '12px', overflow: 'hidden'}}>
            <h2>{ post.title}</h2>
            <img src={post.featureImage} />
            <hr/>
            <small>Author: {post.author}</small>
            <strong>Bio: {post.bio}</strong>
            <p>{ post.content}</p>
        </div>
        )
}


function App() {

    

  return (
      <div className="App">
          <Router>
              <nav>
                  <div className="nav-wrapper">

                      <ul id="nav-mobile" className="right hide-on-med-and-down">
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/about">About</Link></li>
                          <li><Link to="/blog">Blog</Link></li>
                          <li><Link to="/contact">Contact</Link></li>
                          <li><Link to="/aggiungi">Aggiungi</Link></li>
                      </ul>
                  </div>
              </nav>
              <Routes>
                  <Route exact path={'/'} element={<Page pageName={'home'} />} />
                  <Route path={'/about'} element={<Page pageName={'about'} />} />
                  <Route path={'/contact'} element={<Page pageName={'contact'} />} />
                  <Route path={'/blog'} element={<Page pageName={'blog'} />} />
                  <Route path={'/aggiungi'} element={<Aggiungi pageName={'aggiungi'} />} />
                  <Route path={'/blog/:slug'} element={<BlogDetails />} />
              </Routes>
          </Router>
     
    </div>
  );
}

export default App;

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
    useLocation} from 'react-router-dom'
import './App.css';

const blogData = {
    posts :[
        {
            title: "Il mio primo post",
            author: "Maurizio",
            featureImage: "https://picsum.photos/600/200",
            bio: "Lorem Ipsum",
            content: "Lorem ipsum dummy text for 'Il mio primo post'"
        },
        {
            title: "Hello world",
            author: "Antonio",
            featureImage: "https://picsum.photos/600/200",
            bio: "Lorem Ipsum",
            content: "Lorem ipsum dummy text for 'Hello world'"
        },
        {
            title: "Il post piu' bello dell'anno",
            author: "Marco",
            featureImage: "https://picsum.photos/600/200",
            bio: "Lorem Ipsum",
            content: "Lorem ipsum dummy text for 'Il post piu' bello dell'anno'"
        },
        {
            title: "Un altro post",
            author: "Giovanni",
            featureImage: "https://picsum.photos/600/200",
            bio: "Lorem Ipsum",
            content: "Lorem ipsum dummy text for 'Un altro post'"
        }
    ]
}
function Page(props) {
    return props.pageName != 'blog' ?
        <h1>{props.pageName}</h1> :
        <Blog pageName={props.pageName}/>
}



function Blog(props) {
    return (
        <div>
        <h1>{props.pageName}</h1>
        {blogData.posts.map((post, i) => {
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
    const params = useParams()
    const location = useLocation()
    const postId = params.slug
    const post = blogData.posts[postId - 1]
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
                      </ul>
                  </div>
              </nav>
              <Routes>
                  <Route exact path={'/'} element={<Page pageName={'home'} />} />
                  <Route path={'/about'} element={<Page pageName={'about'} />} />
                  <Route path={'/contact'} element={<Page pageName={'contact'} />} />
                  <Route path={'/blog'} element={<Page pageName={'blog'} />} />
                  <Route path={'/blog/:slug'} element={<BlogDetails />} />
              </Routes>
          </Router>
     
    </div>
  );
}

export default App;

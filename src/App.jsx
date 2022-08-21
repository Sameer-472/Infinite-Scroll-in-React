import './App.css';
import UseFetch from './UseFetch';
import { useRef, useState , useCallback , useEffect} from 'react';

function App() {
  const [query, setquery] = useState("")
  const [page, setpage] = useState(1);
  const {loading , error , images} = UseFetch(query , page);
  const loader = useRef(null);

  const handleChange=(e)=>{
    setquery(e.target.value)
  }

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);


  return (
    <div className="App">
        <h1>Infinite Scroll</h1>
      <h2>with IntersectionObserver</h2>
      <input type="text" value={query} onChange={handleChange} />
      <div>
        {images.map((item, i) => (
          <div key={i}>{item.title}</div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
      <div ref={loader} />
    </div>
  )
}

export default App

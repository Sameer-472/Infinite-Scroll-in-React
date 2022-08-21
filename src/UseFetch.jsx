import { useState , useEffect , useCallback } from "react"
import axios from "axios"

const UseFetch = (query , page) => {
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState(false)
    const [images, setimages] = useState([])
    const sendQuery = useCallback(async()=>{
        try {
            await setloading(true);
            await seterror(false);
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            await setimages((prev)=> [...prev , ...response.data]);
            setloading(false);
        } catch (error) {
            console.log(error)
            seterror(true)
        }
    } , [query , page]);

    useEffect(()=>{
        sendQuery(query);
    } , [query , sendQuery , page])
  return {
    loading , error , images
  }
}

export default UseFetch
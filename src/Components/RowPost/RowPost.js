import React, {useEffect,useState} from 'react'
import './RowPost.css'
import axios from '../../axios'
import {imageUrl,API_KEY } from '../../constants/constants'
import Youtube from 'react-youtube'

// function RowPost(props) {
//   const [movies,setMovies] = useState()
//   useEffect(()=>{
//     axios.get(props.url).then(response=>{
//         setMovies(response.data)
//     }).catch(err =>{
//       alert('Network Error')
//     })
//   })


//   return (
//     <div className='row'>
//       <h2>{props.title}</h2>
//       <div className='posters'>
     
//       </div>
//     </div>
//   )
// }

// export default RowPost
function RowPost(props) {
  const [movies, setMovies] = useState([])
  const [urlid, setUrlId] = useState('')
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
      axios.get(props.url).then(response=>{
          // console.log(response.data)
          setMovies(response.data.results)
          setLoading(false);
      }).catch(err=>{
          alert(err)
          setLoading(false);
      },[props.url])
  }, [])
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleMovie = (id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
      if(response.data.results.length!=0){
        setUrlId(response.data.results[0])
      }else{
        console.log('Array empty')
        alert('Trailer not available')
        setUrlId(null); 
      }
    }).catch(err => {
      alert("Error fetching the trailer", err);
  });
  }
return (
  <div className='row'>
    <h2>{props.title}</h2>
    <div className='posters'>
    {loading ? <p>Loading...</p> : 
              movies.map((obj) =>
          <img onClick={() =>handleMovie(obj.id) } className={props.isSmall ? 'smallPoster' :'poster'} src={`${imageUrl+obj.backdrop_path}`} alt="poster" />

      )}
    </div>
    { urlid && <Youtube opts={opts} videoId={urlid.key} /> }
  </div>
)
}

export default RowPost
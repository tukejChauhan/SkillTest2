import { useRef } from "react";
import "./AlbumForm.css";



const AlbumForm = ({addAlbum}) =>{
    const albumTitle = useRef();

    const clearName = () => {
        albumTitle.current.value = "";
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        addAlbum(albumTitle.current.value);
        albumTitle.current.value="";
    }


    

    return (<>
    <div class="album-form">
        <span>Create an album</span>
    <form onSubmit={(e) => handleSubmit(e) }  >
        
        <input type="text" placeholder="Album Title" id="album_title" ref={albumTitle} required>
        </input>
        <button onClick={clearName}>Clear</button>
        <button type="submit">Create</button>
    </form>
    </div>
    </>)
}

export default AlbumForm;
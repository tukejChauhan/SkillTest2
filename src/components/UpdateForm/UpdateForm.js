import { useEffect, useRef } from "react";
import "./UpdateForm.css";



const UpdateForm = ({updateAlbum, album}) =>{
    const albumTitle = useRef();

    //providing initial title
    useEffect(() => {
        albumTitle.current.value=album.title;
    },[])

    const clearName = () => {
        albumTitle.current.value = "";
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        updateAlbum(albumTitle.current.value);
        albumTitle.current.value="";
        
    }


    

    return (<>
    <div class="album-form">
        <span>Update album</span>
    <form onSubmit={(e) => handleSubmit(e) }  >
        
        <input type="text" placeholder="Album Title" id="album_title" ref={albumTitle}  required>
        </input>
        <button onClick={clearName}>Clear</button>
        <button type="submit">Update</button>
    </form>
    </div>
    </>)
}

export default UpdateForm;
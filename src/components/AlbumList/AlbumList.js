import './AlbumList.css';

const AlbumList = ({albumList, toggleAlbumForm, albumForm, deleteAlbum, setCurrId, currId, toggleCurrId}) => {

    function handleDelete(e,id){
        e.preventDefault();
        albumList.splice(id-1, 1);
        deleteAlbum(albumList)
    }

    function handleUpdate(e,id){
        e.preventDefault();
        setCurrId(id);
    }

    function handleFormToggle(){
        if(currId){
            toggleCurrId()
        }
        else toggleAlbumForm()
    }
    return(<> 
        <div className="albumlist-top"><h2>Your albums</h2>
      <button className= { albumForm || currId? "active-btn":""} onClick={handleFormToggle}>{ albumForm || currId? "Cancel":"Add album"}</button>
      </div>
        <div className='album-list'>
        {albumList.map((album) => (
                <>
                    <div className="album-card" >
                    <img src="https://stalwart-wisp-382f3c.netlify.app/assets/photos.png" className='album-img'></img>
                    <div className='btns'>
                    <button className='edit_btn' onClick={(e) => {handleUpdate(e,album.id)}}>
                            <img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png"></img></button>
                    <button className='delete_btn' onClick={(e) => {handleDelete(e,album.id)}}>
                        <img src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"></img></button>
                    </div>
                    <span>{album.title}</span>
                    </div>
                </>
            )
        )}
        </div>
    </>)
    
}
export default AlbumList;
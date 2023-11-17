import { useState, useReducer, useEffect } from "react";
import "./App.css";

// components imports
import AlbumForm from "./components/AlbumForm/AlbumForm";
import AlbumList from "./components/AlbumList/AlbumList";
import UpdateForm from './components/UpdateForm/UpdateForm';


// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



//state logic for updating state using reducer
const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "GET_ALBUMS": {
      console.log(payload.albums);
      return{
          ...state,
          albums: payload.albums
      }
    }
    
    case "TOGGLE_ALBUMFORM": {
      return{
        ...state,
        albumForm: !state.albumForm
      }
    }

    case "SET_CURRID": {
      return{
        ...state,
        currId: payload.id
      }
    }

    case "UPDATE_ALBUM": {
      return{
        albums: payload.albums,
        albumForm: false,
        currId: null
      }
    }

    case "DELETE_ALBUM": {
      return{
        ...state,
        albums: payload.albums
      }
    }
    
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { albums: [], albumForm: false, currId: null });


  //getting the albums on mounting
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
  .then((response) => response.json())
  .then((albums) => {
    albums =  albums.slice(0,10);
    dispatch({
      type: "GET_ALBUMS",
      payload: {albums}
    })
  });

  },[]);



  //function to add a new album
  const addAlbum = async (title) => {

    fetch('https://jsonplaceholder.typicode.com/albums', {
  method: 'POST',
  body: JSON.stringify({
    id: ++state.albums.lenght ,
    title: title,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((album) => {
    dispatch({
      type: "GET_ALBUMS",
      payload: {albums: [album, ...state.albums]}
    })
    toast.success("Album added successfully.");
  });
    
  };



  //function to change condition of rendering Album Form
  const toggleAlbumForm = () => {
      dispatch({
        type: "TOGGLE_ALBUMFORM"
      })
    }
     //function to change condition of rendering Album Update Form
    const setCurrId = (id) => {
      dispatch({
        type: "SET_CURRID",
        payload: {id}
      })
    }

    //function to remove any selected album
    const removeCurrId = () =>{
      dispatch({
        type: "SET_CURRID",
        payload: {id: null}
      })
    }

    //function to update albums
    const updateAlbum = (title) => {
      fetch('https://jsonplaceholder.typicode.com/albums/1', {
        method: 'PUT',
        body: JSON.stringify({
          id: state.currId,
          title,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
  .then((response) => response.json())
  .then((album) => {
        let albums = [...state.albums];
        albums[state.currId-1] = album;
        dispatch({
          type: "UPDATE_ALBUM",
          payload: {albums}
        })
        toast.success("Album updated successfully.");
      })
    }

  //function to delete an album
    const deleteAlbum = (albums) => {
      
      fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'DELETE',
      }).then(() => {
        dispatch({
          type: "DELETE_ALBUM",
          payload: {albums}
        })
        toast.success("Album deleted successfully.");
      })
    }



  return (
    <>
      <ToastContainer />
      <div className="App">
      <header>
        <img src="https://stalwart-wisp-382f3c.netlify.app/assets/logo.png" />
        <h2>AlbumApp</h2>
      </header>
      <main>
        {state.albumForm? <AlbumForm addAlbum={addAlbum} />:''}
        {state.currId? <UpdateForm updateAlbum={updateAlbum} album={state.albums[state.currId-1]} />:''}
        <AlbumList 
          albumList={state.albums} 
          toggleAlbumForm={toggleAlbumForm} 
          albumForm={state.albumForm}  
          deleteAlbum={deleteAlbum}
          setCurrId = {setCurrId}
          currId={state.currId}
          toggleCurrId={removeCurrId}/>

      </main>
      </div>
    </>
  );
}

export default App;

import { useDebugValue, useEffect, useRef, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import Header from './Components/Header';
import DisplayUsers from './Components/DisplayUsers/DisplayUsers';
import { userAction } from "./Components/Store/Store";
import { useDispatch } from 'react-redux';




function App() {
  const searchRef = useRef('');

  const dispatch = useDispatch();
  const getUserData = async () => {
    const rawResponse = await fetch("http://localhost:3001/userDetails");
    const response = await rawResponse.json();
    dispatch(userAction.setData(response));
  };
  
  const getUserDataWithTheKey = async(key) => {
    const rawResponse = await fetch(`http://localhost:3001/SearchData/${key}`);
    const response = await rawResponse.json();
    dispatch(userAction.setData(response));
  } 
  const onChangeHandler = () =>{
    if(searchRef.current.value.length<1){
      getUserData();
    }else{
      getUserDataWithTheKey(searchRef.current.value);
    }
  }

  return (
    <>
      <div className='App'>
        <Header title={"C R U D"} color={'#21867e'}/>
        <div className="first-row">
          <Link to='/AddUser' className='add-btn'>Add User</Link>
          <input type="text" ref={searchRef} onChange={onChangeHandler} placeholder='Search...' className='search-input'/>
        </div>
        <div className="second-row">
          <DisplayUsers getUserData={getUserData}/>        
        </div>
      </div>
    </>
  )
}

export default App

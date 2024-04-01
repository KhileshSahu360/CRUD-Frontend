import React, { useRef, useState } from 'react'
import {useNavigate} from 'react-router-dom' 
import './AddUser.css'
import Header from '../Header'
import Loader from '../Loader'; 
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

const AddUser = () => {
  const dispatch = useDispatch();
  const nameRef = useRef('');
  const ageRef = useRef(0);
  const emailRef = useRef('');
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const notify = (msg) => toast.error(msg);
  const successNotify = () => toast.success('Data Inserted Successfully!');

  const submitHandler = async(event) =>{
    event.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const email = emailRef.current.value;
    if(email && age && name){
      setLoading(true);
      try{
        let response = await fetch('http://localhost:3001/AdduserData',{
          method : 'post',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name,age,email})
        })
        response = await response.json();
        console.log(response.exist)
        if(response.exist === true){
          setLoading(false);
          notify('Email Already Exist!')
        }else{
          successNotify();
          setTimeout(()=>{
            navigate('/')
          },1000)
        }
      }
      catch(error){
        console.log(error)
      }
    }else{
      notify('Please fill all the field!');
    }
  }
  return (
    <div className='add-user'>
      <Header title={"Add User"} color={'#52025b'}/>
      <form onSubmit={submitHandler} className="add_user_container">
        <input type="text" ref={nameRef}  placeholder='Name'/>
        <input type="number" ref={ageRef} placeholder='Age'/>
        <input type="email" ref={emailRef} placeholder='Email'/>
        <button type='submit'>{loading?<Loader loading={loading}/>:"Add"}</button>
      </form>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastClassName='custom-toast'
      />
    </div>
  )
}
export default AddUser

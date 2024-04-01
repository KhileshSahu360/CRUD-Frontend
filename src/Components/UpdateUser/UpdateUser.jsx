import React, { useEffect, useRef, useState } from "react";
import Header from "../Header";
import "./UpdateUser.css";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const UpdateUser = () => {
  const { id } = useParams();
  const errorNotify = (msg) => toast.error(msg);
  const successNotify = () => toast.success("Data updated successfully!");

  let tempName;
  let tempAge;
  let tempEmail;
  const nameRef = useRef("");
  const ageRef = useRef(0);
  const emailRef = useRef("");
  const getDataWithId = async () => {
    let response = await fetch(`http://localhost:3001/GetDataWithId/${id}`);
    response = await response.json();
    tempName = nameRef.current.value = response[0].name;
    tempAge = ageRef.current.value = response[0].age;
    tempEmail = emailRef.current.value = response[0].email;
  };
  useEffect(() => {
    getDataWithId();
  }, []);
  
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const submitHandler = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const email = emailRef.current.value;
    if(!(tempName == name) || !(tempAge == age) || !(tempEmail == email)){
      setLoading(true);
      try{
        let response = await fetch(`http://localhost:3001/UpdateUserData/${id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, age, email }),
      });
      response = await response.json();
      successNotify();
      setTimeout(()=>{
        navigate('/');
      },1000)
      
      }
      catch(error){
        console.log(error)
        setLoading(false)
        errorNotify("Data Not update plese try Again!");
      }
    }else{
      errorNotify("Update Atleast One Field!");
    }

  };
  return (
    <div className="update-user">
      <Header title={"Update User"} color={"#035818"} />
      <form onSubmit={submitHandler} className="update_user_container">
        <input type="text" ref={nameRef} />
        <input type="text" ref={ageRef} />
        <input type="text" ref={emailRef} />
        <button type="submit">
          {loading ? <Loader loading={loading} /> : "Update"}
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastClassName="custom-toast"
      />
    </div>
  );
};

export default UpdateUser;

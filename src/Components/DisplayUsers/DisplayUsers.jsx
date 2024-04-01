import React, { useEffect } from "react";
import "./DisplayUsers.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const DisplayUsers = ({getUserData}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    getUserData();
  },[])

  const userData = useSelector((store) => store.users);
  return (
    <>
      <table
        className="table table-bordered border-secondary"
        style={{ borderCollapse: "collapse" }}
      >
        <thead>
          <tr className="bg-dark ">
            <th style={{ color: "white" }}>S.No.</th>
            <th style={{ color: "white" }}>Name</th>
            <th style={{ color: "white" }}>Age</th>
            <th style={{ color: "white" }}>Email</th>
            <th style={{ color: "white" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ?
            userData.map((data, index) => (
              <UserDataInRow
                key={data._id}
                id={data._id}
                name={data.name}
                age={data.age}
                email={data.email}
                index={index}
                getUserData={getUserData}
              />
            )):
              <tr>
                <td colSpan={5} style={{padding:'2rem 0'}}>
                  <h1 style={{color:'red'}}>No Data Found!</h1>
                </td>
              </tr>
            }
        </tbody>
      </table>
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
      />
    </>
  );
};

const UserDataInRow = (props) => {
  const errorNotify = () => toast.error("Data Deletion Failed!");
  const BACKEND_URL = "https://crud-backend-1-7tn7.onrender.com" 

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let response = await fetch(
            `${BACKEND_URL}/DeleteUserData/${id}`,
            {
              method: "delete",
            }
          );
          response = await response.json();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          props.getUserData();
        } catch (error) {
          console.log("catch call ksdfj");
          errorNotify();
        }
      }
    });
  };
  return (
    <>
      <tr>
        <td>{props.index + 1}</td>
        <td>{props.name}</td>
        <td>{props.age}</td>
        <td>{props.email}</td>
        <td>
          <button
            style={{
              background: "red",
              padding: ".2rem .5rem",
              border: "none",
              borderRadius: "3px",
              marginRight: "1rem",
            }}
            onClick={() => handleDelete(props.id)}
          >
            <MdDelete
              fontSize={"1.1rem"}
              color="white"
             
            />
          </button>
          <Link
            to={`/UpdateUser/${props.id}`}
            style={{
              background: "green",
              padding: ".2rem .5rem",
              border: "none",
              borderRadius: "3px",
            }}
          >
            <FaEdit fontSize={"1.1rem"} color="white" />
          </Link>
        </td>
      </tr>
    </>
  );
};

export default DisplayUsers;

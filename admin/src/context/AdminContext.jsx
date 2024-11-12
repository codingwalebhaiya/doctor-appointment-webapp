import { createContext, useState } from "react";
import axios from "axios"
export const AdminContext = createContext();
import {toast} from "react-toastify"

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken')? localStorage.getItem('adminToken'): '' );
  const [doctors,setDoctors] = useState([]);


  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // i am not sending any data in body during taking the all doctors data so add empty object - {}
  const getAllDoctors = async() => {
    try {
      const {data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{adminToken}}) 
      if(data.success){
        setDoctors(data.doctors)
        console.log(data.doctors);
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeAvailability = async (docId) => {

    try {
      const {data} = await axios.post(backendUrl + '/api/admin/change-availability' , {docId}, {headers:{adminToken}})
    if(data.success){
      toast.success(data.message) 
      getAllDoctors()
    } else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;

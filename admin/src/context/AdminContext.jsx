import { createContext, useState } from "react";
import axios from "axios"
import {toast} from "react-toastify"

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken')? localStorage.getItem('adminToken'): '' );
  const [doctors,setDoctors] = useState([]);
  const [appointments,setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false)


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

  const getAllAppointments = async() => {
  try {
    const {data} = await axios.get(backendUrl + '/api/admin/appointments', {headers:{adminToken}})
    
    if(data.success){
      setAppointments(data.appointments);
      console.log(data.appointments);
      
      toast.success(data.message)
    } else {
      toast.error(data.message)
    }
  }
  catch(error) {
    console.log(error);
    toast.error(error.message)
    
  }
  }

  const cancelAppointment = async() => {
    try{
    const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {headers:{adminToken}} );
    if(data.success){
         toast.success(data.message)
         getAllAppointments()
    }else {
      toast.error(data.message)
    }

  } catch (error){
      toast.error(error.message)
  }
  }

  const getDashData = async() => {
    try {
    const {data} = await axios.get(backendUrl+ '/api/admin/dashboard', {headers:{adminToken}})

    if(data.success){
      setDashData(data.dashdata);
    }else {
      toast.error(data.message)
    }
  } catch(error) {
   toast.error(error.message)
} }
 
  const value = {
    adminToken,
    setAdminToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData

  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );




}
export default AdminContextProvider

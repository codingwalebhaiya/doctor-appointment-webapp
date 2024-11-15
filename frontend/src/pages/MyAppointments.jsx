import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
// import {useNavigate} from "react-router-dom"

const MyAppointments = () => {
  //by using this backendUrl, token - we will make the API call and display the appointment data
  const { backendUrl, token ,getDoctorsData} = useContext(AppContext);
  // const navigate = useNavigate()

  // create state variable to store the appointment data
  const [appointments, setAppointments] = useState([]);
  const months = [
    " ",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  };

  // we have to run this function whenever the my appointment space gets loaded
  // so add the useEffect hooks
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        // we will get the appointments in reverse order it means that recent appointment will be displayed at the bottom
        // so get the latest appointment on the top so  we will reverse method
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if(data.success){
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }else {
        toast.error(data.message)
      }

      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

//  const initPay = (order) => {
   
//   const options = {
//     key: import.meta.env.VITE_RAZORPAY_KEY_ID ,
//     amount:order.amount,
//     currency:order.currency,
//     name:'Appointment Payment',
//     description:'Appointment Payment',
//     order_id: 'order.id', // This is the order_id created in the backend
//     receipt: order.receipt,
//     theme: {
//       color: '#F37254'
//     },
//     handler: async (response) => {
//      console.log(response);

//      try {
//       const {data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response , {headers:{token}})

//       if(data.success){
//         getUserAppointments();
//         navigate('/my-appointments')

//       }
//      } catch (error) {
//       console.log(error);
//       toast.error(error.message)
      
//      }
     
//     }
     
//   }

//   const rzp = new window.Razorpay(options);
//   rzp.open()
//  }

  // const appointmentRazorpay = async(appointmentId) => {
  //   try {
  //     const {data} = await axios.post(backendUrl+ '/api/user/payment-razorpay', {appointmentId}, {headers:{token}} );
  //     if(data.success){
  //       initPay(data.order)
        
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error.message)
      
  //   }
  // }

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs ">{item.docData.address.line1}</p>
              <p className="text-xs ">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormate(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div className="flex flex-col gap-2 justify-end">
            {!item.cancelled && item.payment && <button className="sm:min-w-48 py-2 border rounded text-stone-500 bg-indigo-50">Paid</button>  }
            {/* {!item.cancelled  && !item.payment &&  <button 
               onClick={() => appointmentRazorpay(item._id)}
                className="text-sm text-stone-500 text-center 
              sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
              >
                Pay Online
              </button>} */}
              
              {!item.cancelled && <button
                onClick={() => cancelAppointment(item._id)}
                className="text-sm text-stone-500 text-center 
              sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Cancel appointment
              </button> }

              {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">Appointment cancelled</button> }
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;

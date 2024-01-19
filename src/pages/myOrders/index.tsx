import { UserContext } from "@/context/AuthContext"
import { useContext, useEffect, useState } from "react"
import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import BASE_URL from "@/utils/BASE_URL"
import { order, CheckoutItem } from "@/types/types"

function index() {
   const [orders,setOrders] = useState([])
   const {userId} = useContext(UserContext) as {userId: string}
   useEffect(()=>{
    fetch(`${BASE_URL}/auth/user/${userId}`).then(response => response.json())
    .then(data => setOrders(data.orders))
  },[userId])
      

  return (
    <div>
      <Nav/>
     <div className="max-h-screen">

       <h1 className="p-4 text-xl font-bold mr-8">صفحه سفارش‌های من</h1>
 

 {orders ? orders.map((order:order) => (<div key={order._id} className="p-3 m-8 border rounded-md sm:p-6 border-gray-300">
   <div className="flex max-sm:flex-col gap-2">
      {order.lineItems.map((item:CheckoutItem) => (
        <div className="flex flex-col gap-3">
        <div>
        <h3>{item.title} * {item.quantity}</h3>
         <p>تومان{item.price.toLocaleString('fa')}</p>
         <p>{item.color}</p>
        </div>
        </div>
      ))}
      </div>
   <div className="flex flex-row max-md:flex-col gap-3">
    <p>
    {order.fullName}
    </p>
    <p>
    {order.city}
    ,
    {order.streetAddress}
    </p>
    <p>
    {order.phoneNumber}
    </p>
    <p>
    {order.email}
    </p>
    <p>
      جمع کل :{order.amount.toLocaleString('fa')}تومان
    </p>
     </div>  
  <ul
  data-te-stepper-init
  className="relative m-0 flex max-sm:hidden 
  list-none justify-between overflow-hidden p-12 transition-[height] duration-200 ease-in-out">

  <li
    data-te-stepper-step-ref
    data-te-stepper-step-active
    className="w-[4.5rem] flex-auto">
    <div
      data-te-stepper-head-ref
      className="flex cursor-pointer items-center pl-2 leading-[1.3rem] no-underline after:mr-2 after:h-px after:w-full after:flex-1 after:bg-[#e0e0e0] after:content-['']  focus:outline-none">
      <span
        data-te-stepper-head-icon-ref
        className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
        1
      </span>
      <span
        data-te-stepper-head-text-ref
        className="font-medium text-neutral-500 mr-3 after:flex after:text-[0.8rem] after:content-[data-content] ">
        مرحله1
      </span>
    </div>
    <div
      data-te-stepper-content-ref
      className="absolute w-full p-4 transition-all duration-500 ease-in-out">
      خرید
    </div>
  </li>

  <li data-te-stepper-step-ref className="w-[4.5rem] flex-auto">
    <div
      data-te-stepper-head-ref
      className="flex cursor-pointer items-center leading-[1.3rem] no-underline before:mr-2 before:h-px before:w-full before:flex-1 before:bg-rose-600 before:content-[''] after:mr-2 after:h-px after:w-full after:flex-1 after:bg-rose-600 after:content-[''] focus:outline-none">
      <span
        data-te-stepper-head-icon-ref
        className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full text-sm font-medium bg-rose-600 text-white">
        2
      </span>
      <span
        data-te-stepper-head-text-ref
        className="text-neutral-400 mr-3 ml-2 after:flex after:text-[0.8rem] after:content-[data-content]">
        مرحله2
      </span>
    </div>
    <div
      data-te-stepper-content-ref
      className="absolute flex justify-center mx-auto p-4 transition-all duration-500 ease-in-out  text-rose-500">
      ارسال
    </div>
  </li>

   <li data-te-stepper-step-ref className="w-[4.5rem] flex-auto">
    <div
      data-te-stepper-head-ref
      className="flex cursor-pointer items-center pr-2 leading-[1.3rem] no-underline before:ml-2 before:h-px before:w-full before:flex-1 before:bg-[#e0e0e0] before:content-[''] focus:outline-none">
      <span
        data-te-stepper-head-icon-ref
        className="my-6 mr-2 flex h-[1.938rem] w-[1.938rem] items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
        3
      </span>
      <span
        data-te-stepper-head-text-ref
        className="text-neutral-500 mr-3 after:flex after:text-[0.8rem] after:content-[data-content] ">
      مرحله3
      </span>
    </div>
    <div
      data-te-stepper-content-ref
      className="absolute w-full p-4 transition-all duration-500 ease-in-out">
    تحویل
    </div>
  </li>
</ul>  
  
 </div> 
  )) : <p className="flex justify-center items-center mx-auto mt-5">شما هیچ خریدی نکرده اید</p>}
        </div>
    <Footer/>
    </div>
  )  
}

export default index
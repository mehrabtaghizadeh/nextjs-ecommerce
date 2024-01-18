// success http://localhost:3000/success?Authority=000000000000000000000000000001305761&Status=OK
// faild http://localhost:3000/success?Authority=000000000000000000000000000001305792&Status=NOK

import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FaTimesCircle } from "react-icons/fa";
import Link from "next/link";

function index() {

   const router = useRouter()
   const [statusPaid,setStatusPaid] = useState<boolean | null>(null)
   const { Status } = router.query
   useEffect(()=>{
     if(Status === 'OK'){
       setStatusPaid(true)
     }if(Status === 'NOK') {
      setStatusPaid(false)
     }
   },[Status])

   return (
<>
<Nav/>
<div>
      {statusPaid === true ? (
      <div className="bg-white h-screen">
      <div className="bg-white p-12 mt-24  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">انجام شد</h3>
            <p className="text-gray-600 my-2">ممنون از خرید شما</p>
            <p> روز خوبی داشته باشید </p>
            <div className="py-10 text-center">
                <Link
                 href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    برگشت به خانه 
               </Link>
            </div>
        </div>
    </div>
  </div>
      ) : 
      <div className="bg-white h-screen">
      <div className="bg-white p-12 mt-24  md:mx-auto">
         <div className="flex justify-center items-center">
            <FaTimesCircle className="text-red-500 h-16 w-16"/>         
         </div>
        <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">پرداخت انجام نشد!</h3>
            <p className="text-gray-600 my-2">متاسفانه خرید شما کامل نشد</p>
            <p> روز خوبی داشته باشید </p>
            <div className="py-10 text-center">
                <Link href="/" className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    برگشت به خانه
               </Link>
            </div>
        </div>
    </div>
  </div>
      }
    </div>
    <Footer/>
</>
  )
}

export default index
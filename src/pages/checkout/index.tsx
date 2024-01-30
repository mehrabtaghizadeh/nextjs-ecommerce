import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { toast , ToastContainer } from "react-toastify";
import { CheckoutItem } from '@/types/types';
import BASE_URL from "@/utils/BASE_URL";


function index() {

    const [fullName,setFullName] = useState<string>('')
    const [lineItems,setLineItems] = useState()
    const [city,setCity] = useState<string>('')
    const [amount,setAmount] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [phoneNumber,setPhoneNumber] = useState<string>('')
    const [postalCode,setPostalCode] = useState<string>('')
    const [streetAddress,setStreetAddress] = useState<string>('')
    const {userId} = useContext(UserContext) as { userId: string }
    const cart = useSelector((state:any) => state.cart);
    const getTotalPrice = () => {
        return cart.reduce(
            (accumulator:any, item:any) => accumulator + item.quantity * item.price,
            0
            );
        }
        const router = useRouter()
        useEffect(()=>{
            setLineItems(cart)
            let totalPrice = getTotalPrice()
            setAmount(totalPrice)
        },[cart,getTotalPrice])
        
        const checkoutSubmit = () => {
        const data = {phoneNumber,postalCode,streetAddress,userId,city,lineItems,amount,email,fullName}
        console.log(data)
        if(userId === 'undefined'){
         return toast.error('شما در ثبت نام نکرده اید!')
        }
        else{
            fetch(`${BASE_URL}/PaymentRequest`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data =>  {console.log(data);router.push(data)})
        }
      }
  return (
    <>
    <Nav/>
    {/* <!-- wrapper --> */}
    <ToastContainer/>
    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">

        <div className="col-span-8 border border-gray-200 p-4 rounded">
            <h3 className="text-lg font-medium capitalize mb-4">پرداخت</h3>
            <div className="space-y-4">
                    <div>
                        <label className="text-gray-600">نام کامل<span
                                className="text-primary">*</span></label>
                        <input type="text" onChange={(e)=>setFullName(e.target.value)} name="fullName" id="fullName" className="input-box"/>
                </div>
                <div>
                    <label  className="text-gray-600">استان</label>
                    <input type="text" onChange={e => setCity(e.target.value)} name="city" id="city" className="input-box"/>
                </div>
                <div>
                    <label className="text-gray-600">شهر,خیابان,...</label>
                    <input type="text" onChange={e => setStreetAddress(e.target.value)} name="streetAddress" id="streetAddress" className="input-box"/>
                </div>
                <div>
                    <label className="text-gray-600">کد پستی</label>
                    <input type="number" onChange={e => setPostalCode(e.target.value)} name="postalCode" id="postalCode" className="input-box"/>
                </div>
                <div>
                    <label className="text-gray-600">شماره تماس</label>
                    <input type="number" onChange={e => setPhoneNumber(e.target.value)} name="phoneNumber" id="phoneNumber" className="input-box"/>
                </div>
                <div>
                    <label className="text-gray-600">ایمیل</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} name="email" id="email" className="input-box"/>
                </div>
                <button onClick={checkoutSubmit} className="bg-blue-500 py-2 px-6 text-white rounded">تایید</button>
            </div>

        </div>

        <div className="col-span-4 border border-gray-200 p-4 rounded">
            <div className="space-y-2">
                {cart.length === 0 ? <p>سبد خرید شما خالی است</p> : 
                cart.map((item:CheckoutItem) => (
                <div className="flex justify-between">
                    <div>
                        <h5 className="text-gray-800 font-medium">{item.title}</h5>
                        <p className="text-sm text-gray-600">رنگ : {item.color}</p>
                    </div>
                    <p className="text-gray-600">
                    {item.quantity}
                    </p>
                    <p className="text-gray-800 font-medium">{item.price}</p>
                </div>
                ))
                 }

            </div>

            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <p>ارسال</p>
                <p>رایگان</p>
            </div>

            <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                <p className="font-semibold">مجموع قیمت</p>
                <p>{getTotalPrice()}</p>
            </div>



        </div>

    </div>
    {/* <!-- ./wrapper --> */}
    <Footer/>
    </>
  )
}

export default index
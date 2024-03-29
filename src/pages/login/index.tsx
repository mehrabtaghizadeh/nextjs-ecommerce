import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState , useContext } from "react";
import { UserContext } from "@/context/AuthContext";
import BASE_URL from "@/utils/BASE_URL";
import { BarLoader } from "react-spinners"

 function index() {
    const {setUser,setUserId} = useContext(UserContext) as { setUserId: any , setUser: any }
    const router = useRouter()        
    const [loading, setLoading] = useState(false)
    const schema = yup.object().shape({
     email: yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
     password: yup.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد').required('رمز عبور الزامی است'),
   });

   const { register, handleSubmit, formState: { errors } } = useForm({
       resolver: yupResolver(schema),
   });
 
   const onSubmit = (data: any) => {
         setLoading(true)
         fetch(`${BASE_URL}/auth/login`,{
           headers:{'Content-Type': 'application/json'}
           ,method: 'POST',
           credentials:'include',
           body: JSON.stringify(data)
         }).then((res) => res.json()).then((data) =>{
             if(data.success){
            setUser(data.user.username)
            setUserId(data.user._id)
            toast.success('با موفقیت ثبت وارد شدید')
            setLoading(false)
            router.push('/')
           }
       }).catch(() => (
           toast.error('مشکلی پیش آمد!')
   
       ))
        
   };
  return (
    <>
     <Nav/>
     {/* <!-- login --> */}
   <ToastContainer />
    <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl sepahbod uppercase font-medium mb-1">ورود</h2>
            <p className="text-gray-600 sepahbod mb-6 text-sm">
                خوش اومدی
            </p>
            <form onSubmit={handleSubmit(onSubmit)} action="#" method="post" autoComplete="off">
                <div className="space-y-2">
                    <div>
                        <label  className="text-gray-600 mb-2 block">ایمیل</label>
                        <input
                                {...register('email')}
                                type="email" name="email" id="email"
                                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                placeholder="youremail.@domain.com"/>
                    </div>
                    <div>
                        <label  className="text-gray-600 mb-2 block">رمز عبور</label>
                        <input 
                            {...register('password')}
                            type="password" name="password" id="password"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="*******"/>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                </div>

                <div className="mt-4">
                <button type="submit"
                        disabled={loading ? true : false}
                        className="w-full flex justify-center items-center py-2 text-center
                         text-white bg-primary disabled:bg-slate-400 disabled:opacity-65
                         rounded transition">
                        {loading ? <div className="flex h-10 mx-auto w-full justify-center items-center "> <BarLoader color="#ffffff"/> </div>: "ورود"}
                        </button>
                </div>
            </form>

            <p className="mt-4 text-center text-gray-600">اکانت نداری؟<Link href="register"
                    className="text-primary">
                    ثبت نام کن</Link></p>
        </div>
    </div>
    {/* <!-- ./login --> */}
     <Footer/>
    </>
  )
}

export default index
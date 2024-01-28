import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useRouter  } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import Link from "next/link"
import BASE_URL from "@/utils/BASE_URL";
import { BarLoader } from "react-spinners"


function index() {
         const router = useRouter()        
         const [loading, setLoading] = useState(false)
         const schema = yup.object().shape({
          username: yup.string().required('نام کاربری الزامی است'),
          email: yup.string().email('ایمیل معتبر نیست').required('ایمیل الزامی است'),
          password: yup.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد').required('رمز عبور الزامی است'),
          confirm: yup.string().oneOf([yup.ref('password'), ''], 'رمز عبور همخوانی ندارد')
        });

        const { register, handleSubmit, formState: { errors } } = useForm({
            resolver: yupResolver(schema),
        });
      
        const onSubmit = (data:any) => {
               setLoading(true)
              fetch(`${BASE_URL}/auth/register`,{
                headers:{'Content-Type': 'application/json'}
                ,method: 'POST',
                body: JSON.stringify(data)
              }).then((res) => res.json()).then((data) =>{
                if(data.success){
                    setLoading(false)
                    toast.success('با موفقیت ثبت نام شدید')
                    router.push('/login')
                }
            }).catch(() => (
                toast.error('مشکلی پیش آمد!')
        
            ))
             
        };

    return (
    <>
   <Nav/>
   {/* <!-- register --> */}

   <ToastContainer />
   {loading  && toast.loading("در حال ارسال ...")}
    <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase sepahbod font-medium mb-1">ثبت نام</h2>
            <p className="text-gray-600 mb-6 text-sm">
                 ثبت نام به عنوان کاربر جدید
            </p>
            <form  onSubmit={handleSubmit(onSubmit)} action="#" method="post" autoComplete="off">
                <div className="space-y-2">
                    <div>
                        <label className="text-gray-600 mb-2 block">نام کاربری</label>
                        <input 
                            {...register('username')}
                            type="text" name="username" id="username"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="fulan fulana"/>
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">ایمیل</label>
                        <input 
                           type="email" id="email"
                            {...register('email')}
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="youremail.@domain.com"/>
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">رمز عبور</label>
                        <input 
                           {...register('password')}
                            type="password" name="password" id="password"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="*******"/>
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label className="text-gray-600 mb-2 block">تایید رمز عبور</label>
                        <input type="password"
                        {...register('confirm')}
                        name="confirm" id="confirm"
                            className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                            placeholder="*******"/>
                    {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm.message}</p>}
                    </div>
                </div>
                <div className="mt-4">
                    <button type="submit"
                        disabled={loading ? true : false}
                        className="w-full flex justify-center items-center py-2 text-center
                        text-white bg-primary disabled:bg-slate-400 disabled:opacity-65
                        rounded transition">
                        {loading  ? <div className="flex h-10 mx-auto w-full justify-center items-center "> <BarLoader color="#ffffff"/> </div>: "ثبت نام"}
                        </button>
                </div>
            </form>

            {/* <!-- login with --> */}
            {/* <div className="mt-6 flex justify-center relative">
                <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">Or signup with</div>
                <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div className="mt-4 flex gap-4">
                <a href="#"
                    className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700">facebook</a>
                <a href="#"
                    className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500">google</a>
            </div> */}
            {/* <!-- ./login with --> */}

            <p className="mt-4 text-center text-gray-600">اکانت داری؟ <Link
             href="/login" className="text-primary">ورود</Link></p>
        </div>
    </div>
    {/* <!-- ./login --> */}
   <Footer/>
    </>
  )
}

export default index
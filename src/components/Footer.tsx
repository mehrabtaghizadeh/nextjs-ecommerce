import { FaFacebook , FaTelegram , FaInstagram , FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import { LinearProgress } from "@mui/material";

function Footer() {
  return (
    <>

  {/* <!-- footer --> */}
  <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
        <div className="container grid grid-cols-1 ">
            <div className="col-span-1 space-y-4">
                <img src="/images/logo.png" alt="logo" className="w-16"/>
                <div className="mr-2">
                </div>
                <div className="flex gap-3 my-3">
                    <a href="#" className="text-gray-400 hover:text-gray-500 w-4"><FaFacebook /></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500 w-4"><FaInstagram /></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500 w-4"><FaWhatsapp /></a>
                    <a href="#" className="text-gray-400 hover:text-gray-500 w-4"><FaTelegram/></a>
                </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">دسترسی سریع</h3>
                        <div className="mt-4 space-y-4">
                            <Link href="/" className="text-base text-gray-500 hover:text-gray-900 block">خانه</Link>
                            <Link href="/products" className="text-base text-gray-500 hover:text-gray-900 block">فروشکاه</Link>
                            <Link href="/register" className="text-base text-gray-500 hover:text-gray-900 block">ثبت نام</Link>
                            <Link href="/login" className="text-base text-gray-500 hover:text-gray-900 block">ورود</Link>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">دسترسی به ما</h3>
                        <div className="mt-4 space-y-4">
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">سوالات متداول</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">ارتباط با ما</a>
                            <a href="#" className="text-base text-gray-500 hover:text-gray-900 block">درباره ما</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    {/* <!-- ./footer --> */}

    {/* <!-- copyright --> */}
    <div className="bg-gray-800 py-4">
        <div className="container flex items-center justify-center">
            <p className="text-white">&copy; محراب تقی زاده _ تمام حقوق محفوظ است</p>
        </div>
    </div>
    {/* <!-- ./copyright --> */}
    </>
  )
}

export default Footer
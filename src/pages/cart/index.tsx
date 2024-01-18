import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, } from '../../redux/cart.slice';
import Link from "next/link";
import { cart } from "@/types/types";
function index() {

  const cart = useSelector((state:any) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator:any, item:any) => accumulator + item.quantity * item.price,
      0
    ).toLocaleString();

  };
  return (
    <>
      <Nav />
      <section className="py-24 bg-gray-100 font-poppins ">

        {cart.length === 0 ?        
          <h3 className="text-center font-bold text-red-500">سبد خرید شما خالی است</h3>    
          : 
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div>
            <h2 className="mb-8 text-4xl font-bold">سبد خرید شما</h2>
            <div className="p-6 mb-8 border bg-gray-50 ">
              <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
                <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                  <h2 className="font-bold text-gray-500">نام محصول</h2>
                </div>
                <div className="hidden px-4 lg:block lg:w-2/12">
                  <h2 className="font-bold text-gray-500">قیمت</h2>
                </div>
                <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500">تعداد</h2>
                </div>
                <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500">رنگ</h2>
                </div>
              </div>
              {cart.map((item:cart) => (
              <div className="py-4 mb-8 border-t border-b border-gray-200 ">
                <div className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8">
                  <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                    <div className="flex flex-wrap items-center -mx-4">
                      <div className="w-full px-4 mb-3 md:w-1/3">
                        <div className="w-full h-96 md:h-24 md:w-24">
                          {item.images[0].map((image:any) => (
                            <img src={image.url} alt=""className="object-cover w-full h-full"/>
                          ))}
                          
                        </div>
                      </div>
                      <div className="w-2/3 px-4">
                        <h2 className="mb-2 text-xl font-bold ">{item.title}</h2>
                        {/* <p className="text-gray-500 ">Picture frame</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="hidden px-4 lg:block lg:w-2/12">
                    <p className="text-lg font-bold text-blue-500">{item.price}</p>
                    {/* <span className="text-xs text-gray-500 line-through ">
                      $1500
                    </span> */}
                  </div>
                  <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                    <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md ">
                      <button className="py-2 hover:text-gray-700" onClick={() => dispatch(decrementQuantity(item.id))}>
                         -
                      </button>
                      <input
                        type="number"
                        className="w-12 px-2 py-4 text-center border-none rounded-md"
                        value={item.quantity}
                      />
                      <button className="py-2 hover:text-gray-700 " onClick={() => dispatch(incrementQuantity(item.id))}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                    <p className="text-lg font-bold text-blue-500 ">{item.color}</p>
                  </div>

                
                </div>
              </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full px-4 mb-4 lg:w-1/2 ">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-gray-700 ">کد تخفیف</span>
                  <input
                    type="text"
                    className="w-full px-8 py-4 font-normal placeholder-gray-400 border lg:flex-1"
                    placeholder="x304k45"
                    
                  />
                  <button className="inline-block w-full px-8 py-4 font-bold text-center text-gray-100 bg-blue-500 rounded-md lg:w-32 hover:bg-blue-600">
                    تایید
                  </button>
                </div>
              </div>
              <div className="w-full px-4 mb-4 lg:w-1/2 ">
                <div className="p-6 border border-blue-100  bg-gray-50 md:p-8">
                  <h2 className="mb-8 text-3xl font-bold text-gray-700 ">
                 سبد خرید ما
                  </h2>
                  <div className="flex items-center justify-between pb-4 mb-4 ">
                    <span className="text-gray-700 ">ارسال</span>
                    <span className="text-xl font-bold text-gray-700 ">
                      رایگان
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-4 mb-4 ">
                    <span className="text-gray-700 ">مجموع قیمت</span>
                    <span className="text-xl font-bold text-gray-700 ">
                    {getTotalPrice()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between ">
                    <Link href="/checkout" className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600">
                      ادامه
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    }
      </section>
      <Footer />
    </>
  );
}

export default index;
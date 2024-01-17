import { FaStar } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice'
import Link from "next/link";
function Card({product}:any) {    

  const dispatch = useDispatch();
    
    return (
    <>
            <div className="bg-white shadow rounded overflow-hidden group">
                <div className="relative">
                    {product?.images[0].map((image:any) =>(
                        <img src={image.url} crossOrigin="anonymous" alt="product 1" className="h-72 w-full"/>
                    ))}
                </div>
                <div className="py-4  px-4">
                    <Link href={`/products/product/${product._id}`} prefetch={true} passHref>
                        <h4 className="font-bold text-xl mb-2 text-gray-800 transition">{product.title}</h4>
                    </Link>
                    <div className="flex items-baseline mb-1 space-x-2">
                        <p className="text-xl text-primary font-semibold">{product.price.toLocaleString()} تومان</p>
                    </div>
                    <div className="flex items-center">
                        <div className="flex gap-1 text-sm text-yellow-400">
                        <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaStar />
                        </div>
                        <div className="text-xs text-gray-500 ml-3">(150)</div>
                    </div>
                </div>
                <button 
                onClick={() => dispatch(addToCart({product,price:product.price,title:product.title,images:product.images}))}
                className="flex p-2 justify-center w-full  text-white bg-rose-500 rounded cursor-pointer">
                افزودن به سبد خرید                
                </button>
            </div>
    </>
  )
}

export default Card
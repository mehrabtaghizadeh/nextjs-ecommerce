import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cart.slice'
import { useState } from "react";
import {CheckboxGroup} from "@nextui-org/react";
import { CustomCheckbox } from "@/components/CustomCheckBox";
import _  from 'lodash';
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { product, properties } from "@/types/types";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import BASE_URL from "@/utils/BASE_URL";

function index({product}:any) {

    const [groupSelected, setGroupSelected] = useState('');

    const dispatch = useDispatch();
    // const cart = useSelector((state:any) => state.cart);
    const mainImg = product?.map((pro:any) => pro.images[0].map((image:any) => {return image.url}))
    const [activeImage , setActiveImage] = useState(mainImg)
    
    // Getting the count of items
    return (
 <>
    <Nav/>
            {/* <!-- breadcrumb --> */}
            {product?.map((item:any) =>(
    <div className="container py-4 flex items-center gap-3 -z-50">
        <Link href="/" className="text-primary text-base">
        <AiFillHome />
        </Link>
        <span className="text-sm text-gray-400">
        <MdArrowBackIos />
        </span>
        <Link href="/products" className="text-gray-600 font-medium">فروشگاه</Link>
        <span className="text-sm text-gray-400">
        <MdArrowBackIos />
        </span>
        <p className="text-gray-600 font-medium">{item.title}</p>

    </div>
            ))}
    {/* <!-- ./breadcrumb --> */}
       {product?.map((pro: product) => (
        <section className="overflow-hidden bg-white py-11">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full mb-8 md:w-1/2 md:mb-0">
                    <div className="sticky top-0  overflow-hidden ">
                        <div className="relative -z-50 mb-6 lg:mb-10 lg:h-2/4 ">
                                <img src={activeImage} alt="" className="-z-50 object-cover w-full lg:h-full "/>        
                        </div>
                        <div className="flex-wrap hidden md:flex -z-50">
                            {pro.images?.map((image: any[]) => (
                                image.map(imag => (
                            <div className="w-1/2 p-2 sm:w-1/4">
                                <button className="block border border-gray-300 p-2 rounded" onClick={() => setActiveImage(imag.url)}>
                                    <img src={imag.url} alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </button>
                            </div>  
                                ))
                                ))}
                        </div>
                        <div className="px-6 pb-6 mt-6 border-t border-gray-300 ">
                            <div className="flex flex-wrap gap-3 items-center mt-6">
                                <p className="mr-2 text-4xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                                        className="w-10 h-10 text-gray-700 dark:text-gray-400 bi bi-truck"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z">
                                        </path>
                                    </svg>
                                </p>
                                <h2 className="text-lg font-bold text-gray-700">ارسال رایگان</h2>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="w-full px-4 md:w-1/2 ">
                    <div className="lg:pl-20">
                        <div className="mb-8 ">
                            <h2 className="max-w-xl mb-6 text-2xl font-bold md:text-4xl">
                                {pro.title}</h2>
                            <p className="inline-block mb-6 text-4xl font-bold text-gray-700  ">
                                <span>{pro.price}</span>
                            </p>
                            <p className="max-w-md text-gray-700 ">
                             {pro.description}
                            </p>
                        </div>
   
                        <div className="flex flex-col mb-8 ">
                            {pro.properties.map((pro:properties) => (
                               <> 
                            <h2
                                className="w-fit pb-1 mb-4 text-xl font-semibold border-b border-blue-300 ">
                                {pro.name}</h2>
                            <div>
                                <div>
                                    <div className="flex gap-2 p-5">
                                    



                                    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">رنگ ها</FormLabel>
      <RadioGroup
        row
        value={groupSelected}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={e => setGroupSelected(e.target.value)}
      >
        {pro.values.map((value: any[]) => value.map((v: any) => (
        <FormControlLabel value={v} control={<Radio />} label={v} />
         )))}

      </RadioGroup>
    </FormControl>
                                    {/* <CheckboxGroup
                                       className="gap-1"
                                       orientation="horizontal"
                                       value={groupSelected}
                                    //    onChange={(e: FormEventHandler<HTMLDivElement> | ((value: string[]) => void)) => setGroupSelected(e as string[])}
                                    //    onChange={setGroupSelected}
                                     >
                                 {pro.values.map((value: any[]) => value.map((v: any) => (
                                   <CustomCheckbox onChange={setGroupSelected} value={v}>{v}</CustomCheckbox>
                                 )))}
                                 </CheckboxGroup> */}
                                 </div>
                                 </div>

                                </div>
                            
                               </>
                            ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <button onClick={() => dispatch(addToCart({product,color:groupSelected,price:pro.price,title:pro.title,images:pro.images}))}
                                className="w-full p-4 bg-blue-500 rounded-md lg:w-2/5  text-gray-50 hover:bg-blue-600 ">
                                افزودن به سبد خرید</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
       ))}  
   
   <Footer/>
 </>
    
  )
}

export default index

export async function getServerSideProps(cxt: { query: { id: any } }) {
    // Fetch data from an API
    const {id} = cxt.query
    const rse = await fetch(`${BASE_URL}/products/one/${id}`);
     const product = await rse.json()
     console.log(product)
     return {
      props: { product }
    };
  }
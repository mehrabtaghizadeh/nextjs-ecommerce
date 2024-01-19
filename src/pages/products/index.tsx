import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Card from "@/components/Card"
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import _ from "lodash";
import { useState , useEffect, useCallback } from "react";
import { GoArrowUpRight } from "react-icons/go";
import {Drawer}  from "@mui/material"
import { FiArrowDownLeft } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import { cat } from "@/types/types";
import { numberToWords } from "@persian-tools/persian-tools";
import BASE_URL from "@/utils/BASE_URL";
import Head from "next/head";

function index({products,categories}:any) { 
   const [open, setOpen] = useState(false);
   const [category,setCategory] = useState<string>('')
   const [minPrice, setMinPrice] = useState<string>('');
   const [maxPrice, setMaxPrice] = useState<string>('');
   const [filteredProducts, setFilteredProducts] = useState<any>([]);

   useEffect(() => {
    // اعمال فیلترها هنگامی که تغییری در دسته‌بندی یا بازه قیمت‌ها اتفاق می‌افتد
    let filtered = _.filter(products, (product) => {
      const hasCategory = product.category && product.category.name;
      const categoryFilter = !category || (hasCategory && hasCategory === category);
      const priceFilter =
        (!minPrice || product.price >= +minPrice) &&
        (!maxPrice || product.price <= +maxPrice);
      
      // افزودن شرط بررسی عدم انتخاب دسته‌بندی
      const noCategoryFilter = !category && !hasCategory;

      return (categoryFilter || noCategoryFilter) && priceFilter;
    });
  
    if (minPrice || maxPrice) {
      filtered = _.orderBy(filtered, ["price"], ["asc"]);
    }
  
    setFilteredProducts(filtered);
  }, [category, minPrice, maxPrice, products]);
  
  const sortAsc = useCallback(() => {
    const sortedProducts = _.orderBy(filteredProducts, ["price"], ["asc"]);
    setFilteredProducts(sortedProducts);
  }, [filteredProducts]);

  const sortDesc = useCallback(() => {
    const sortedProducts = _.orderBy(filteredProducts, ["price"], ["desc"]);
    setFilteredProducts(sortedProducts);
  }, [filteredProducts]);
  
  return (
    <>
        <Head>
        <title>فروشگاه مبلمان | محصولات با کیفیت با قیمت مناسب</title>
        <meta
          name="description"
          content="خرید آنلاین مبلمان با کیفیت و طراحی‌های مدرن. دسته بندی بر اساس نیازهای شما. قیمت مناسب و ارسال به سراسر ایران."
        />
        <meta name="keywords" content="مبلمان، خرید آنلاین، دسته بندی مبلمان، قیمت مبلمان" />
        <meta name="author" content="نام نویسنده یا نام شرکت" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="فروشگاه مبلمان | محصولات با کیفیت با قیمت مناسب" />
        <meta
          property="og:description"
          content="خرید آنلاین مبلمان با کیفیت و طراحی‌های مدرن. دسته بندی بر اساس نیازهای شما. قیمت مناسب و ارسال به سراسر ایران."
        />
        <meta property="og:image" content="آدرس تصویر اشتراک‌گذاری" />
        <meta property="og:url" content="آدرس صفحه" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="فروشگاه مبلمان | محصولات با کیفیت با قیمت مناسب"
        />
        <meta
          name="twitter:description"
          content="خرید آنلاین مبلمان با کیفیت و طراحی‌های مدرن. دسته بندی بر اساس نیازهای شما. قیمت مناسب و ارسال به سراسر ایران."
        />
        <meta name="twitter:image" content="آدرس تصویر توییتر" />

        {/* Canonical URL */}
        <link rel="canonical" href="آدرس صفحه" />
      </Head>
     <Nav/>
     {/* <!-- breadcrumb --> */}
    <div className="container py-4 flex items-center gap-2">
        <Link href="/" className="text-primary text-base">
        <AiFillHome />
        </Link>
        <span className="text-sm text-gray-400">
        <MdArrowBackIos />
        </span>
        <Link href="/products" className="text-gray-600 font-medium">فروشگاه</Link>

    </div>
    {/* <!-- ./breadcrumb --> */}

    {/* <!-- shop wrapper --> */}
    <div className="container flex justify-between gap-4">
        {/* <!-- sidebar --> */}
        {/* <!-- drawer init and toggle --> */}

        <button onClick={() => setOpen(true)} className="hidden h-fit top-0 w-fit items-start text-blue-500 max-md:flex"><BiSort /></button>
  {/* <!-- drawer component --> */}
      <Drawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
      <div className="px-4 pb-6 shadow rounded  md:block">
            <div>
                <div className="p-4">
                    <h3 className="text-xl text-gray-800 mb-3 sepahbod uppercase font-medium">دسته بندی ها</h3>
                    <div className="space-y-2">
                        {categories.map((category:cat) => (
                        <div className="flex items-center">
                            <input type="checkbox"
                            value={category.name}
                            onChange={e => setCategory(e.target.value)}
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>
                            <label className="text-gray-600 ml-3 mr-2 cusror-pointer">{category.name}</label>
                        </div>
                        ))}

                    </div>
                </div>


                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">قیمت</h3>
                    <div className="mt-4 flex items-center">
                        <input type="number" name="min" id="min"
                            onChange={e => setMinPrice(e.target.value)}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="حداقل"/>
                        <span className="mx-3 text-gray-500">-</span>
                        <input type="number" name="max" id="max"
                            onChange={e => setMaxPrice(e.target.value)}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="حداکثر"/>
                    </div>
                    <p>
                             {minPrice ? "حداقل : " + numberToWords(minPrice) + " تومان "  : "" } 
                    </p>
                    <p>
                            {maxPrice ? "تا حداکثر" + numberToWords(maxPrice) + " تومان "  : "" }
                    </p>
                </div>

            </div>
        </div>
      </Drawer>


        {/* <!-- ./sidebar --> */}
        <div className="bg-white px-4 h-fit pb-6 shadow rounded overflow-hidden hidden md:block">
            <div className="divide-y divide-gray-200 space-y-5">
                <div>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">دسته بندی ها</h3>
                    <div className="space-y-2">
                        {categories.map((cate:cat) => (
                        <div className="flex items-center">
                            <input type="checkbox"
                            value={cate?.name}
                            onChange={e => setCategory(e.target.value)}
                            className="text-primary focus:ring-0 rounded-sm cursor-pointer"/>
                            <label className="text-gray-600 ml-3 mr-2 cusror-pointer">{cate?.name}</label>
                        </div>
                        ))}

                    </div>
                </div>


                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">قیمت</h3>
                    <div className="mt-4 flex items-center">
                        <input type="number" name="min" id="min"
                            onChange={e => setMinPrice(e.target.value)}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="حداقل"/>

                        <span className="mx-3 text-gray-500">-</span>
                        <input type="number" name="max" id="max"
                            onChange={e => setMaxPrice(e.target.value)}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="حداکثر"/>
                    </div>  
                    <p>
                             {minPrice ? "حداقل : " + numberToWords(minPrice) + " تومان "  : "" } 
                    </p>
                    <p>
                            {maxPrice ? "تا حداکثر" + numberToWords(maxPrice) + " تومان "  : "" }
                    </p>
                </div>

            </div>
        </div>
        {/* <!-- products --> */}
        <div className="col-span-3 max-lg:col-span-2 max-md:col-span-2 max-sm:col-span-1">
            <div className="flex items-center mb-4 gap-2">

                    <button className="text-sm p-2 flex gap-1 items-center rounded border border-gray-200" onClick={()=> sortAsc()}>
                      کمترین به بیشترین
                    <GoArrowUpRight className="bg-blue-500 text-white rounded-full p-1 text-3xl"/> 
                        </button>
                    <button  className="text-sm p-2 flex gap-1 items-center rounded border border-gray-200" onClick={()=> sortDesc()}>
                        بیشترین به کمترین
                        <FiArrowDownLeft className="bg-blue-500 text-white rounded-full p-1 text-3xl"/>
                    </button>


            </div>

            <div className="grid grid-cols-3 max-lg:gap-4 max-sm:grid-cols-1 max-lg:grid-cols-3 max-md:grid-cols-2 gap-6">
            {filteredProducts?.map((product:any) => (
              <div>
                <Card product={product}/>
              </div>
         ))}            
         </div>
        </div>

        {/* <!-- ./products --> */}
    </div>
    {/* <!-- ./shop wrapper --> */}


    <Footer/>
    </>
  )
}

export default index


export async function getServerSideProps(cxt:any) {
    // Fetch data from an API
    const res = await fetch(`${BASE_URL}/products/all`);
    const products = await res.json()
    const resp = await fetch(`${BASE_URL}/cat/all`);
    const categories = await resp.json()
    // Return the data as props
    return {
      props: { products , categories },
    };
  }
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Card from "@/components/Card"
import Link from "next/link"
import { MdArrowBackIos } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import _ from "lodash";
import { useState , useEffect } from "react";
import { GoArrowUpRight } from "react-icons/go";
import {Drawer,Button}  from "@mui/material"
import { FiArrowDownLeft } from "react-icons/fi";
import { BiSort } from "react-icons/bi";
import { cat } from "@/types/types";
import { numberToWords } from "@persian-tools/persian-tools";
function index({products,categories}:any) { 
   const [open, setOpen] = useState(false);
   const [category,setCategory] = useState()
   const [minPrice, setMinPrice] = useState();
   const [maxPrice, setMaxPrice] = useState();
   const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // اعمال فیلترها هنگامی که تغییری در دسته‌بندی یا بازه قیمت‌ها اتفاق می‌افتد
    let filtered = _.filter(products, (product) => {
      let categoryFilter = !category || product.category?.name === category;
      const priceFilter =
        (!minPrice || product.price >= parseInt(minPrice)) &&
        (!maxPrice || product.price <= parseInt(maxPrice));
      return categoryFilter && priceFilter;
    });
    if (minPrice || maxPrice) {
        filtered = _.orderBy(filtered, ["price"], ["asc"]);
      }
    
    setFilteredProducts(filtered);
  }, [category, minPrice, maxPrice, products]);
  const sortAsc = () => {
    const sortedProducts = _.orderBy(filteredProducts, ["price"], ["asc"]);
    setFilteredProducts(sortedProducts);
  };

  const sortDesc = () => {
    const sortedProducts = _.orderBy(filteredProducts, ["price"], ["desc"]);
    setFilteredProducts(sortedProducts);
  };
  return (
    <>
     <Nav/>
     {/* <!-- breadcrumb --> */}
    <div className="container py-4 flex items-center gap-3">
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
    <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        {/* <!-- sidebar --> */}
        {/* <!-- drawer init and toggle --> */}

        <Button onClick={() => setOpen(true)} className="hidden w-fit text-blue-500 max-md:flex"><BiSort /></Button>
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
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
            <div className="divide-y divide-gray-200 space-y-5">
                <div>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">دسته بندی ها</h3>
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
        {/* <!-- products --> */}
        <div className="col-span-3 max-md:col-span-2 max-sm:col-span-1">
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

            <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {filteredProducts.map(product => (
              <Card product={product}/>
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
    const res = await fetch('http://localhost:4000/api/v1/products/all');
    const products = await res.json()
    const resp = await fetch('http://localhost:4000/api/v1/cat/all');
    const categories = await resp.json()
    // Return the data as props
    return {
      props: { products , categories },
    };
  }
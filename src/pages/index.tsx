import Card from '@/components/Card';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav'
import BASE_URL from '@/utils/BASE_URL';
import { cat } from '@/types/types';
import Link from 'next/link';
import Head from 'next/head';
export default function Home({products , categories}:any) {
  return (
 <>
 <Head>
  <title>شاپلند</title>
  <meta name="description" content="خانه خود را به دنیایی از زیبایی و راحتی تبدیل کنید. مبلمان با کیفیت، ارسال به سراسر ایران و خرید مستقیم از کارخانه. انتخاب از بین متنوع‌ترین رنگ‌ها و پارچه‌ها." />
  <meta name="keywords" content="مبلمان، خانه، راحتی" />
  <meta name="author" content="محراب تقی زاده" />
</Head>
  <Nav/>
  {/* <!-- banner --> */}
    <div className="bg-cover object-cover m-0 bg-no-repeat bg-center py-36 bg-[url('/images/banner-bg.jpg')]">
        <div className="container">
            <h1 className="text-6xl ml-4 sepahbod max-lg:text-4xl max-md:text-3xl max-sm:text-2xl text-gray-700 text-left mb-4 capitalize">
            شیک و راحت بودن <br /> در یکجا
            </h1>
            <p className='text-left ml-4 font-bold'>
            کیفیتی که خانه‌تان را تغییر می‌دهد، طراحی که به راحتی دلپذیر می‌شود، تنوعی که هر سلیقه‌ای را جذب می‌کند. <br /> خانه شما، با مبلمان ما، به دنیایی از راحتی و شکوه تبدیل می‌شود
            </p>
                <p className='mt-12 text-left'>
                <a href="#" className="bg-rose-500 border border-rose-500
                    text-white px-8 py-3 font-bold 
                    rounded-md hover:bg-transparent hover:text-primary">سفارش بده</a>
                </p>
            
        </div>
    </div>
    {/* <!-- ./banner --> */}

    {/* <!-- features --> */}
    <div className="container py-16">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
            <div className="px-3 py-6 flex justify-center items-center gap-5">
                <img src="./images/icons/delivery-van.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize sepahbod text-lg">ارسال به سراسر ایران</h4>
                    <p className="text-gray-500 text-sm">تحویل محصول درب منزل</p>
                </div>
            </div>
            <div className="px-3 py-6 flex justify-center items-center gap-5">
                <img src="./images/icons/money-back.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize sepahbod text-lg">از کارخانه به خانه</h4>
                    <p className="text-gray-500 text-sm">خرید مستقیم از کارخانه</p>
                </div>
            </div>
            <div className="px-3 py-6 flex justify-center items-center gap-5">
                <img src="./images/icons/service-hours.svg" alt="Delivery" className="w-12 h-12 object-contain"/>
                <div>
                    <h4 className="font-medium capitalize text-lg sepahbod">انتخاب پارچه و رنگ</h4>
                    <p className="text-gray-500 text-sm">تنوع انتخاب در رنگ و پارچه</p>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- ./features --> */}


    {/* <!-- categories --> */}
    <div className="container py-16">
        <h2 className="text-2xl font-medium sepahbod text-gray-800 uppercase mb-6">خرید بر اساس دسته بندی</h2>
        <div className="grid grid-cols-3 gap-3 max-sm:grid-cols-2">
            {categories?.map((cat:cat) => (
            <div className="relative rounded-sm overflow-hidden group">
               {cat.images[0].map((img:any) => (
                   <img src={img.url} alt="category 1" className="w-full rounded"/>
                      ))}      
                <Link href={`/cat/${cat.name}`} passHref 
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                        {cat.name}
                    </Link>
            </div>
            ))}

        </div>
    </div>
    {/* <!-- ./categories --> */}

      
    {/* <!-- ads --> */}
    <div className="container pb-16">
        <a href="#">
            <img src="./images/offer.jpg" alt="ads" className="w-full"/>
        </a>
    </div>
    {/* <!-- ./ads -->  */}


    {/* <!-- product --> */}
    <div className="container pb-16">
        <h2 className="text-2xl font-bold sepahbod text-gray-700 mb-6">جدید ترین محصولات</h2>
        <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:gap-4 max-sm:grid-cols-1 max-lg:grid-cols-3 max-md:grid-cols-2 gap-6">

         {products?.map((product:any) => (
            <div>
            <Card product={product}/>
            </div>
             ))}
            
        </div>
    </div>
    {/* <!-- ./product --> */}

  <Footer/>
 </>
  )
}

export async function getServerSideProps(cxt:any) {
    // Fetch data from an API
    const response = await fetch(`${BASE_URL}/products/all`);
    const products = await response.json();
    const res = await fetch(`${BASE_URL}/cat/all`);
    const categories = await res.json()
    // Return the data as props
    return {
      props: { products  , categories},
    };
  }
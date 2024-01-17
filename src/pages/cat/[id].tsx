import React from 'react'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import Card from '@/components/Card'
import { cat } from '@/types/types'
import BASE_URL from '@/utils/BASE_URL'
function index({Catproduct}:any) {
  return (
    <>
    <Nav/>
    <div className='p-4'>

    {Catproduct.map((cat:cat) => (
      <>
      <h3 className=''>جستجو برای دسته بندی : {cat.name}</h3>
      <div className='grid gap-2 grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 '>
       {cat.products?.map((product: any) => (
        <Card product={product}/>
       ))}
      </div>
      </>
      ))}
    
    </div>
    <Footer/>

    </>
  )
}

export default index

export async function getServerSideProps(cxt) {
  // Fetch data from an API
  const {id} = cxt.query
  const res = await fetch(`${BASE_URL}/cat/catPage?category=${id}`); 
  const Catproduct = await res.json()
  console.log(Catproduct)
  return {
    props: { Catproduct },
  };
}
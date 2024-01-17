export type CheckoutItem = {
      color: string,
      title:string
      price:number,
      quantity:number
  }
export type cat = {
      [x: string]: any
      name:string,
      products:[]
}
export type order = {
      color: string,
      title:string
      price:number,
      quantity:number,
      fullName:string,
      city:string,
      phoneNumber:number,
      lineItems:[]
      streetAddress:string,
      postalCode:string,
      email:string,
      amount:number,
      _id:string
} 

export type cart = {
      title:string,
      color:string,
      price:number,
      images:any,
      quantity:number,
      id:string
} 

export type product = {
      title: string ,
      price: number ,
      description: string ,
      images: [],
      properties: []
} 

export type properties = {
      name: string,
      values : []
} 


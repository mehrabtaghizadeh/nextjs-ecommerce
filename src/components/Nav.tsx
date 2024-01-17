import { useState , useContext } from "react";
import Link from 'next/link';
import {Navbar, Badge , NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle , NavbarMenu , NavbarMenuItem} from "@nextui-org/react";
import { GrBasket } from "react-icons/gr";
import { CiUser } from "react-icons/ci";
import { useSelector } from 'react-redux';
import {Dropdown , Button , DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import { UserContext } from "@/context/AuthContext";


export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

      const {user} = useContext(UserContext)
  // Selecting cart from global state
const cart = useSelector((state:any) => state.cart);

// Getting the count of items
const getItemsCount = () => {
  return cart.reduce((accumulator:any, item:any) => accumulator + item.quantity, 0);
};


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="z-50 sepahbod">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="flex gap-2 justify-center items-center">
          <img src="/images/logo.png" className="w-8 h-8 mb-2 rounded-full" alt="logo"/>
          <p className="font-bold text-inherit">شاپلند</p>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            خانه
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/products">
            فروشگاه
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <Link href="/cart">
            <Badge content={getItemsCount()} className="mt-1">
             <GrBasket className="h-6 w-6 text-rose-500"/>
             </Badge>
          </Link>
        </NavbarItem>
        <NavbarItem>
        {user ? 
              <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered" 
                  className='hover:text-blue-400'
                >
                  {user}
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Action event example" 
              >
                <DropdownItem key="new"><Link href="/myOrders">سفارش های من</Link></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          :
          <Link href="/register">
            <CiUser className="h-8 w-8 text-blue-500 font-bold"/>
          </Link>
          }
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
      <NavbarMenuItem>
      <Link href="/">
        خانه 
      </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
      <Link href='/products'>
        فروشگاه
      </Link>
      </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

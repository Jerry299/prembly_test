import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";
const Navbar = () => {
  const cartCount = useSelector((state: any) => state.cart.cartItems.length);
  return (
    <nav className="bg-[#F8F8FC] p-4 flex justify-between items-center border-b border-[#CFCFD0]">
      <h1 className="text-2xl font-medium bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        The Store
      </h1>
      <div className="pr-7 flex justify-center cursor-pointer">
        <NavLink to="/cart" className="mx-4 text-lg text-[#676E76] flex">
          <FiShoppingCart color="#676E76" size={44} />
          <div className="pl-2 text-[#F3000B] w-[20%] ">
            <span className="text-bold">{cartCount}</span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

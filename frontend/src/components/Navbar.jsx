import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaCircleUser, FaBookmark, FaBagShopping } from "react-icons/fa6";
import avatarImg from "../assets/avatar.png";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "Profile", href: "/profile" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    alert("Logout successfully");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="px-4 py-6 bg-primary">
      <nav className="flex justify-between items-center max-w-screen-2xl mx-auto">
        {/* Left side */}
        <div className="flex items-center md:gap-16 gap-4">
          <div className="flex items-center">
            <div>
              <Link to="/">
                <img src="/FullyBooked-white.png" alt="" className="size-10" />
              </Link>
            </div>
            <div>
              <Link to="/">
                <h3 className="font-bold text-yellow-100">FULLY BOOKED</h3>
              </Link>
            </div>
          </div>

          {/* search */}
          <div className="relative sm:w-72 w-40 space-x-2">
            <FaMagnifyingGlass className="absolute inline-block left-4 inset-y-2 " />
            <input
              type="text"
              placeholder="Search a Book"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Center */}
        <div className="w-2/5 text-white">
          <ul className="flex md:gap-4 text-md text-center font-semibold">
            <Link to="/">
              <li className="nav-item">Store</li>
            </Link>
            <Link to="/">
              <li className="nav-item">Courier</li>
            </Link>
            <Link to="/">
              <li className="nav-item">About Us</li>
            </Link>
          </ul>
        </div>

        {/* Right side */}
        <div className="relateive flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full ${currentUser ? "ring-2 ring-white" : ""}`}
                  />
                </button>
                {/* show dropdowns */}
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-40 mt-2 w-48 bg-white shadow-lg rounded-md z-40"
                  >
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link to={item.href} className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaCircleUser className="size-6 text-white" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <FaBookmark className="size-6 text-white" />
          </button>
          <Link to="/cart" className="relative">
            <FaBagShopping className="size-6 text-white" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 rounded-full bg-blackBG h-6 w-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 rounded-full bg-blackBG h-6 w-6 flex items-center justify-center">
                0
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

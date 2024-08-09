import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false);
        setScrollingUp(false);
      } else {
        setShow(true);
        setScrollingUp(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const menuItems = [
    { name: "Work", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Ideas", path: "/ideas" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
        show
          ? scrollingUp
            ? "bg-orange-600/60 backdrop-blur-md"
            : "bg-orange-600/80 backdrop-blur-md"
          : "-translate-y-full"
      }`}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto p-2">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-[150px] h-full" />
        </Link>
        <div className="">
          <ul className="flex justify-between gap-5 text-white">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? "border-b-2 border-white"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

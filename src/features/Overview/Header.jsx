import { Link } from "react-router-dom";

function NavLink({ to, children, classes }) {
  return (
    <Link to={to} className={`text-2xl ${classes}`}>
      {children}
    </Link>
  );
}

function Header() {
  return (
    <header className="">
      <nav className="relative flex items-center justify-between bg-sky-100 shadow-md shadow-gray-300">
        <div className="py-6">
          <NavLink to="/">
            <img
              src="quick_quack_logo.svg"
              alt="app-logo"
              className="ml-2 h-[3rem] w-[14rem] sm:h-[4rem] sm:w-[16rem]"
            />
          </NavLink>
        </div>
        <div className="mr-7 flex space-x-3">
          <NavLink
            to="/login"
            classes="sm:px-6 px-3 sm:py-4 py-2 font-semibold hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-500 hover:rounded-xl transition-all duration-300 sm:text-4xl text-3xl hover:text-white"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            classes="bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-xl sm:px-6 px-3 sm:py-4 py-2 font-semibold sm:text-3xl text-2xl hover:from-pink-500 hover:to-orange-500 transition-all duration-300"
          >
            Sign Up
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;

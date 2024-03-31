import React,{useEffect} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
  Button
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
 
const AppNavbar = () => {
  const [openNav, setOpenNav] = React.useState(false);

  const { accessToken,setAccessToken } = useAuth();
  const navigate = useNavigate();

  const logoutHandle = async()=>{
    setAccessToken(null);
    try {
      const response = await axios.post('api/user/logout');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

 
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <NavLink
        to='/features'
        size="sm"
        className="mr-3"
        style={{ color: '#000' }}
      >
        Features
      </NavLink>
      <NavLink
        to='/blogs'
        size="sm"
        className="mr-3"
        style={{ color: '#000' }}
      >
        Blogs
      </NavLink>
      <NavLink
        to='/dashboard'
        size="sm"
        className="mr-3"
        style={{ color: '#000' }}
      >
        Dash Board
      </NavLink>
    </ul>
  );
 
  return (
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
        <NavLink
          to='/'
          size="sm"
          className="mr-3"
          style={
            { 
              color: '#000' ,
              fontSize : '1.5rem'
            } 
          }
        >
          Finance
        </NavLink>
          <div className="flex items-center gap-4">
          <div className="mr-4 hidden lg:block">{navList}</div>
          {
            accessToken ? (
                <div className="flex items-center gap-x-1">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block mr-4"
                    onClick={logoutHandle}
                  >
                    Log Out
                  </Button>
                </div>
            ) : (
              <div className="flex items-center gap-x-1">
                <NavLink
                  to='/login'
                  size="sm"
                  className="hidden lg:inline-block mr-4"
                  style={{ color: '#000' }}
                >
                  Log In
                </NavLink>
                <NavLink
                  to='/signup'
                  size="sm"
                  className="hidden lg:inline-block mr-4 bg-black text-white py-2 px-2 rounded-lg"
                >
                  Sign up
                </NavLink>
            </div>
            ) 
          }
            <IconButton
              variant="text"
              className="h-6 w-10 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              onClick={() => {
                setOpenNav(!openNav);
                if (openNav) {
                  setOpenNav(false); 
                }
              }}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
        {navList}
          {
            accessToken ? (
              <div className="flex items-center gap-x-1">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="mr-4 bg-black text-white py-2 px-2 rounded-lg"
                    onClick={logoutHandle}
                  >
                    Log Out
                  </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-1">
              <NavLink
                    to='/login'
                    size="sm"
                    className="mr-4 bg-black text-white py-2 px-2 rounded-lg"
                >
                  Log In
                  </NavLink>
                  <NavLink
                    to='/signup'
                    size="sm"
                    className="mr-4 bg-black text-white py-2 px-2 rounded-lg"
                  >
                    Sign up
                  </NavLink>
              </div>
            )
          }
          
        </MobileNav>
      </Navbar>
   
  );
}

export default AppNavbar;

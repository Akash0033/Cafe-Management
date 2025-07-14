import React, {useState} from 'react'
import { Link } from 'react-router-dom';

// Dashboard Icon
import DashboardIcon from '@mui/icons-material/Dashboard';
//Menu Icon
import MenuIcon from '@mui/icons-material/Menu';
// Manage Orders Icon
import BallotIcon from '@mui/icons-material/Ballot';
// Recharge Icon
import AddCardIcon from '@mui/icons-material/AddCard';
// Category Icon
import CategoryIcon from '@mui/icons-material/Category';
// Manage Items Icon
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
// Users Icon
import PeopleIcon from '@mui/icons-material/People';
// Settings Icon
import SettingsIcon from '@mui/icons-material/Settings';
// Staffs Icon
import EngineeringIcon from '@mui/icons-material/Engineering';
// Logout Icon
import LogoutIcon from '@mui/icons-material/Logout';

const NewNavbar = () => {

    const [collapsed, setCollapsed] = useState(true);

    // Toggle function for expanding/collapsing navbar
    const toggleNavbar = () => {
        setCollapsed(!collapsed);
        
    };

    return (
    <>
    {/* Small Navbar */}
    <div id='small-nav' className={`small-nav-cont ${collapsed ? '' : 'hide'}`}>
      <div className='flex justify-center'>
        <div >
          {/* Menu */}
          <div className='flex flex-col items-center mt-3 mb-4'>
            <button className='menu-icon navIcon rounded-full hover:bg-gray-800' onClick={toggleNavbar}>
              <MenuIcon/>
            </button>
          </div>

          {/* Dashboard */}
          <Link to="/admin/AdminDash">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><DashboardIcon/></button>
              <p className='navIconText'>
                Dashboard
              </p>
            </div>
          </Link>

          {/* Manage Orders */}
          <Link to="/admin/ManageOrders">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><BallotIcon/></button>
              <p className='navIconText'>
                Manage Orders
              </p>
            </div>
          </Link>

          {/* Recharge */}
          <Link to="/admin/Recharge">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><AddCardIcon/></button>
              <p className='
                navIconText'>
                Recharge
              </p>
            </div>
          </Link>

          {/* Category Master */}
          <Link to="/admin/ManageCategories">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><CategoryIcon/></button>
              <p className='navIconText'>
                Category Master
              </p>
            </div>
          </Link>

          {/* Item Master */}
          <Link to="/admin/ManageItems">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><RestaurantMenuIcon/></button>
              <p className='navIconText'>
                Item Master
              </p>
            </div>
          </Link>

          {/* Manage Users */}
          {/* <Link to="/admin/ManageUsers">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><PeopleIcon/></button>
              <p className='navIconText'>
                Manage Users
              </p>
            </div>
          </Link> */}

          {/* Manage Students */}
          <Link to="/admin/ManageStudents">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><PeopleIcon/></button>
              <p className='navIconText'>
                Manage Students
              </p>
            </div>
          </Link>

          {/* Manage Staffs */}
          <Link to="/admin/ManageStaffs">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><EngineeringIcon/></button>
              <p className='navIconText'>
                Manage Staffs
              </p>
            </div>
          </Link>

          {/* Settings */}
          <Link to="/admin/Settings">
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><SettingsIcon/></button>
              <p className='navIconText'>
                Settings
              </p>
            </div>
          </Link>
          <Link onClick={() => {localStorage.clear(); window.location.href = '/login'}}>
            <div className='iconContainer'>
              <button className='navIcon rounded-full'><LogoutIcon/></button>
              <p className='navIconText'>
                Log Out
              </p>
            </div>
          </Link>
        </div>
      </div>  
    </div>


    {/* Big Navbar */}
    {/* Search: How to set style for screen size ranging from md to lg */}
    <div id='big-nav' className={`big-nav-cont ${collapsed ? 'hide' : ''}`}>
      {/* Menu */}
      <div className='flex flex-col mx-3 mb-4'>
        <button className='menu-icon navIcon rounded-full hover:bg-gray-800' onClick={toggleNavbar}>
          <MenuIcon/>
        </button>
      </div>
      <div>
        {/* Logo Here */}
      </div>

      {/* Nav Content Wrapper */}
      <div>
        <Link to="/admin/AdminDash">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><DashboardIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>DASHBOARD</p>
            {/* <p className='navIconText'>
              Dashboard
            </p> */}
          </div>
        </Link>

        {/* Manage Orders */}
        <Link to="/admin/ManageOrders">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><BallotIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>MANAGE ORDERS</p>
            {/* <p className='navIconText'>
              Manage Orders
            </p> */}
          </div>
        </Link>

        {/* Recharge */}
        <Link to="/admin/Recharge">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><AddCardIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>RECHARGE</p>
            {/* <p className='navIconText'>
              Recharge
            </p> */}
          </div>
        </Link>

        {/* Category Master */}
        <Link to="/admin/ManageCategories">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><CategoryIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>CATEGORY MASTER</p>
            {/* <p className='navIconText'>
              Category Master
            </p> */}
          </div>
        </Link>

        {/* Item Master */}
        <Link to="/admin/ManageItems">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><RestaurantMenuIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>ITEM MASTER</p>
            {/* <p className='navIconText'>
              Item Master
            </p> */}
          </div>
        </Link>

        {/* Manage Users */}
        {/* <Link to="/admin/ManageUsers">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><PeopleIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>MANAGE USERS</p> */}
            {/* <p className='navIconText'>
              Manage Students
            </p> */}
          {/* </div>
        </Link> */}

        {/* Manage Students */}
        <Link to="/admin/ManageStudents">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><PeopleIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>MANAGE STUDENTS</p>
            {/* <p className='navIconText'>
              Manage Students
            </p> */}
          </div>
        </Link>

        {/* Manage Staffs */}
        <Link to="/admin/ManageStaffs">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><EngineeringIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>MANAGE STAFFS</p>
            {/* <p className='navIconText'>
              Manage Staffs
            </p> */}
          </div>
        </Link>

        {/* Settings */}
        <Link to="/admin/Settings">
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><SettingsIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>SETTINGS</p>
            {/* <p className='navIconText'>
              Settings
            </p> */}
          </div>
        </Link>

        <Link onClick={() => {localStorage.clear(); window.location.href = '/login'}}>
          <div className='iconContainer2'>
            <button className='navIcon rounded-full'><LogoutIcon/></button>
            <p className=' text-gray-100 text-[12px] mx-2'>LOG OUT</p>
            {/* <p className='navIconText'>
              Settings
            </p> */}
          </div>
        </Link>
      </div>
    </div>
    </>
    );
};

export default NewNavbar;
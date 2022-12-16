import React,{useState} from 'react';
import './Navbar.css';
import {Icon} from 'react-icons-kit';
import {menu} from 'react-icons-kit/feather/menu';
import {x} from 'react-icons-kit/feather/x';
import { Link } from 'react-router-dom';

const Navbar = ({setShow}) => {

  const [toggle, setToggle]=useState(false);

  const handleToggle=()=>{
    setToggle(!toggle);
  }

  return (
    <nav className={toggle?'navbar expanded':'navbar'}>
        <h2 className='logo'>HackerNews</h2>
        <div className='toggle-icon' onClick={handleToggle}>
          {toggle?<Icon icon={x} size={28}/>:<Icon icon={menu} size={28}/>}
        </div>
        <ul className='links'>
          <li onClick={() => setShow(true)}><Link className='navLinks' to='/beststories'>Best</Link></li>
          <li><Link className='navLinks' to='/topstories'>Top</Link></li>
          <li><Link className='navLinks' to='/newstories'>New</Link></li>
          <li onClick={() => setShow(false)}><Link className='navLinks' to='/savedstories'>Save</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar

import "./style.scss"
import homeicon from '../../assets/images/homeIcon.svg'
import cobrancaicon from "../../assets/images/cobrancaIcon.svg"
import clientsIcon from '../../assets/images/clientsIcon.svg'
import {useState}from 'react';

function NavBar() {
    
  const menus = [
      {
          id:0,
          src:homeicon,
          nome:"Menu",
          alt:"home icon"
  
      },
      {
          id:1,
          src:clientsIcon,
          nome:"Clientes",
          alt:"clients icon"
      },
      {
          id:2,
          src:cobrancaicon,
          nome:"Cobranças",
          alt:"billing icon"
      }
  ]

  const [selected,setSelected]=useState(0);    
  
  return (
  
  
      <nav className="nav-container">
          <ul className="navbar">
              {menus.map((menu)=>{
                  return(
                      <li  className={selected===menu.id?"selected":""} key={menu.id} onClick={()=>setSelected(menu.id)}>
                          <img   src={menu.src} alt={menu.alt}/> 
                          <hr style={{display:selected===menu.id?"block":"none"}}/>
                          <span>{menu.nome}</span>
                      </li>
                  )
                  
              })}
              
          </ul>
      </nav>
   

  );
}

export default NavBar;
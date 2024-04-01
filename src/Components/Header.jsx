import React from 'react'

const Header = ({title,color}) => {
  return (
    <div className='Header' style={{width:"100%",textAlign:'center',padding:'1.5rem',background:color}}>
      <label htmlFor="" style={{color:'white',fontWeight:'600',fontSize:'1.7rem'}}>{title}</label>
    </div>
  )
}

export default Header

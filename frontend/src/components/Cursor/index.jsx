import React, { useEffect, useState } from 'react'
import './styles.css'


export default function Cursor({mouseOverNavItem, mouseOverLink}) {

    const [cursorPosition, setCursorPosition] = useState({x:0,y:0});

    const cursorStyles = {
      left: cursorPosition.x+"px", 
      top: cursorPosition.y+"px",
      transform: (mouseOverNavItem || mouseOverLink)?'scale(2)':'',
      backgroundColor: mouseOverNavItem?'#000':'initial'
    }

    useEffect(() => {
        const onMouseMove = (e) => {
            setCursorPosition({x: e.pageX, y: e.pageY});
        }
        window.addEventListener('mousemove', onMouseMove);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        }
    }, [])

  return (
    <div style={cursorStyles} className="cursor"></div>
  )
}

import React, { useEffect, useRef } from 'react'

const ClickOutside = ({children, exceptionRef, onClick, className}) => {

    const wrapperRef = useRef()

    useEffect(() => {
        document.addEventListener('mousedown', handleClickListiner)

        return () => {
            document.removeEventListener('mousedown', handleClickListiner)
        }
    }, [])

    const handleClickListiner = (e) => {
        let clickedInside

        if(exceptionRef) {
            clickedInside = (wrapperRef && wrapperRef.current.contains(e.target)) || exceptionRef.current === e.target || exceptionRef.current.contains(e.target)
        } else {
            clickedInside = (wrapperRef && wrapperRef.current.contains(e.target))
        }

        if (clickedInside) return
        else onClick()
    }
  return (
    <div ref={wrapperRef} className={`${className || ""}`}>{children}</div>
  )
}

export default ClickOutside
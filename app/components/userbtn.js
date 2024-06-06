import React from 'react'

const Userbtn = () => {
  const {userName} = useUser()

  return (
    <button
    onClick={toggleUserNav}
      id="userbtn"
      className={`"h-11 md:h-14 w-fit absolute left-4 top-4 rounded-2xl md:rounded-2xl items-center justify-center gap-2 duration-700 px-2`}
    >
      {userName}
     
    </button>  )
}

export default Userbtn
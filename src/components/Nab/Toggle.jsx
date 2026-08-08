import React from 'react';

const Toggle = ({ toggle, settoggle }) => {

  const handleClick = () => {
    settoggle(toggle === "light" ? "dark" : "light");
  };

  return (
    <div className="mb-10 flex justify-end md:pt-3  p-3 ">

      <button  className="border px-3 w-30 py-1" onClick={handleClick}>
        {toggle}
      </button> 

    </div>
  );
};

export default Toggle;
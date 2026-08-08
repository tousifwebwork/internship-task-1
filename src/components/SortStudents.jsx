import React from 'react'

const SortStudents = ({students,setStudents}) => {

function NameAsc() {
  const sorted = [...students].sort((a, b) =>a.std_name.localeCompare(b.std_name));
  setStudents(sorted);
  document.getElementById("sortDropdown").removeAttribute("open");
}

function NameDesc() {
  const sorted = [...students].sort((a, b) =>b.std_name.localeCompare(a.std_name) );
  setStudents(sorted);
  document.getElementById("sortDropdown").removeAttribute("open");
}

function AgeAsc() {
  const sorted = [...students].sort((a, b) => Number(a.std_age) - Number(b.std_age));
  setStudents(sorted);
  document.getElementById("sortDropdown").removeAttribute("open");
}

function AgeDesc() {
  const sorted = [...students].sort((a, b) => Number(b.std_age) - Number(a.std_age));
  setStudents(sorted);
  document.getElementById("sortDropdown").removeAttribute("open");
}

  return (
      <details className="dropdown" id="sortDropdown">
        <summary className="btn  w-full m-1">Sort Name By</summary>
         <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li> <button className='dark:text-black' onClick={NameAsc}>Name [A-Z]</button></li>
            <li> <button className='dark:text-black' onClick={NameDesc}>Name [Z-A]</button></li>
            <li> <button className='dark:text-black' onClick={AgeAsc}>Age [Ascending]</button></li>
            <li> <button className='dark:text-black' onClick={AgeDesc}>Age [Descending]</button></li>
        </ul>
      </details>
  )
}

export default SortStudents
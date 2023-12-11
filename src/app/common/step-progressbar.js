"use client"
import React, { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const Progressbar = (isactive) => {
  const pathname = usePathname();
  console.log(pathname)
// if (condition) {
  
// }
  // useEffect(() => {
  //   const steps = stepsRef.current.querySelectorAll('.step');
  //   let foundActive = false;

  //   steps.forEach((step) => {
  //     if (!foundActive) {
  //       if (!step.classList.contains('active')) {
  //         step.classList.add('done');
  //         // step.innerHTML = '<i class="icon-ok"></i>';
  //       } else {
  //         foundActive = true; // Set the flag to true if an element with 'active' class is found
  //       }
  //     }
  //   });
  // }, []);

  return (
    <>
      <div id="steps">
        <div className={`step ${isactive === 0 ? 'active':''}`} data-desc="Listing information">
          1
        </div>
        <div className={`step ${isactive === 0 ? 'active':''}`} data-desc="Photos & Details">
          2
        </div>
        <div className={`step ${isactive === 0 ? 'active':''}`} data-desc="Review & Post">
          3
        </div>
        <div className={`step ${isactive === 0 ? 'active':''}`} data-desc="Your order">
          4
        </div>
      </div>
    </>
  );
};

export default Progressbar;

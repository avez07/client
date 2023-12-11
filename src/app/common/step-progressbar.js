"use client"
import React, { useEffect } from 'react';
import "../../../public/css/style.css"
 
const progressbar = ()=> {

    useEffect(() => {
        const steps = document.querySelectorAll('.step');    
        let foundActive = false;    
        steps.forEach((step, index) => {
          if (!foundActive) {
            if (!step.classList.contains('active')) {
              step.classList.add('done');
              // step.innerHTML = '<i class="icon-ok"></i>';
            } else {
              foundActive = true; // Set the flag to true if an element with 'active' class is found
            }
          }
        });
      }, []);
    
    return (
        <>
        <div id="steps">
          <div className="step" data-desc="Listing information">1</div>
          <div className="step" data-desc="Photos & Details">2</div>
          <div className="step active " data-desc="Review & Post">3</div>
          <div className="step" data-desc="Your order">4</div>
        </div>
        </>
        
    );
  
}
export default progressbar
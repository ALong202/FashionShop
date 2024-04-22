import React, { useEffect, useState } from "react"

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const plusDivs = (n) => {
    const newSlideIndex = slideIndex + n;
    const slides = document.getElementsByClassName("mySlides");
    if (slides[newSlideIndex-1]) {
      setSlideIndex(newSlideIndex);
    }
  };
  
  const currentDiv = (n) => {
    const slides = document.getElementsByClassName("mySlides");
    if (slides[n-1]) {
      setSlideIndex(n);
    }
  };

  useEffect(() => {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("demo");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
      // dots[i].className = dots[i].className.replace(" active", "");
    }
    // Kiểm tra phần tử cuối cùng của mảng có tồn tại không trước khi thực hiện thay đổi
    if (slides[slideIndex-1]) {
      slides[slideIndex-1].style.display = "block";  
    } 
    if (dots[slideIndex-1]) {
      dots[slideIndex-1].className += " active";
    }
  }, [slideIndex]);


  return (
    <div className="w3-content w3-display-container" style={{maxWidth: '90%'}}>
      <img className="mySlides" src="../images/Slider/img_nature_wide.jpg" style={{width: '100%'}} />
      <img className="mySlides" src="../images/Slider/img_snow_wide.jpg" style={{width: '100%'}} />
      <img className="mySlides" src="../images/Slider/img_mountains_wide.jpg" style={{width: '100%'}} />
      <div className="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle" style={{width: '100%'}}>
        <div className="w3-left w3-hover-text-khaki" onClick={() => plusDivs(-1)}>&#10094;</div>
        <div className="w3-right w3-hover-text-khaki" onClick={() => plusDivs(1)}>&#10095;</div>
        {/* <span className="w3-badge demo" onClick={() => currentDiv(1)}></span>
        <span className="w3-badge demo" onClick={() => currentDiv(2)}></span>
        <span className="w3-badge demo" onClick={() => currentDiv(3)}></span> */}
        <span className={`w3-badge demo ${slideIndex === 1 ? 'active' : ''}`} onClick={() => currentDiv(1)}></span>
        <span className={`w3-badge demo ${slideIndex === 2 ? 'active' : ''}`} onClick={() => currentDiv(2)}></span>
        <span className={`w3-badge demo ${slideIndex === 3 ? 'active' : ''}`} onClick={() => currentDiv(3)}></span>
      </div>
    </div>
  )
}

export default Slider;
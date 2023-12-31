import React, { useState, useEffect } from 'react';
import OutfitCard from './OutfitCard.jsx';
import NoImage from '../../assets/image-not-available.png';
import AddImage from '../../assets/AddIconBlack.png';

import LeftArrow from '../../assets/icons8-arrow-left-black.png';
import RightArrow from '../../assets/icons8-arrow-right-black.png';
import { useSpring, animated } from '@react-spring/web'
import ResizeObserver from 'resize-observer-polyfill';

var sessionid = JSON.stringify(document.cookie, undefined, "\t")

const YourOutfitList = ({ getAvgRating, currentProduct, currentProductStyles, currentProductAvgRating, handleProductCardClick }) => {
  const [outfitProducts, setOutfitProducts] = useState([]);
  const [movementIncrement, setMovementIncrement] = useState(0);
  const [cardContainerWidth, setCardContainerWidth] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPositionLimit, setScrollPositionLimit] = useState(0);
  const [leftArrowDiv, setLeftArrowDiv] = useState(null)
  const [rightArrowDiv, setRightArrowDiv] = useState(null)

  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))

  const handleAdd = () => {
    const isProductUnique = outfitProducts.every((product) => product[0].id !== currentProduct.id);
    if (isProductUnique) {
      const updatedOutfitProducts = [...outfitProducts, [currentProduct, currentProductStyles, { avgRating: currentProductAvgRating }]];
      setOutfitProducts(updatedOutfitProducts);
      localStorage.setItem(`outfitList_${sessionid}`, JSON.stringify(updatedOutfitProducts));
    }
  };

  //substitute this for clickHandler for add to clear all outfits saved for testing
    // const handleClear = () => {
    //   setOutfitProducts([]);
    //   localStorage.removeItem(`outfitList_${sessionid}`);
    // };

  const handleRemove = (id) => {
    const updatedOutfitProducts = outfitProducts.filter((product, index) => product[0].id !== id);
    setOutfitProducts(updatedOutfitProducts);
    localStorage.setItem(`outfitList_${sessionid}`, JSON.stringify(updatedOutfitProducts));
  }

  useEffect(() => {
    const storedOutfitList = JSON.parse(localStorage.getItem(`outfitList_${sessionid}`)) || [];
    setOutfitProducts(storedOutfitList);
  }, []);

  useEffect(() => {
    resizeObserver.unobserve(document.getElementById("related-products-box"))
    resizeObserver.observe(document.getElementById("related-products-box"))
  }, [outfitProducts])

  useEffect(() => {
    setScrollPositionLimit(cardContainerWidth - movementIncrement);
  }, [cardContainerWidth, movementIncrement]);

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      var boxWidth = document.getElementsByClassName("box")[0].offsetWidth;
      var cardElements = document.getElementsByClassName("card");
      if (cardElements.length > 0) {
        var cardMargin = Number(getComputedStyle(document.getElementsByClassName("card")[0]).marginLeft.replace(/px$/, "")) + Number(getComputedStyle(document.getElementsByClassName("card")[0]).marginRight.replace(/px$/, ""));
        var cardWidth = cardMargin + document.getElementsByClassName("card")[0].offsetWidth;
        setMovementIncrement((boxWidth) - (boxWidth % cardWidth));
        setCardContainerWidth(cardWidth * outfitProducts.length); // Container for all cards, and not viewer
      }
    }
  })

  const handleArrow = (e) => {
    var newPosition;
    if (e.target.id === "left-arrow") {
      newPosition = scrollPosition + movementIncrement;
      if (Math.abs(scrollPosition) > 0) {
        api.start({
          from: {
            x: scrollPosition,
          },
          to: {
            x: newPosition,
          },
        })
        setScrollPosition(scrollPosition + movementIncrement)
      }
    } else if (e.target.id === "right-arrow") {
      newPosition = scrollPosition - movementIncrement;
      if (Math.abs(scrollPosition) < scrollPositionLimit) {
        api.start({
          from: {
            x: scrollPosition,
          },
          to: {
            x: newPosition,
          },
        })
        setScrollPosition(scrollPosition - movementIncrement)
      }
    }
  }

    return (
    <>
      <div className = "wrapper" >
        <div className = 'box' id="outfit-box" role = "show-outfit-products">

        <button id= "add-outfit-button" onClick = {handleAdd} role = "allow-add-outfit-product" data-testid="add-button">
          <img id="add-outfit-button-image" src= {AddImage} width="60" height="60" alt="outfit image" />
          <h3 id="add-outfit-button-text"> Add to Outfit </h3>
        </button>

        {scrollPosition < 0 ? (
          <div className = "arrow" id= "left-arrow" onClick = {handleArrow} style={{backgroundImage:`url(${LeftArrow})`}}>  </div> )
            : (<></>)
            }
            <animated.div className = "inner-box" role = "show-details-of-outfit-products" style = {{...springs}}>
            {Object.values(outfitProducts).map((product, index) => (
              <OutfitCard key={index} index = {index} salePrice = {product[1].results[0].sale_price} product={product[0]} id={product[0].id} name={product[0].name} category={product[0].category} price={product[0].default_price} image = {product[1].results[0].photos[0].url || NoImage} avgRating = {product[2].avgRating} handleRemove = {handleRemove} handleProductCardClick = {handleProductCardClick} data-testid="outfit-card"/>
            ))}
            </animated.div>
            {Math.abs(scrollPosition) >= scrollPositionLimit ? (<></>) : (<div className = "arrow" id= "right-arrow" onClick = {handleArrow} style={{backgroundImage:`url(${RightArrow})`}}> </div> )
          }
          </div>

      </div>
    </>
  )
}


export default YourOutfitList;

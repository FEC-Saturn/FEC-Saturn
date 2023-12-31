import React from 'react';
import StarDisplay from '../shared-components/StarDisplay.jsx';
import ActionButtonOutfit from './ActionButtonOutfit.jsx';
const OutfitCard = ({index, product, id, name, category, price, avgRating,image, handleRemove, handleProductCardClick, salePrice}) => {

  const isSalePrice = (salePrice !== null);

  var width = 300;

  return (
    <>
      <div className = "card" role = {"show-details-of-outfit-products"} style = {{width:`${width.toString()}px`}}>
      <ActionButtonOutfit handleRemove = {handleRemove} id = {id} /> <br></br>
          {/* <img src={image} width="300" height="375" alt="product image" className = "product-image" onClick = { () => {handleProductCardClick(id)}} /> <br></br> */}
          <div style = {{backgroundImage: `url(${image})`}} alt="product image" className = "product-image" onClick = {() => { handleProductCardClick(id)}}> </div> <br></br>
          <div className = 'card-details' role ="User-can-select-product" onClick = { () => {handleProductCardClick(id)}} >
            <small className = 'card-text'>{category} </small>
            <span className = 'card-text'> {name} </span>
            {isSalePrice ? (
              <>
              <small className = {`card-text original-price-strike`}> ${price} </small>
              <small className = {`card-text sale-price-red-text`}> ${salePrice} </small>
              </>
            ) : (
              <>
              <small className = "card-text default-price" > ${price} </small>
              </>
            )}
            <StarDisplay className = 'card-text' name = {`card-stars-${id}`} id = {id} rating={avgRating} size={40} backgroundColor = {'rgb(244,244,244)'}/>
            {/* <small className = 'card-text'>{avgRating} *</small> */}
          </div>
      </div>
    </>
  )
}


export default OutfitCard;
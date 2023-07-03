import React, {useState} from 'react';
import CompareModal from './CompareModal.jsx';
import StarButton from '../../assets/icons8-star-black.png';


const ActionButtonRelated = ({name, features, currentProduct, currentProductFeatures}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log(features)

    return (
      <div className = "action-button">
        <button onClick = {openModal} > <img src = {StarButton} width="15" height="15" /> </button>

        <CompareModal isOpen = {isModalOpen} onRequestClose = {closeModal} name = {name} features = {features} currentProduct = {currentProduct} currentProductFeatures = {currentProductFeatures}/>
      </div>
    )
}



export default ActionButtonRelated;
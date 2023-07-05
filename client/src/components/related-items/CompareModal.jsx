import React from 'react';
import Modal from 'react-modal';

const CompareModal = ({ isOpen, onRequestClose, name, features, currentProduct, currentProductFeatures }) => {

  // Combine the features and currentProductFeatures into a single array
  const combinedFeatures = [...features, ...currentProductFeatures];

  // Create a Set to store unique characteristics
  const uniqueCharacteristics = new Set();

  // Iterate over the combined features and add unique characteristics to the Set
  combinedFeatures.forEach((item) => {
    uniqueCharacteristics.add(item.feature);
  });

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false} style={{
      overlay: {backgroundColor: 'transparent',},
      content: {
        width: '800px',
        height: '350px',
        margin: 'auto',
        background: 'white',
      },
    }}>
      <h3>Comparing</h3>

      <div className="comparison-modal">

        <table>
          <thead>
            <tr>
              <th>{name}</th>
              <th></th>
              <th>{currentProduct.name}</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(uniqueCharacteristics).map((characteristic, index) => {
              // Find the selected product feature object that matches the current characteristic
              const feature = features.find((item) => item.feature === characteristic);

              // Find the currentProductFeature object that matches the current characteristic
              const currentProductFeature = currentProductFeatures.find((item) => item.feature === characteristic);

              return (
                <tr key={index}>
                  <td className="checkmark">
                    {/* Display a checkmark if the feature exists */}
                    {feature ? <span>&#10004;</span> : ''}
                  </td>
                  <td>
                    {/* Display the feature value or the currentProductFeature value */}
                    {feature ? (
                      feature.value ? `${feature.feature}: ${feature.value}` : feature.feature
                    ) : ((currentProductFeature.value) ?
                      `${currentProductFeature.feature}: ${currentProductFeature.value}` : currentProductFeature.feature
                    )}
                  </td>
                  <td className="checkmark">
                    {/* Display a checkmark if the currentProductFeature exists */}
                    {currentProductFeature ? <span>&#10004;</span> : ''}
                  </td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    </Modal>
  );
}

export default CompareModal;



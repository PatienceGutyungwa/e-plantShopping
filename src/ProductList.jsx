import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const plantsArray = [
  {
    category: "Indoor Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 120, image: "/images/snake.jpg" },
      { id: 2, name: "Peace Lily", price: 150, image: "/images/lily.jpg" },
      { id: 3, name: "Aloe Vera", price: 90, image: "/images/aloe.jpg" },
      { id: 4, name: "Spider Plant", price: 100, image: "/images/spider.jpg" },
      { id: 5, name: "Rubber Plant", price: 200, image: "/images/rubber.jpg" },
      { id: 6, name: "ZZ Plant", price: 180, image: "/images/zz.jpg" }
    ]
  },
  {
    category: "Outdoor Plants",
    plants: [
      { id: 7, name: "Rose", price: 70, image: "/images/rose.jpg" },
      { id: 8, name: "Lavender", price: 90, image: "/images/lavender.jpg" },
      { id: 9, name: "Jasmine", price: 85, image: "/images/jasmine.jpg" },
      { id: 10, name: "Hibiscus", price: 110, image: "/images/hibiscus.jpg" },
      { id: 11, name: "Bougainvillea", price: 95, image: "/images/bougainvillea.jpg" },
      { id: 12, name: "Sunflower", price: 60, image: "/images/sunflower.jpg" }
    ]
  }
];

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart);

  // Track added items locally for button state
  const [addedItems, setAddedItems] = useState([]);

  const handleAddToCart = (plant) => {
    dispatch({ type: "ADD_ITEM", payload: plant });

    // Update button state
    setAddedItems(prev => [...prev, plant.id]);
  };

  return (
    <div className="product-page">
      <h2>Our Plants</h2>

      {plantsArray.map(category => (
        <div key={category.category}>
          <h3>{category.category}</h3>

          <div className="product-grid">
            {category.plants.map(plant => {
              const isAdded = addedItems.includes(plant.id);

              return (
                <div key={plant.id} className="product-card">
                  <img src={plant.image} alt={plant.name} />
                  <h4>{plant.name}</h4>
                  <p>R{plant.price}</p>

                  <button
                    onClick={() => handleAddToCart(plant)}
                    disabled={isAdded}
                  >
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

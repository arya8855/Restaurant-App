import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ dish, itemCount, increment, decrement }) => (
  <div className="menu-item" key={dish._id}>
    <img src={dish.image} alt={dish.dishName} loading="lazy" />
    <div className="menu-name">
      <p>{dish.dishName}</p>
      <div className="counter">
        <p>₹{dish.dishPrice}</p>
        {itemCount.quantity > 0 && (
          <>
            <FaMinus onClick={() => decrement(dish)} />
            <span>{itemCount.quantity}</span>
          </>
        )}
        <FaPlus onClick={() => increment(dish)} />
      </div>
    </div>
  </div>
);

const Display = ({ item, search }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState([]);
  const [count, setCount] = useState({});
  const [visibleCount, setVisibleCount] = useState(10); 
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/dishes`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setMenu(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (err) {
        console.error("Error fetching dishes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredMenu = menu.filter((dish) => {
    const matchCategory = item
      ? dish.dishCategory?.toLowerCase() === item.toLowerCase()
      : true;
    const matchSearch = search
      ? dish.dishName.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchCategory && matchSearch;
  });

  const lastDishRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredMenu.length) {
          setVisibleCount((prev) => prev + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, filteredMenu.length, visibleCount]
  );

  // Counter logic
  const increment = (dish) => {
    setCount((prev) => ({
      ...prev,
      [dish._id]: {
        quantity: (prev[dish._id]?.quantity || 0) + 1,
        price: dish.dishPrice,
        image: dish.image,
        time: dish.dishPrepTime,
      },
    }));
  };

  const decrement = (dish) => {
    setCount((prev) => {
      const currentQty = prev[dish._id]?.quantity || 0;
      if (currentQty <= 0) return prev;
      return {
        ...prev,
        [dish._id]: {
          ...prev[dish._id],
          quantity: currentQty - 1,
        },
      };
    });
  };

  return (
    <div className="menu-display">
      {loading ? (
        <p>Loading menu...</p>
      ) : filteredMenu.length > 0 ? (
        filteredMenu.slice(0, visibleCount).map((dish, index) => {
          if (index === visibleCount - 1) {
            return (
              <div ref={lastDishRef} key={dish._id}>
                <MenuItem
                  dish={dish}
                  itemCount={count[dish._id] || { quantity: 0 }}
                  increment={increment}
                  decrement={decrement}
                />
              </div>
            );
          } else {
            return (
              <MenuItem
                key={dish._id}
                dish={dish}
                itemCount={count[dish._id] || { quantity: 0 }}
                increment={increment}
                decrement={decrement}
              />
            );
          }
        })
      ) : (
        <p>No items found</p>
      )}

      {!loading && visibleCount < filteredMenu.length && (
        <div className="load-more">
          <button onClick={() => setVisibleCount((prev) => prev + 10)}>
            Load More
          </button>
        </div>
      )}

      <div className="footer">
        <button onClick={() => navigate("/next", { state: count })}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Display;

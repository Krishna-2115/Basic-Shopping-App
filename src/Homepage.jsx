import React, { useState, useEffect, Suspense } from "react";
import products from "./db/data";
import "./index.css";

const Navigation = React.lazy(() => import("./Navigation/Nav"));
const Products = React.lazy(() => import("./Products/Products"));
const Sidebar = React.lazy(() => import("./Sidebar/Sidebar"));
const Card = React.lazy(() => import("./components/Card"));

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [showLoading, setShowLoading] = useState(true); // Timer for loading

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = products.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query) {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredItems;
    }

    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title, rating }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected ||
          rating === selected
      );
    }

    return filteredProducts.map(
      ({ img, title, star, rating, prevPrice, newPrice, id }) => (
        <Card
          key={id}
          id={id}
          img={img}
          title={title}
          star={star}
          rating={rating}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
      {showLoading ? (
      <div class="wrapper">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
      </div>
      ) : (
      <Suspense fallback={<div></div>}>
        <Sidebar handleChange={handleChange} />
        <Navigation query={query} handleInputChange={handleInputChange} />
        <Products result={result} />
      </Suspense>
      )}
    </>
  );
}

export default Homepage;

import { BsFillBagFill } from "react-icons/bs";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Card = ({ id, img, title, rating, prevPrice, newPrice }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        price: newPrice,
        image: img,
      })
    );
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <FaStar key={i} style={{ color: "#FFD700", marginRight: "2px" }} />
        ) : (
          <FaRegStar key={i} style={{ color: "#ccc", marginRight: "2px" }} />
        )
      );
    }
    return stars;
  };

  const cardStyle = {
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    padding: "15px",
    margin: "15px",
    width: "260px",
    height: "380px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    position: "relative",
  };

  const responsiveCardStyle = {
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '340px',
      height: 'auto',
      padding: '12px',
      margin: '10px auto',
    },
    '@media (max-width: 480px)': {
      width: '100%',
      maxWidth: '280px',
      padding: '10px',
      margin: '10px auto',
    }
  };

  return (
    <div
      className="card"
      style={{ ...cardStyle, ...responsiveCardStyle }}
      onMouseOver={(e) => Object.assign(e.currentTarget.style, { transform: "translateY(-5px)", boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" })}
      onMouseOut={(e) => Object.assign(e.currentTarget.style, { transform: "translateY(0)", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" })}
    >
      <button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "linear-gradient(135deg, #4CAF50, #81C784)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "5px 10px",
          fontSize: "0.8rem",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          zIndex: 10,
        }}
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
      <img src={img} alt={title} style={{ width: "100%", height: "180px", objectFit: "contain", borderRadius: "8px", marginBottom: "15px" }} />
      <h3 style={{ fontSize: "1rem", fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: "10px", minHeight: "40px", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</h3>
      <div className="card-rating">{renderStars()}</div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", fontSize: "1rem", marginTop: "10px" }}>
        <span>
          <del style={{ color: "#999", textDecoration: "line-through", marginRight: "5px" }}>${prevPrice}</del>
          <span style={{ fontWeight: "bold", color: "#4CAF50" }}>${newPrice}</span>
        </span>
        <BsFillBagFill style={{ color: "#535353", fontSize: "1.5rem" }} />
      </div>
      <Link to={`/product/${id}`} key={id}>
        <button style={{
          marginTop: "10px",
          background: "linear-gradient(135deg, #007bff, #5AB4FF)",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "8px 12px",
          fontSize: "0.9rem",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "100%",
        }}>View Details</button>
      </Link>
    </div>
  );
};

export default Card;

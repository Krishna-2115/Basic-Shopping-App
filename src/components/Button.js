const Button = ({ onClickHandler, value, title }) => {
  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
  };

  const hoverStyle = {
    backgroundColor: "#555",
    transform: "scale(1.05)",
  };

  return (
    <button
      onClick={onClickHandler}
      value={value}
      className="btns"
      style={buttonStyle}
      onMouseOver={(e) => Object.assign(e.target.style, hoverStyle)}
      onMouseOut={(e) =>
        Object.assign(e.target.style, {
          backgroundColor: "#333",
          transform: "scale(1)",
        })
      }
    >
      {title}
    </button>
  );
};

export default Button;

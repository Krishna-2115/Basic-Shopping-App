const Input = ({ handleChange, value, title, name, color,rating }) => {
  return (
    <label className="sidebar-label-container">
      <input onChange={handleChange} type="radio" rating={rating} value={value} name={name} />
      <span className="checkmark" style={{ backgroundColor: color }}></span>
      {title}
    </label>
  );
};

export default Input;

import "./Ratings.css"; 

const Ratings = ({ handleChange }) => {
  return (
    <div>
      <h2 className="sidebar-title rating-title">Ratings</h2>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="5" name="rating" />
          <span className="checkmark"></span>5 Stars
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="4" name="rating" />
          <span className="checkmark"></span>4 Stars
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="3" name="rating" />
          <span className="checkmark"></span>3 Stars
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="2" name="rating" />
          <span className="checkmark"></span>2 Stars
        </label>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="1" name="rating" />
          <span className="checkmark"></span>1 Star
        </label>
      </div>
    </div>
  );
};

export default Ratings;

import Category from "./Category/Category";
import Price from "./Price/Price";
import Colors from "./Colors/Colors";
import Ratings from "./Ratings/Ratings"; 
import "./Sidebar.css";

const Sidebar = ({ handleChange }) => {
  return (
    <section className="sidebar">
      <div className="logo-container">
        <h1>🛒</h1>
      </div>
      <Category handleChange={handleChange} />
      <Price handleChange={handleChange} />
      <Ratings handleChange={handleChange} />
      <Colors handleChange={handleChange} />
    </section>
  );
};

export default Sidebar;

import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

function NavigationBar() {
  return (
    <nav className={styles["navbar"]}>
      <NavLink to="/" className={styles["navlink"]}>
        Home
      </NavLink>
      <NavLink to="/spacecrafts" className={styles["navlink"]}>
        Spacecrafts
      </NavLink>
      <NavLink to="/planets" className={styles["navlink"]}>
        Planets
      </NavLink>
    </nav>
  );
}

export default NavigationBar;

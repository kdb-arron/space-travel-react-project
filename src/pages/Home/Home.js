import { useState } from "react";
import styles from './Home.module.css';

function Home() {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleGetStartedClick = () => {
    setShowInstructions((prev) => !prev);  // Toggle the instructions visibility
  };

  return (
    <div className={styles["home-container"]}>
      <h1 className={styles["home-title"]}>Welcome to the Space Travel App</h1>
      <p className={styles["home-description"]}>
        This is the future of space exploration and travel. Explore new worlds, build spacecraft, and embark on new adventures!
      </p>
      <button className={styles["home-button"]} onClick={handleGetStartedClick}>
        {showInstructions ? "Hide Instructions" : "Get Started"}
      </button>

      {showInstructions && (
        <div className={styles["instructions-container"]}>
          <h2>How to Use the Space Travel App</h2>
          <ul>
            <li><strong>Home:</strong> This is where you start. Click "Get Started" to begin exploring.</li>
            <li><strong>Spacecrafts:</strong> View all the spacecraft currently available. You can build a new spacecraft or destroy an old one.</li>
            <li><strong>Spacecraft Details:</strong> Click on any spacecraft to view its detailed information, such as capacity and current location.</li>
            <li><strong>Build a Spacecraft:</strong> Enter the spacecraft details, such as name, capacity, description, and an optional image URL. Once submitted, the new spacecraft will be added to the list.</li>
            <li><strong>Planets:</strong> View the list of habitable planets. You can see the spacecraft on each planet and transfer them between planets by selecting a planet first and then the spacecraft of your choice.</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;


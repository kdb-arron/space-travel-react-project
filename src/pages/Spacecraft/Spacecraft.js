import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./Spacecraft.module.css";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function Spacecraft() {
  const [spacecraft, setSpacecraft] = useState(null);
  const { enableLoading, disableLoading } = useContext(LoadingContext);
  const { id } = useParams();  // Get the spacecraft ID from the URL params

  useEffect(() => {
    const fetchSpacecraft = async () => {
      enableLoading();
      const { data, isError } = await SpaceTravelApi.getSpacecraftById({ id });
      
      // Add console.log for debugging API response
      console.log("API response:", data);

      if (!isError && data) {
        setSpacecraft(data);  // Only set spacecraft if data is valid
      }
      disableLoading();
    };

    fetchSpacecraft();  // Fetch the spacecraft details when the component mounts
  }, [id, enableLoading, disableLoading]);

  if (!spacecraft) {
    // Display a loading message or fallback UI if spacecraft data is not yet loaded
    return <div>Loading spacecraft details...</div>;
  }

  return (
    <div className={styles["spacecraft"]}>
      <div className={styles["spacecraft__imageContainer"]}>
        {spacecraft.pictureUrl ? (
          <img
            src={spacecraft.pictureUrl}
            alt={`The spacecraft ${spacecraft.name || "Unnamed"}`}
            className={styles["spacecraft__image"]}
          />
        ) : (
          <span className={styles["spacecraft__image--default"]}>🚀</span>
        )}
      </div>

      <div className={styles["spacecraft__infoContainer"]}>
        <div className={styles["spacecraft__info"]}>
          <div className={styles["spacecraft__infoHeader"]}>
            Name: {spacecraft.name || "No name provided"}
          </div>

          <div className={styles["spacecraft__infoHeader"]}>
            Capacity: {spacecraft.capacity || "Unknown capacity"}
          </div>
        </div>

        <div className={styles["spacecraft__info"]}>
          <div className={styles["spacecraft__infoHeader"]}>Description:</div>
          <div className={styles["spacecraft__infoText"]}>
            {spacecraft.description || "No description available."}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spacecraft;

import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Spacecrafts.module.css";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function Spacecrafts() {
  const [spacecrafts, setSpacecrafts] = useState([]);
  const { enableLoading, disableLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  // Define getSpacecrafts using useCallback to prevent unnecessary re-renders
  const getSpacecrafts = useCallback(async () => {
    enableLoading();
    const { data, isError } = await SpaceTravelApi.getSpacecrafts();
    if (!isError && Array.isArray(data)) {
      setSpacecrafts(data);
    }
    disableLoading();
  }, [enableLoading, disableLoading]);

  useEffect(() => {
    // Fetch spacecrafts when the component is mounted
    getSpacecrafts();
  }, [getSpacecrafts]);

  const handleClickOfBuild = () => navigate("/spacecraft/build");

  const handleClickOfImageContainer = (id) => navigate(`/spacecraft/${id}`);

  const handleClickOfDestroy = async (id) => {
    enableLoading();
    const { isError } = await SpaceTravelApi.destroySpacecraftById({ id });
    if (!isError) {
      // Re-fetch spacecrafts after one is destroyed
      await getSpacecrafts();
    }
    disableLoading();
  };

  return (
    <div>
      <button onClick={handleClickOfBuild}>🏗 Build a Spacecraft</button>
      <div>
        {spacecrafts.length > 0 ? (
          spacecrafts.map((spacecraft) => (
            <div key={spacecraft.id} className={styles["spacecraft"]}>
              <div
                className={styles["spacecraft__imageContainer"]}
                onClick={() => handleClickOfImageContainer(spacecraft.id)}
              >
                {spacecraft.pictureUrl ? (
                  <img
                    src={spacecraft.pictureUrl}
                    alt={`The spacecraft ${spacecraft.name}`}
                    className={styles["spacecraft__image"]}
                  />
                ) : (
                  <span className={styles["spacecraft__image--default"]}>🚀</span>
                )}
              </div>
              <div className={styles["spacecraft__infoContainer"]}>
                <span>Name: {spacecraft.name || "Unnamed spacecraft"}</span>
                <span>Capacity: {spacecraft.capacity || "Unknown capacity"}</span>
              </div>
              <button onClick={() => handleClickOfDestroy(spacecraft.id)}>
                💥 Destroy
              </button>
            </div>
          ))
        ) : (
          <p>No spacecrafts available.</p>
        )}
      </div>
    </div>
  );
}

export default Spacecrafts;

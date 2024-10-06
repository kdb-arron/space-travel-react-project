import { useState, useEffect, useContext } from "react";
import styles from "./Planets.module.css";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function Planets() {
  const [planetsWithSpacecrafts, setPlanetsWithSpacecrafts] = useState([]);
  const { enableLoading, disableLoading } = useContext(LoadingContext);
  const [selectedPlanetId, setSelectedPlanetId] = useState(null);

  async function getPlanetsWithSpacecrafts() {
    const { data: planets, isError: isErrorPlanets } = await SpaceTravelApi.getPlanets();
    const { data: spacecrafts, isError: isErrorSpacecrafts } = await SpaceTravelApi.getSpacecrafts();
    
    if (!isErrorPlanets && !isErrorSpacecrafts) {
      planets.forEach((planet) => {
        planet.spacecrafts = spacecrafts.filter((sc) => sc.currentLocation === planet.id);
      });
      setPlanetsWithSpacecrafts(planets);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      enableLoading();
      await getPlanetsWithSpacecrafts();
      disableLoading();
    };

    fetchData();
  }, [enableLoading, disableLoading]);

  const handleClickOfPlanet = (planetId) => setSelectedPlanetId(planetId);
  
  const handleClickOfSpacecraft = async (spacecraftId, planetId) => {
    if (!selectedPlanetId || selectedPlanetId === planetId) {
      console.error("You can't send the spacecraft to the same planet or no planet selected.");
      return;
    }
    enableLoading();
    await SpaceTravelApi.sendSpacecraftToPlanet({ spacecraftId, targetPlanetId: selectedPlanetId });
    await getPlanetsWithSpacecrafts();
    disableLoading();
  };

  return (
    <div>
      {planetsWithSpacecrafts.map((planet) => (
        <div key={planet.id} className={styles["planetWithSpacecrafts"]}>
          <div
            className={`${styles["planet"]} ${selectedPlanetId === planet.id && styles["planet--selected"]}`}
            onClick={() => handleClickOfPlanet(planet.id)}
          >
            <img src={planet.pictureUrl || "default_planet_image.png"} alt={planet.name || "Unnamed planet"} className={styles["planet__image"]} />
            <div className={styles["planet__info"]}>
              <span>{planet.name || "No name"}</span>
              <span>{planet.currentPopulation || "Unknown population"}</span>
            </div>
          </div>
          <div className={styles["planet__spacecrafts"]}>
            {planet.spacecrafts.map((spacecraft) => (
              <div
                key={spacecraft.id}
                className={`${styles["planet__spacecraft"]}`}
                onClick={() => handleClickOfSpacecraft(spacecraft.id, planet.id)}
              >
                <img src={spacecraft.pictureUrl || "default_spacecraft_image.png"} alt={spacecraft.name || "Unnamed spacecraft"} />
                <div>{spacecraft.name || "No name"}</div>
                <div>Capacity: {spacecraft.capacity || "Unknown capacity"}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Planets;

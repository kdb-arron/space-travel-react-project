import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SpacecraftBuild.module.css";
import { LoadingContext } from "../../context/LoadingProvider";
import SpaceTravelApi from "../../services/SpaceTravelApi";

function SpacecraftBuild() {
  const INITIAL_SPACECRAFT = {
    name: "",
    capacity: "",
    description: "",
    pictureUrl: "",
  };
  const [spacecraft, setSpacecraft] = useState(INITIAL_SPACECRAFT);
  const [errors, setErrors] = useState([]);
  const { enableLoading, disableLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  const handleChangeOfFormInput = (event) => {
    setSpacecraft({
      ...spacecraft,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const errorList = [];
    if (!spacecraft.name) errorList.push("Name is required");
    if (!spacecraft.capacity || isNaN(spacecraft.capacity)) errorList.push("Valid capacity is required");
    if (!spacecraft.description) errorList.push("Description is required");
    setErrors(errorList);
    return errorList.length === 0;
  };

  const handleSubmitOfForm = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    enableLoading();
    const { isError } = await SpaceTravelApi.buildSpacecraft({
      name: spacecraft.name,
      capacity: parseInt(spacecraft.capacity, 10),
      description: spacecraft.description,
      pictureUrl: spacecraft.pictureUrl || undefined,
    });
    if (!isError) navigate("/spacecrafts");
    disableLoading();
  };

  return (
    <>
      <button className={styles["button__back"]} onClick={() => navigate(-1)}>
        Back 👈
      </button>
      <form onSubmit={handleSubmitOfForm}>
        <div className={styles["form"]}>
          <div className={styles["form__inputs"]}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={spacecraft.name}
              onChange={handleChangeOfFormInput}
            />
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={spacecraft.capacity}
              onChange={handleChangeOfFormInput}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={spacecraft.description}
              onChange={handleChangeOfFormInput}
            />
            <input
              type="text"
              name="pictureUrl"
              placeholder="Picture URL"
              value={spacecraft.pictureUrl}
              onChange={handleChangeOfFormInput}
            />

            {/* Image Preview */}
            {spacecraft.pictureUrl && (
              <div className={styles["image-preview"]}>
                <img
                  src={spacecraft.pictureUrl}
                  alt="Spacecraft preview"
                  className={styles["image-preview__image"]}
                />
              </div>
            )}
          </div>
          <div className={styles["submitContainer"]}>
            {errors.length > 0 && (
              <div className={styles["errorContainer"]}>
                {errors.map((error, index) => (
                  <div key={index} className={styles["error"]}>
                    {error}
                  </div>
                ))}
              </div>
            )}
            <button type="submit">Build 🏗️</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SpacecraftBuild;

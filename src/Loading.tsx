import react from "react";
import { BsGearFill } from "react-icons/bs";
import { IconContext } from "react-icons";

const Loading = () => {
  return (
    <>
      <IconContext.Provider value={{ className: "loading-icon" }}>
        <div className="loading-icon-container">
          <BsGearFill />
        </div>
      </IconContext.Provider>
    </>
  );
};
export default Loading;

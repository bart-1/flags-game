import react from "react";
import useStore from "./Store";

const Winner = () => {
    const lang = useStore((state) => state.lang);
  const setStart = useStore((state) => state.setStart);
    
  return (
    <>
      <div className="winner">
        {lang === "pl" && (
          <div>
            <h1>Wygrana!</h1>
          </div>
        )}
        {lang === "en" && (
          <div>
            <h1>You win!</h1>
          </div>
              )}
              <button onClick={()=> setStart(false)}> Restart</button>
      </div>
    </>
  );
};
export default Winner;

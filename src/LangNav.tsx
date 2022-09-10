import react from "react";
import useStore from "./Store";

const LangNav = () => {
  const setLang = useStore((state) => state.setLang);
  const lang = useStore((state) => state.lang);

  return (
    <>
      <div className="lang-nav-container">
        {lang === "pl" && <span>{`Język: `}</span>}
        {lang === "en" && <span>{`Language: `}</span>}
        <div className="lang-nav-btn">
          <button
            className={lang === "pl" ? "active" : ""}
            onClick={() => setLang("pl")}>
            Polski
          </button>
          <button
            className={lang === "en" ? "active" : ""}
            onClick={() => setLang("en")}>
            English
          </button>
        </div>
      </div>
    </>
  );
};
export default LangNav;

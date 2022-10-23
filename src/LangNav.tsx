import react from "react";
import useInterfaceStore from "./InterfaceStore";

const LangNav = () => {
  const setLang = useInterfaceStore((state) => state.setLang);
  const lang = useInterfaceStore((state) => state.lang);

  return (
    <>
      <div className="lang-nav-container">
        {lang === "pl" && <span>{`Język: `}</span>}
        {lang === "en" && <span>{`Language: `}</span>}
        <div className="lang-nav-btn">
          <button
            className={`nav`}
            id={lang === "pl" ? "active" : ""}
            onClick={() => setLang("pl")}>
            Polski
          </button>
          <button
            id={lang === "en" ? "active" : ""}
            className={`nav`}
            onClick={() => setLang("en")}>
            English
          </button>
        </div>
      </div>
    </>
  );
};
export default LangNav;

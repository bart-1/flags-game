import react from 'react';
import useInterfaceStore from "./InterfaceStore";



const Footer = () => {
    const lang = useInterfaceStore(state => state.lang);
        return (
          <>
            <div className="footer">
              <span>
                
                {(lang === "pl" && `Quiz Flagi 1.2.6   | `) ||
                  (lang === "en" && `Flags Quiz 1.2.6   | `)}{" "}
                {(lang === "pl" && "Obrazy flag pochodzą ze strony") ||
                  (lang === "en" && "Pictures of flags from")}{" "}
                <a href="https://www.flagi-panstw.pl">
                  https://www.flagi-panstw.pl
                </a>
              </span>
            </div>
          </>
        );
};
export default Footer;

import react from 'react';
import useStore from './Store';



const Footer = () => {
    const lang = useStore(state => state.lang);
        return (
          <>
            <div className="footer">
              <span>
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

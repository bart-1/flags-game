import react from "react";
import useFetchStore, { FlagType } from "./FetchStore";
import useFlagsDeckStore from "./FlagsDeckStore";
import ResultBoard from "./ResultBoard";
import useInterfaceStore from "./InterfaceStore";

const Quiz = () => {
  const quizFlagNumber = useFlagsDeckStore((state) => state.quizFlag);

  const flags = useFetchStore((state) => state.flagsArray);
  const lang = useInterfaceStore((state) => state.lang);

  const pluralVerb = [
    "ae",
    "ag",
    "ax",
    "ba",
    "bm",
    "bq",
    "bs",
    "cc",
    "ck",
    "cn",
    "cz",
    "de",
    "fk",
    "fo",
    "hm",
    "in",
    "it",
    "hu",
    "km",
    "ky",
    "mh",
    "mp",
    "mv",
    "ph",
    "sb",
    "sc",
    "sh",
    "sj",
    "st",
    "tc",
    "tf",
    "tt",
    "um",
    "vc",
    "vg",
    "vi",
    "wf",
  ];

  const isPluralVerb = () => {
    const test = pluralVerb.filter((el) => el === flags[quizFlagNumber].prefix);
    if (test.length > 0) return true;
    else return false;
  };

  return (
    <>
      <div className="quiz-container">
        <div className="quiz">
          <span>
            {(lang === "pl" && (
              <>
                <span>Wskaż jaką flagę {isPluralVerb() ? "mają" : "ma"} </span>
                <span className="quiz-flag-name">
                  {flags[quizFlagNumber].pl}
                </span>
              </>
            )) ||
              (lang === "en" && (
                <>
                  <span>Point to the flag of </span>
                  <span className="quiz-flag-name">
                    {flags[quizFlagNumber].en}
                  </span>
                </>
              ))}
          </span>
        </div>
        <ResultBoard />
      </div>
    </>
  );
};
export default Quiz;

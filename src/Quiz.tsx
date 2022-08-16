import react, { ReactNode, useEffect, useState } from "react";
import useFetchStore from "./FetchStore";
import ResultBoard from "./ResultBoard";
import useStore from "./Store";

interface QuizProps {
  // quizOutput: (flag: FlagType) => void;
  rand: number;
}

const Quiz = ({ rand }: QuizProps) => {
  const flags = useFetchStore((state) => state.flagsArray);
  const lang = useStore((state) => state.lang);

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
    const test = pluralVerb.filter((el) => el === flags[rand].prefix);
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
                <span className="quiz-flag-name">{flags[rand].pl}</span>
              </>
            )) ||
              (lang === "en" && (
                <>
                  <span>Show flag of </span>
                  <span className="quiz-flag-name">{flags[rand].en}</span>
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

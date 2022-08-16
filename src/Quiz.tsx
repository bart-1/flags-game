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

  return (
    <>
      <div className="quiz-container">
        <div className="quiz">
          <span>
            {(lang === "pl" && (
              <>
                <span>Wskaż jaką flagę ma </span>
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

import react, { ReactNode, useEffect, useState } from "react";
import useFetchStore from "./FetchStore";
import ResultBoard from "./ResultBoard";
import useStore from "./Store";

interface QuizProps {
    // quizOutput: (flag: FlagType) => void;
    rand: number
}

const Quiz = ({ rand }: QuizProps) => {
//   const randomInteger = useStore((state) => state.randomInteger);
  const flags = useFetchStore((state) => state.flagsArray);
  const lang = useStore((state) => state.lang);

//   const [rand, setRand] = useState(0);

//   useEffect(() => {
//     setRand(randomInteger(0, flags.length));
//   }, []);

//   useEffect(() => {
//     quizOutput(flags[rand]);
//   }, [rand]);

 

  return (
    <>
      <div className="quiz">
        <h1>
          {" "}
          {(lang === "pl" && flags[rand].pl) ||
            (lang === "en" && flags[rand].en)}{" "}
        </h1>
        <ResultBoard />
      </div>
    </>
  );
};
export default Quiz;

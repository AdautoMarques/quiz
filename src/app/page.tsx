"use client";

import { QuestionItem } from "@/components/QuestionItem";
import { Results } from "@/components/Results";
import { questions } from "@/data/questions";
import { useState } from "react";

const Home = () => {
  const title = "Quiz do Judaísmo";
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const loadNextQuestion = () => {
    if (questions[currentQuestion + 1]) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartButton = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const handleAnswered = (answer: number) => {
    setAnswers([...answers, answer]);
    loadNextQuestion();
  };

  return (
    <div className=" w-full h-screen flex justify-center items-center bg-amber-50">
      <div className="w-full max-w-xl rounded-md bg-stone-300 text-gray-800 shadow-slate-400">
        <div className="p-5 font-bold text-2xl ">{title}</div>
        <div className="p-5">
          {!showResult && (
            <QuestionItem
              question={questions[currentQuestion]}
              count={currentQuestion + 1}
              onAnswer={handleAnswered}
            />
          )}
          {showResult && <Results questions={questions} answers={answers} />}
        </div>
        <div className="p-5 text-center border-t border-stone-500">
          {!showResult &&
            `
              ${currentQuestion + 1} de ${questions.length} Pergunta${
              questions.length === 1 ? "" : "s"
            }
            `}

          {showResult && (
            <button
              onClick={handleRestartButton}
              className="px-3 py-2 rounded-md border border-amber-600 bg-amber-200"
            >
              Reiniciar Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

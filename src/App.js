import React, { useState } from "react";
import Onboarding from "./screens/Onboarding";
import QuizStep1 from "./screens/QuizStep1";
import QuizStep2 from "./screens/QuizStep2";
import QuizStep3 from "./screens/QuizStep3";
import QuizStep4 from "./screens/QuizStep4";
import QuizResult from "./screens/QuizResult";
import QuizStep5 from "./screens/QuizStep5";
import QuizStep6 from "./screens/QuizStep6";
import QuizStep7 from "./screens/QuizStep7";
import QuizStep8 from "./screens/QuizStep8";
import QuizStep9 from "./screens/QuizStep9";
import QuizStep10 from "./screens/QuizStep10";
import QuizStep11 from "./screens/QuizStep11";
import QuizStep12 from "./screens/QuizStep12";
import QuizFinalReport from "./screens/QuizFinalReport";
import Paywall from "./screens/Paywall";
import Success from "./screens/Success";

function App() {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState(""); // Добавляем состояние для username
  const [quizAnswers, setQuizAnswers] = useState({}); // Для сохранения всех ответов

  // Функция для сохранения ответов
  const handleAnswer = (stepIndex, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [stepIndex]: answer
    }));
  };

  if (step === 0) return <Onboarding onStart={() => setStep(1)} />;
  
  if (step === 1) return (
    <QuizStep1 
      onContinue={(answer) => {
        handleAnswer(1, answer);
        setStep(2);
      }} 
    />
  );
  
  if (step === 2) return (
    <QuizStep2 
      onContinue={(userInputUsername) => {
        setUsername(userInputUsername); // Сохраняем username
        handleAnswer(2, userInputUsername);
        setStep(3);
      }} 
    />
  );
  
  if (step === 3) return (
    <QuizStep3 
      onContinue={(answer) => {
        handleAnswer(3, answer);
        setStep(4);
      }} 
    />
  );
  
  if (step === 4) return (
    <QuizStep4 
      onContinue={(answer) => {
        handleAnswer(4, answer);
        setStep(5);
      }} 
    />
  );
  
  if (step === 5) return (
    <QuizResult 
      username={username} // Передаем username в QuizResult тоже
      onShowReport={() => setStep(6)} 
    />
  );
  
  if (step === 6) return (
    <QuizStep5 
      onContinue={(answer) => {
        handleAnswer(5, answer);
        setStep(7);
      }} 
    />
  );
  
  if (step === 7) return (
    <QuizStep6 
      onContinue={(answer) => {
        handleAnswer(6, answer);
        setStep(8);
      }} 
    />
  );
  
  if (step === 8) return (
    <QuizStep7 
      onContinue={(answer) => {
        handleAnswer(7, answer);
        setStep(9);
      }} 
    />
  );
  
  if (step === 9) return (
    <QuizStep8 
      onContinue={(answer) => {
        handleAnswer(8, answer);
        setStep(10);
      }} 
    />
  );
  
  if (step === 10) return (
    <QuizStep9 
      onContinue={(answer) => {
        handleAnswer(9, answer);
        setStep(11);
      }} 
    />
  );
  
  if (step === 11) return (
    <QuizStep10 
      onContinue={(answer) => {
        handleAnswer(10, answer);
        setStep(12);
      }} 
    />
  );
  
  if (step === 12) return (
    <QuizStep11 
      onContinue={(answer) => {
        handleAnswer(11, answer);
        setStep(13);
      }} 
    />
  );
  
  if (step === 13) return (
    <QuizStep12 
      username={username} // Передаем username в QuizStep12! 🎯
      onContinue={() => setStep(14)} 
    />
  );
  
  if (step === 14) return (
    <QuizFinalReport 
      username={username} // Тоже передаем в отчет
      answers={quizAnswers} // И все ответы
      onShowPaywall={() => setStep(15)} 
    />
  );
  
  if (step === 15) return <Paywall onPurchase={() => setStep(16)} />;
  if (step === 16) return <Success />;
  
  return null;
}

export default App;

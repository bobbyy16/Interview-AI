import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({ mockInterviewQuestions, activeQuestion }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("your browser does not support text to speech");
    }
  };
  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
            <h2
              className={`p-2 border rounded-full text-xs md:text-sm text-center cursor-pointer 
                ${activeQuestion == index && "bg-primary text-white"}`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>
      <h2 className="my-5 text-sm md:text-lg">
        {mockInterviewQuestions[activeQuestion]?.question}
      </h2>
      <Volume2
        onClick={() =>
          textToSpeech(mockInterviewQuestions[activeQuestion]?.question)
        }
        className="cursor-pointer"
      />
      <div className="p-5 rounded-lg border bg-secondary mt-20">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
};

export default QuestionsSection;

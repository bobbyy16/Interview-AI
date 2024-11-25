"use client";
import { db } from "@/utils/db";
import { MockupInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection ";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const resolvedParams = React.use(params);
  const [interviewData, setInterviewData] = useState("");
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(MockupInterview)
        .where(eq(MockupInterview.mockId, resolvedParams.interviewId));
      const jsonResponse = JSON.parse(result[0].jsonMockResp);
      setMockInterviewQuestions(jsonResponse);
      setInterviewData(result[0]);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
        />

        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestion > 0 && (
          <Button
            onClick={() => {
              setActiveQuestion(activeQuestion - 1);
            }}
          >
            Previous Question
          </Button>
        )}
        {activeQuestion != mockInterviewQuestions?.length - 1 && (
          <Button
            onClick={() => {
              setActiveQuestion(activeQuestion + 1);
            }}
          >
            Next Question
          </Button>
        )}
        {activeQuestion == mockInterviewQuestions?.length - 1 && (
          <Link
            href={"/dashboard/interview/" + interviewData?.MockId + "/feedback"}
          >
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;

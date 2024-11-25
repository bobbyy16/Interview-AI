"use client";

import { db } from "@/utils/db";
import { userAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const resolvedParams = React.use(params);
  const [feedbackList, setFeedbackList] = useState([]);

  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(userAnswer)
      .where(eq(userAnswer.mockIdRef, resolvedParams.interviewId))
      .orderBy(userAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };
  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          {" "}
          No Interview Feedback Founded Here
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer , Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <div>
                <Collapsible key={index} className="mt-7">
                  <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between gap-7 w-full my-2 text-left">
                    {item.question} <ChevronsUpDownIcon className="h-5 w-5" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="flex flex-col gap-2">
                      <h2 className="text-red-500 p-2 border rounded-lg">
                        <strong>Rating:</strong>
                        {item.rating}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                        <strong>Your Answer:</strong>
                        {item.userAnswer}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                        <strong>Correct Answer:</strong>
                        {item.correctAnswer}
                      </h2>
                      <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                        <strong>Feedback:</strong>
                        {item.feedback}
                      </h2>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
        </>
      )}
      <Button onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
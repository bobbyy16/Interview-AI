"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { MockupInterview } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "@/utils/db";
import InterviewItemCard from "./InterviewItemCard";

const InterviewList = () => {
  const { user } = useUser();

  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(MockupInterview)
      .where(
        eq(MockupInterview.createdBy, user?.primaryEmailAddress.emailAddress)
      )
      .orderBy(desc(MockupInterview.id));
    console.log(result);
    setInterviewList(result);
  };
  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((list, index) => (
            <InterviewItemCard key={index} list={list} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;

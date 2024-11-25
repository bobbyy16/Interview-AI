"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { MockupInterview } from "@/utils/schema";

const AddNew = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobTitle, setJobTitle] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState([]);

  const { user } = useUser();

  async function onSubmit(e) {
    setLoading(true);
    e.preventDefault();
    console.log(jobTitle, jobDescription, jobExperience);

    const InputPrompt = `jobTitle: ${jobTitle}, 
                        jobDescription: ${jobDescription}, 
                        jobExperience: ${jobExperience},
                        based on the details, generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in json format`;

    const result = await chatSession.sendMessage(InputPrompt);

    const replaceResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(replaceResponse));
    setAiResponse(replaceResponse);

    if (replaceResponse) {
      const response = await db
        .insert(MockupInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: replaceResponse,
          jobPosition: jobTitle,
          jobDescription: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({
          mockId: MockupInterview.mockId,
        });

      console.log("Inserted ID:", response);
    } else {
      console.log("error");
    }

    setLoading(false);
  }

  return (
    <div>
      <div
        className="py-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-xl text-center">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about this Interview
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Add details about your job/position, job description, and year of
            experience.
          </DialogDescription>
          <form onSubmit={onSubmit}>
            <div className="mt-7 my-3">
              <label htmlFor="job-role">Job Role/Job Position</label>
              <Input
                id="job-role"
                placeholder="Ex. Full Stack developer"
                onChange={(e) => setJobTitle(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="job-description">
                Job Description/Tech Stack (In Short)
              </label>
              <Textarea
                id="job-description"
                placeholder="Ex. MERN Stack"
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>
            <div className="my-3">
              <label htmlFor="experience">Years of Experience</label>
              <Input
                id="experience"
                type="number"
                placeholder="Ex. 5"
                onChange={(e) => setJobExperience(e.target.value)}
                max="50"
                required
              />
            </div>
            <div className="flex gap-5 justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating from ai
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNew;

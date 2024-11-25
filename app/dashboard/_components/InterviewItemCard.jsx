import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const InterviewItemCard = ({ list }) => {
  const router = useRouter();

  function onStart() {
    router.push("/dashboard/interview/" + list?.mockId);
  }

  function onFeedback() {
    router.push("/dashboard/interview/" + list?.mockId + "/feedback");
  }

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{list?.jobPosition}</h2>
      <h2 className=" text-sm text-gray-600">
        {list?.jobExperience} Years of experience
      </h2>
      <h2 className="text-xs text-gray-400">created At: {list?.createdAt}</h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button
          size="sm"
          className="w-full"
          variant="outline"
          onClick={onFeedback}
        >
          {" "}
          FeedBack
        </Button>
        <Button size="sm" className="w-full" onClick={onStart}>
          start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;

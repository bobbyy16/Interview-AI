import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  NetworkIcon,
  RocketIcon,
  CheckCircle2Icon,
} from "lucide-react";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Your Interviews with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get realistic mock interviews powered by AI. Receive instant
            feedback and improve your skills.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href={"/dashboard"}>
              <Button size="lg" className="bg-primary hover:bg-primary-700">
                Start Mock Interview <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <NetworkIcon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">
                AI-Powered Interviews
              </h3>
              <p className="text-gray-600">
                Realistic interview simulations tailored to your field
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <RocketIcon className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-semibold mb-2">Instant Feedback</h3>
              <p className="text-gray-600">
                Detailed analysis of your performance and improvement areas
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <CheckCircle2Icon
                className="mx-auto mb-4 text-primary"
                size={48}
              />
              <h3 className="text-xl font-semibold mb-2">
                Multiple Industries
              </h3>
              <p className="text-gray-600">
                Interviews for tech, finance, marketing, and more
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-primary text-white py-16 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of professionals who have improved their interview
            skills
          </p>
          <Link href={"/dashboard"}>
            <Button size="lg" variant="secondary">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;

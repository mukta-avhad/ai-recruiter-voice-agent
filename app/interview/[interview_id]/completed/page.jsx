"use client";
import { CheckCircle2, Send } from "lucide-react";
import Image from "next/image";

export default function InterviewCompleted() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-5">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-md p-10 text-center border border-gray-100">
        {/* ✅ Success Icon and Title */}
        <div className="flex flex-col items-center justify-center mb-8">
          <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Interview Complete!
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Thank you for participating in the AI-driven interview with{" "}
            <b>AIcruiter</b>.
          </p>
        </div>

        {/* ✅ Image Section */}
        <div className="flex justify-center mb-8">
          <Image
            src="/interview_complete.png"
            alt="Interview Complete"
            width={600}
            height={300}
            className="rounded-xl"
          />
        </div>

        {/* ✅ What's Next */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold flex items-center justify-center gap-2 mb-3">
            <Send className="w-6 h-6 text-primary" /> What’s Next?
          </h2>
          <p className="text-gray-600 mb-10">
            The recruiter will review your interview responses and contact you
            soon regarding the next steps.
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} AIcruiter. All rights reserved.
      </p>
    </div>
  );
}

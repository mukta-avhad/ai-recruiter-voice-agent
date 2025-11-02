"use client"
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Loader2Icon, Mic, Phone, Timer } from "lucide-react";
import React, { useContext, useEffect, useState, useRef} from 'react'
import Image from "next/image";
import Vapi from '@vapi-ai/web';
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useRouter, useParams } from "next/navigation";



function StartInterview() {
  const {interviewInfo, setInterviewInfo}=useContext(InterviewDataContext);

  const vapiRef = useRef(null);
  const [activeUser, setActiveUser]=useState(false);
  const [conversation, setConversation]=useState();
  const {interview_id}=useParams();
  const router=useRouter();
  const [loading, setLoading] = useState();

useEffect(() => {
    // Create only once
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
      attachVapiListeners();
    }
  }, []);

  useEffect(() => {
    if (interviewInfo) startCall();
  }, [interviewInfo]);

  const attachVapiListeners = () => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    vapi.on("call-start", () => toast('Call Connected...'));
    vapi.on("speech-start", () => setActiveUser(false));
    vapi.on("speech-end", () => setActiveUser(true));
    vapi.on("call-end", () => {
      toast('Interview Ended');
      GenerateFeedback();
    });
    vapi.on("message", (message) => setConversation(message?.conversation));
  };

  const startCall = () => {
    const vapi = vapiRef.current;
    if (!vapi) return;

    let questionList = "";
    interviewInfo?.interviewData?.questionList.forEach((item) => {
      questionList += item?.question + ",";
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "playht", voiceId: "jennifer" },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an AI recruiter... Questions: ${questionList}`,
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    const vapi = vapiRef.current;
    if (vapi) {
      console.log("Attempting to stop call...");
      vapi.stop();
    } else {
      console.error("Vapi instance not found!");
    }
  };

  // your GenerateFeedback() stays same

  const GenerateFeedback =async()=>{
    const result=await axios.post('/api/ai-feedback',{
           conversation:conversation
    });

    console.log(result?.data);
    const Content = result.data.content;
    const FINAL_CONTENT = Content.replace('```json','').replace('```','')
    console.log(FINAL_CONTENT);

    const {data, error} = await supabase
    .from('interview-feedback')
    .insert([
      {
        userName: interviewInfo?.userName,
        userEmail: interviewInfo?.userEmail,
        interview_id:interview_id,
        feedback:JSON.parse(FINAL_CONTENT),
        recommended:false
      },
    ])
    .select();
     console.log(data);
     router.replace('/interview/'+interview_id+"/completed");
  }

  return (
    <div className="p-20 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between">AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer/> 00:00:00
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
        <div className='bg-white h-[400px] rounded-lg border flex relative flex-col gap-3 items-center justify-center'>
          <div className="relative">
            {!activeUser && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"/>}
            <Image src={'/ai.png'} alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-cover' />
          </div>
          <h2> AI Recruiter</h2>
        </div>

        <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
          <div className="relative">
            {activeUser && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"/>}
            <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'> {interviewInfo?.userName[0]}</h2>
          </div>
          <h2> {interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className='flex items-center gap-5 justify-center mt-7'>
        <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer'/>
        <AlertConfirmation stopInterview={stopInterview}>
        { !loading ? <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer'
        onClick={()=>stopInterview()} 
        /> : <Loader2Icon className='animate-spin' />}
        </AlertConfirmation> 
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'>Interview in Progress...</h2>
    </div>
  )
}

export default StartInterview
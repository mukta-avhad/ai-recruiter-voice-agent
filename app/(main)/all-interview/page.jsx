"use client"

import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Camera, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { toast } from 'sonner';


function AllInterview() {
     const [interviewList, setInterviewList]=useState([]);
    const {user}=useUser();

    useEffect(()=>{
        user && GetInterviewList();
    }, [user])
     
    const GetInterviewList = async()=>{
        let{data: Interviews, error} = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail',user?.email)
        .order('id', {ascending:false})
      

        ;

        console.log(Interviews);
        setInterviewList(Interviews);
    }
          
   

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl'> All Previously Created Interviews</h2>
        
        {interviewList?.length==0&&
        <div className='p-5 flex flex-col gap-3 items-center p-5'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You don't have any interview created</h2>
            <Button> + Create New Interview</Button>
            </div>}
         {interviewList&&
         <div className='grid grid-cols-2 mt-5 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
            {interviewList.map((interview,index)=>(
                <InterviewCard interview={interview} key={index}/>
            ))}
            </div>
         }


        </div>
    )
}


export default AllInterview
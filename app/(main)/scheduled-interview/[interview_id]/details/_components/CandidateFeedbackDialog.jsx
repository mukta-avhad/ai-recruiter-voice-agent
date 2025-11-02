import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

import { Progress } from "@/components/ui/progress"


function CandidateFeedbackDialog({candidate}) {
    const feedback = candidate?.feedback?.feedback

    return(
      <Dialog>
  <DialogTrigger asChild><Button variant="outline" className="text-primary">View Report</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Feedback</DialogTitle>
      <DialogDescription asChild>
        <div className='mt-5'>      
            <div className='flex justify-between item-center'>
               <div className='flex items-center gap-5'>
                     <h2 className='bg-primary p-3 px-4 rounded-full'>{candidate.userName[0]}</h2>
                                     
                          <div>
                       <h2 className='font-bold'>{candidate?.userName}</h2>
                      <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                        </div>
            
                     </div>
                <div className='flex gap-3 items-center'>
              <h2 className='text-primary text-2xl font-bold'>6/10</h2>
                   </div>
                  </div>
                  <div>
                
                    <h2 className='font-bold mt-5'> Skills Assesment</h2>
                    <div className='mt-3 grid grid-cols-2 gap-10'>


                      <div className='mt-5'>
                        <h2 className='flex justify-between'> Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                        <Progress value={feedback?.rating?.technicalSkills * 10}/>
                      </div>

                          <div className='mt-5'>
                        <h2 className='flex justify-between'> Communication Skills <span>{feedback?.rating?.communication}/10</span></h2>
                        <Progress value={feedback?.rating?.communication * 10}/>
                      </div>

                       <div className='mt-5'>
                        <h2 className='flex justify-between'> Problem Solving <span>{feedback?.rating?.problemSolving}/10</span></h2>
                        <Progress value={feedback?.rating?.problemSolving * 10}/>
                      </div>

                          <div className='mt-5'>
                        <h2 className='flex justify-between'> Experience <span> {feedback?.rating?.experience}/10</span></h2>
                        <Progress value={feedback?.rating?.experience * 10}/>
                      </div>
                        
                    </div>
                  </div>

                  <div className='mt-5'>
                    <h2 className='font-bold'>Performance Summary</h2>
                    <div className='p-5 bg-secondary my-3 rounded-2xl'>
                   <p className="whitespace-pre-line">
                      {feedback?.summary || "No summary available."}
                            </p>

                     
                    </div>      
                  </div>
                  <div
  className={`p-5 rounded-md flex items-center justify-between ${
    feedback?.recommendation === 'Not Recommended'
      ? 'bg-red-100'
      : 'bg-green-100'
  }`}
>
  <div>
    <h2
      className={`font-bold ${
        feedback?.recommendation === 'Not Recommended'
          ? 'text-red-600'
          : 'text-green-600'
      }`}
    >
      Recommendation Msg:
    </h2>
    <p
      className={`mt-2 ${
        feedback?.recommendation === 'Not Recommended'
          ? 'text-red-500'
          : 'text-green-600'
      }`}
    >
      {feedback?.recommendationMsg || 'No recommendation message provided.'}
    </p>
  </div>

  <Button
    className={`px-5 ${
      feedback?.recommendation === 'Not Recommended'
        ? 'bg-red-500 hover:bg-red-600'
        : 'bg-green-500 hover:bg-green-600'
    } text-white`}
  >
    Send Msg
  </Button>
</div>

                  </div>
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
       
    )
}

export default CandidateFeedbackDialog
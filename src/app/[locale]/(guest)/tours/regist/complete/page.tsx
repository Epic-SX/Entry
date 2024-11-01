'use client';

import React from 'react'
import { CompletedStep } from '../_component/step';
import { useRouter } from 'next/navigation';

const TourResgistCompleted = () => {
  const router = useRouter();
  const handleBackAfterCompleted = () => {
    router.push('https://www.yamata-youchien.com/')
    //router.push('/');
  }
  return (
    <div className="p-4">
      <div className="card">
        <div className="card-body">
          <CompletedStep onBack={handleBackAfterCompleted} />
        </div>
      </div>
    </div>
  )
}

export default TourResgistCompleted;
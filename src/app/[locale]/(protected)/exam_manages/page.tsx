import { Translation } from '@/components';
import React from 'react';

const ExamManages = () => {
  return (
    <div className="container">
      <div className="pt-3">
        <h3 className="text-secondary">
          <Translation
            translationKey='PageTitle'
            render={t => t('schedules')}
          />
        </h3>
      </div>
    </div>
  )
}

export default ExamManages;
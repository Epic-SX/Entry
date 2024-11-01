import { Translation } from '@/components';
import React from 'react'

const Schedules = () => {
  return (
    <div className="container">
      <div className="pt-3">
        <h3 className="text-secondary">
          <Translation
            translationKey='PageTitle'
            render={t => t('exam_manages')}
          />
        </h3>
      </div>
    </div>
  )
}

export default Schedules;
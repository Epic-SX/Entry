import { LoadingSkeleton } from '@/components';
import React from 'react'

const ProtectedLayoutLoading = () => {
  return (
    <LoadingSkeleton count={7} />
  )
}

export default ProtectedLayoutLoading;
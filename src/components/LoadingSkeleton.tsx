import React, { FC } from 'react';
import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

type Props = SkeletonProps;

const LoadingSkeleton: FC<Props> = (props) => {
    return (
        <Skeleton {...props} />
    )
}

export default LoadingSkeleton;
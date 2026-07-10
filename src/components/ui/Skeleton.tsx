'use client';

import React from 'react';

export interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);
Skeleton.displayName = 'Skeleton';

export default Skeleton;
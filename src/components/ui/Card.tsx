'use client';

import React, { type ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);
Card.displayName = 'Card';

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
    {children}
  </div>
);
CardHeader.displayName = 'CardHeader';

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold leading-tight ${className}`}>
    {children}
  </h3>
);
CardTitle.displayName = 'CardTitle';

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);
CardContent.displayName = 'CardContent';

export default Card;
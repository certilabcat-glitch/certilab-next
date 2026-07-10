'use client';

import React from 'react';

export interface SeparatorProps {
  className?: string;
}

const Separator: React.FC<SeparatorProps> = ({ className = '' }) => (
  <hr className={`border-t border-gray-200 ${className}`} />
);
Separator.displayName = 'Separator';

export default Separator;
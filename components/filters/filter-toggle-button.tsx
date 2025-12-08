"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FilterToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  activeFilterCount?: number;
  className?: string;
}

export function FilterToggleButton({
  isOpen,
  onToggle,
  className = ''
}: FilterToggleButtonProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-blue-600 ${className}`}
      aria-label={isOpen ? 'Hide filters' : 'Show filters'}
    >
      {isOpen ? 'Hide' : 'Show'}
      {isOpen ? (
        <ChevronLeft className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </button>
  );
}

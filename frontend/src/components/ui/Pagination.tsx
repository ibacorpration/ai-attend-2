import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
      <Button 
        variant="secondary" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{ padding: '0.5rem' }}
      >
        <ChevronLeft size={18} />
      </Button>
      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        Page {currentPage} of {totalPages}
      </span>
      <Button 
        variant="secondary" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{ padding: '0.5rem' }}
      >
        <ChevronRight size={18} />
      </Button>
    </div>
  );
};

import React from 'react';
import { Table as HeroTable, TableHeader, TableColumn, TableBody, TableRow as HeroTableRow, TableCell as HeroTableCell } from '@heroui/react';

interface TableProps {
  headers: React.ReactNode[];
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <HeroTable 
      aria-label="Data Table" 
      classNames={{ wrapper: "shadow-none border border-border-light bg-surface rounded-xl" }}
    >
      <TableHeader>
        {headers.map((h, i) => (
          <TableColumn key={i} className="bg-canvas text-ink/70 font-semibold text-sm">
            {h}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {children as any}
      </TableBody>
    </HeroTable>
  );
};

export const TableRow = HeroTableRow;
export const TableCell = HeroTableCell;

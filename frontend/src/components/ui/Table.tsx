import React from 'react';

interface TableProps {
  headers: React.ReactNode[];
  children: React.ReactNode;
}

export const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #E5E7EB', color: 'var(--text-secondary)' }}>
            {headers.map((h, i) => (
              <th key={i} style={{ padding: '1rem', fontWeight: 600 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
    {children}
  </tr>
);

export const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>
    {children}
  </td>
);

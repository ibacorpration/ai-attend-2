import React from 'react';
import { Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Message } from '@/types/message';

interface MessageInboxProps {
  messages: Message[];
  onMarkAsRead: (id: number) => void;
}

export const MessageInbox: React.FC<MessageInboxProps> = ({ messages, onMarkAsRead }) => {
  return (
    <Card style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Mail /> Inbox
      </h3>
      {messages.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No messages yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                padding: '1rem', 
                background: msg.read_at ? '#F9FAFB' : '#FFF',
                border: `1px solid ${msg.read_at ? '#E5E7EB' : 'var(--accent-primary)'}`,
                borderRadius: '0.5rem',
                cursor: msg.read_at ? 'default' : 'pointer',
              }}
              onClick={() => !msg.read_at && onMarkAsRead(msg.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {msg.sender} 
                  {!msg.read_at && <span style={{ width: 8, height: 8, background: 'var(--accent-primary)', borderRadius: '50%' }} />}
                </strong>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
              <p style={{ color: 'var(--text-primary)' }}>{msg.body}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

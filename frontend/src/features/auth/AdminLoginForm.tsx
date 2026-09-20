import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuth } from './useAuth';
import { useToast } from '@/context/ToastContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const AdminLoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setAdminToken } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const { access_token } = await authService.login(formData);
      setAdminToken(access_token);
      showToast('Login successful', 'SUCCESS');
      navigate('/admin');
    } catch (error: any) {
      showToast(error.response?.data?.detail || 'Invalid credentials', 'ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2 style={{ textAlign: 'center', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Admin Access</h2>
      
      <Input 
        label="Username"
        type="text" 
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      
      <Input 
        label="Password"
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <Button 
        type="submit" 
        style={{ marginTop: '1rem' }}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
        {isLoading ? 'Authenticating...' : 'Login'}
      </Button>
    </form>
  );
};

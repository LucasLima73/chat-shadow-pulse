
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl font-bold mb-4">Mensagens Anônimas para WhatsApp</h1>
        <p className="text-xl text-gray-600 mb-8">
          Envie mensagens anônimas para qualquer número do WhatsApp de forma segura e privada.
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate('/auth')}
        >
          Começar Agora
        </Button>
      </div>
    </div>
  );
};

export default Index;

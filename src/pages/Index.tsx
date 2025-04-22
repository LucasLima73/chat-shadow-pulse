
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

const EVOLUTION_API_URL = "http://82.29.57.79:8080/v1/messages";
const DEVICE_API_KEY = "DD9E3CEFE38C-41C1-BF9D-061CFD8705DF";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call EvolutionAPI to send WhatsApp message
      const payload = {
        number: phoneNumber,
        message: message,
      };

      const response = await fetch(EVOLUTION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: DEVICE_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Mensagem enviada com sucesso!');
        setPhoneNumber('');
        setMessage('');
      } else {
        // Most APIs will have an error message, show it if available
        toast.error(
          data?.message
            ? `Erro ao enviar: ${data.message}`
            : 'Erro ao enviar mensagem.'
        );
      }
    } catch (error) {
      toast.error('Erro de conexão ao enviar mensagem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Mensagem Anônima</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Número do WhatsApp (ex: 5511999999999)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              inputMode="numeric"
            />
          </div>
          <div>
            <Textarea
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={4}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? 'Enviando...' : <>
              <Send className="w-4 h-4" /> Enviar Mensagem
            </>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;

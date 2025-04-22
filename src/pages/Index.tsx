import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send } from 'lucide-react';

// Updated to the new Evolution API URL with HTTPS
const EVOLUTION_API_URL = "https://evo.mao-amiga.site/v1/messages";
const DEVICE_API_KEY = "DD9E3CEFE38C-41C1-BF9D-061CFD8705DF";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validatePhoneNumber = (number: string) => {
    // Remover caracteres não numéricos
    const cleanedNumber = number.replace(/\D/g, '');
    
    // Verificar se o número tem entre 10 e 14 dígitos
    return cleanedNumber.length >= 10 && cleanedNumber.length <= 14;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar número de telefone
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('Número de telefone inválido. Verifique o número.');
      return;
    }

    // Validar mensagem
    if (message.trim().length === 0) {
      toast.error('Por favor, digite uma mensagem.');
      return;
    }

    setLoading(true);

    try {
      // Limpar número de telefone removendo caracteres não numéricos
      const cleanedNumber = phoneNumber.replace(/\D/g, '');

      const payload = {
        number: cleanedNumber,
        message: message,
      };

      console.log(`Enviando requisição para: ${EVOLUTION_API_URL}`);

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
        toast.error(
          data?.message
            ? `Erro ao enviar: ${data.message}`
            : 'Erro ao enviar mensagem.'
        );
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
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

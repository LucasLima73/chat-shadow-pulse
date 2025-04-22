
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import axios from 'axios';

// Atualizado para usar a instância teste2
const DEVICE_INSTANCE = "teste2";
const EVOLUTION_API_URL = `https://evo.mao-amiga.site/message/sendText/${DEVICE_INSTANCE}`;
const API_KEY = "429683C4C977415CAAFCCE10F7D57E11"; // API key adicionada

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(API_KEY);

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

    // Validar API key
    if (!apiKey.trim()) {
      toast.error('API Key não configurada. Por favor, adicione uma API Key válida.');
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

      console.log(`Enviando requisição para: ${EVOLUTION_API_URL} com axios`);

      const response = await axios.post(EVOLUTION_API_URL, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      });

      if (response.status === 200 && response.data) {
        toast.success('Mensagem enviada com sucesso!');
        setPhoneNumber('');
        setMessage('');
      } else {
        toast.error(
          response.data?.message
            ? `Erro ao enviar: ${response.data.message}`
            : 'Erro ao enviar mensagem.'
        );
      }
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);
      if (error.response?.data?.message) {
        toast.error(`Erro ao enviar: ${error.response.data.message}`);
      } else {
        toast.error('Erro de conexão ao enviar mensagem.');
      }
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
          <div>
            <Input 
              placeholder="API Key para autenticação"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
              className="mb-4"
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


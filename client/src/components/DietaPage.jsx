import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DietaPage = () => {
  const [loading, setLoading] = useState(true)
  const [isAuth, setIsAuth] = useState(false)
  const [inputValue, setInputValue] = useState('');
  const [serverMessage, setServerMessage] = useState(''); // estado pra mensagem
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/is-authenticated', {
      credentials: 'include' // necessário para enviar os cookies da sessão Flask
    })
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          navigate('/guestPage')  // redireciona se o usuário não estiver logado
        } else {
          setIsAuth(true)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error("Erro ao verificar autenticação:", err)
        navigate('/guestPage')
      })
  }, [navigate])

  if (loading) return <p>Verificando autenticação...</p>

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      alert('Por favor, digite algo antes de enviar.');
      return;
    }

    fetch('http://localhost:5000/members', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ texto: inputValue }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro na resposta do servidor');
        }
        return res.json();
      })
      .then((data) => {
        setServerMessage(data.resultado);  // salva a mensagem no estado
        setInputValue('');
      })
      .catch((err) => {
        console.error('Erro:', err);
        alert('Erro na requisição.');
      });
  };


  return (
    <>
    <div className="container">
      <h2>Área de pedidos de Dieta</h2>
      <p>Bem-vindo(a), você está autenticado!</p>
    </div>
    <div>
        <h1>Campo de Input</h1>
        <input
          type="text"
          placeholder="Digite algo..."
          value={inputValue}
          onChange={handleChange}
        />
        <p>Você digitou: {inputValue}</p>
      </div>
      <button onClick={handleSubmit}>Enviar</button>

      {/* Aqui mostramos a mensagem do servidor */}
      {serverMessage && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
          {serverMessage}
        </div>
      )}
    </>
  )
}

export default DietaPage
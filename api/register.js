const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { nome, email, senha, celular, cpf, dataNascimento } = req.body;

  if (!nome || !email || !senha || !celular || !cpf || !dataNascimento) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  const registroNovoUsuario = {
    nome,
    email: String(email).toLowerCase().trim(),
    senha,
    celular,
    cpf,
    dataNascimento,
    timestamp: new Date().toISOString(),
  };

  return res.status(201).json({
    sucesso: true,
    mensagem: `Usuário ${nome} cadastrado com sucesso!`,
    usuario: registroNovoUsuario,
  });
}

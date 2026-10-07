const form = document.getElementById('cadastroForm');
const mensagem = document.getElementById('mensagem');

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const dados = Object.fromEntries(formData.entries());

  const camposObrigatorios = [
    'nome',
    'email',
    'senha',
    'celular',
    'cpf',
    'dataNascimento',
  ];

  const faltando = camposObrigatorios.filter((campo) => !dados[campo] || !String(dados[campo]).trim());

  if (faltando.length > 0) {
    mostrarMensagem('Todos os campos são obrigatórios.', 'erro');
    return;
  }

  try {
    const resposta = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (!resposta.ok) {
      mostrarMensagem(resultado.erro || 'Erro ao cadastrar.', 'erro');
      return;
    }

    mostrarMensagem(resultado.mensagem || 'Cadastro realizado com sucesso!', 'sucesso');
    form.reset();
  } catch (erro) {
    mostrarMensagem('Não foi possível conectar ao servidor.', 'erro');
  }
});

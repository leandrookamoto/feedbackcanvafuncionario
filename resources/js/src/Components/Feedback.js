import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import Pagination from './Pagination';
import Canva from './Canva';
import Dialog from './Dialog';

// As props são enviadas para o App.js
export default function Feedback({
  listaCadastro,
  usuario,
  onChangeListaCadastro,
  onChangeNewId,
  onChangeDadosFuncionario,
  dados,
  idFuncionario2
}) {
  //Variáveis para gravação de estado
  const [listaFiltrada, setListaFiltrada] = useState([]);
  const [dadosFuncionario, setDadosFuncionario] = useState([]);
  const [idFuncionario, setIdFuncionario] = useState(null);
  const [funcionarioEscolhido, setFuncionarioEscolhido] = useState(false);
  const [avaliar, setAvaliar] = useState(false);
  const [historico, setHistorico] = useState(false);
  const [avaliar2, setAvaliar2] = useState(false);

  console.log('listaCadastro',listaCadastro)

  //Const para o Dialog de aviso
  const [validacaoApagar, setValidacaoApagar] = useState(false);

  //Descrição do Dialog
  const confirmaApagar = 'Tem certeza?';

  //Variáveis para o estilo do search input
  const estiloInput = {
    position: 'relative',
    display: 'inline-block',
  };
  const estiloIcone = {
    position: 'absolute',
    top: '50%',
    left: '10px',
    transform: 'translateY(-50%)',
    color: 'gray',
  };

  //Lógica para o controle da paginação
  const [page, setPage] = useState(1);
  var pageSize = 3;

  //Const para a formação da paginação
  const totalPage = Math.ceil(
    (listaFiltrada.length === 0 ? listaCadastro.length : listaFiltrada.length) /
      pageSize,
  );

  //Const para evitar a montagem inicial do useEffect
  const montagemInicial = useRef(true);
  //Const para evitar que o usuário apague
  const apagarRef = useRef(true);

  // UseEffect para renderizar manter os dados atualizados após a gravação ou edição do mesmo
 
  //useEffect para atualização da paginação
  useEffect(() => {
    setDadosFuncionario(listaCadastro)
  }, [listaCadastro]);
  //useEffect para atualização do avaliar
  useEffect(() => {
    setAvaliar(avaliar2);
  }, [avaliar2]);


  //Funções principais
  //Seleciona pelo clique no card
  function selecionarFuncionario(id) {
    const funcionarioSelecionado = listaCadastro.find(
      (funcionario) => funcionario.id === id,
    );
    if (funcionarioSelecionado) {
      setDadosFuncionario([funcionarioSelecionado]);
      setIdFuncionario(id);
      setPage(1);
      setListaFiltrada([funcionarioSelecionado]);
      setFuncionarioEscolhido(true);
    } else {
      console.error(`Funcionário com o ID ${id} não encontrado.`);
    }
  }
  //Função para apagar funcionário
  async function apagar() {
    //Impede que ocorra que o usuário apague acidentalmente
    if (apagarRef.current) {
      apagarRef.current = false;
      setValidacaoApagar(true);
      return;
    }
    setValidacaoApagar(true);
    if (validacaoApagar) {
      //If para apagar dentro do Dialog
      try {
        // Lógica para apagar o funcionário selecionado
        await axios.delete(`/deleteFuncionario/${idFuncionario}`);

        // Faz a requisição para obter a lista de funcionários atualizada
        const response = await axios.get('/cadastrados');
        const lista = response.data;
        const listaFiltrada2 = lista.filter(
          (item) => item.administrador === usuario,
        );
        const id = response.data.length
          ? lista[response.data.length - 1].id
          : 0;
        console.log(`Este é o id final: ${id}`);
        // Atualiza o estado dadosFuncionario com a lista filtrada recebida
        setDadosFuncionario(listaFiltrada2);
        setListaFiltrada(listaFiltrada2);
        onChangeListaCadastro(listaFiltrada2);
        onChangeNewId(id);
        // Agora que as operações assíncronas foram concluídas, atualiza a variável de controle
        setFuncionarioEscolhido(false);
        setValidacaoApagar(false);
        apagarRef.current = true;
      } catch (error) {
        // Tratar erros caso a deleção ou a requisição GET falhem
        console.error('Erro ao apagar o funcionário ou obter a lista:', error);
      }
    }
  }
  //Função para editar o funcionário
  function editar() {
    const dado = listaFiltrada.find((item) => item.id === idFuncionario);
    onChangeDadosFuncionario(dado);
    console.log(dado);
  }
  //Função de pesquisa
  function pesquisar(e) {
    const nova = capitalizeWords(e.currentTarget.value).trim();
    const mail = e.currentTarget.value.trim().toLowerCase();
    console.log(nova);
    const novaListaFiltrada = listaCadastro.filter(
      (item) => item.nome.includes(nova) || item.email.includes(mail),
    );
    console.log(listaFiltrada);
    setListaFiltrada(novaListaFiltrada);
    setPage(1);
  }
  //Função para voltar a tela do início da seleção dos funcionários
  function voltar() {
    setFuncionarioEscolhido(false);
    setDadosFuncionario(listaCadastro);
    setListaFiltrada(listaCadastro); // Redefinindo lista filtrada para lista completa
    setAvaliar(false);
    setAvaliar2(false);
    setHistorico(false);
  }

  //Funções auxiliares
  //Função auxiliar para a ordenação dos funcionários por nome
  function orderEmployeeData(data) {
    return [...data].sort((a, b) => {
      const nomeA = a.nome.toUpperCase();
      const nomeB = b.nome.toUpperCase();
      if (nomeA < nomeB) return -1;
      if (nomeA > nomeB) return 1;
      return 0;
    });
  }
  //Função Capitalize
  //Função para padronizar a digitação dos inputs
  function capitalizeWords(sentence) {
    return sentence.toLowerCase().replace(/\b\w+/g, (match) => {
      if (match.toLowerCase() === 'de' || match.toLowerCase() === 'e') {
        return match.toLowerCase();
      } else {
        return match.charAt(0).toUpperCase() + match.slice(1); // Capitaliza as outras palavras
      }
    });
  }
  //Função para a mudança de página
  function handleChange(event, value) {
    setPage(value);
  }

  //Funções de renderizações dos componentes
  //Função para renderizar a avaliação
  function onClickBotao1() {
    setAvaliar((current) => !current);
    setAvaliar2((current) => !current);
    setHistorico(false);
  }
  //Função para renderizar o Histórico
  function historicoBotao() {
    setHistorico((current) => !current);
    setAvaliar(false);
    setAvaliar2(false);
  }

  return (
    <>
        <>
          {/* Renderização dos dados do funcionário após a escolha pelo card */}
          {dadosFuncionario.map((item) => (
            <div key={item.id}>
              <Card
                nome={item.nome}
                email={item.email}
                setor={item.setor}
                chefe={item.administrador}
                onClickBotao1={onClickBotao1}
                botao1="Avaliar"
                botao2="Histórico"
                historicoBotao={historicoBotao}
                botao3="Apagar"
                apagarBotao={apagar}
                botao4="Editar"
                voltar={editar}
                botao5="Voltar"
                editar={voltar}
              />
            </div>
          ))}
        </>


      {(avaliar || historico) && (
        // Renderização do formulário de avaliação ou do quadro canva
        <Canva
          historico={historico}
          avaliar2={avaliar2}
          idFuncionario2={idFuncionario2}
          onChangeId={(e) => setIdFuncionario(e)}
          listaCadastro={listaCadastro}
          onHistorico={(e) => setHistorico(e)}
          onAvaliacao={(e) => setAvaliar2(e)}
          usuario={usuario}
          avaliar={avaliar}
        />
      )}
      {/* Dialog de aviso para o usuário apagar o funcionário com segurança */}
      <Dialog
        open={validacaoApagar}
        descricao={confirmaApagar}
        // Função de apagar apesar do nome
        handleClose={apagar}
        button="Sim"
        button2="Não"
        //Função para fechar o Dialog
        handleButton={() => setValidacaoApagar(false)}
        Title="Cadastro"
      />
    </>
  );
}

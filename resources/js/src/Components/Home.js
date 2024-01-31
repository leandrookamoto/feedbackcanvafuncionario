import Chart from './Chart';
import './Home.css';
import { useState, useEffect } from 'react';
import Dialog from './Dialog';

export default function Home({ usuario, listaCadastro }) {
  //Constante responsável pela gravação do estado das avaliações realizadas para análise de metas
  const [avaliacoesRealizadas, setAvaliacoesRealizadas] = useState([]);

  //Constantes para conseguir o ano atual
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();
  //Constante responsável pela gravação do estado das avaliações realizadas para análise de metas
  // Obter o mês atual (retornado como um número, onde janeiro é 0 e dezembro é 11)
  const mesAtual = dataAtual.getMonth();

  //Constantes para gravação de estado
  const [mes, setMes] = useState(mesAtual);
  const [ano, setAno] = useState(anoAtual);
  const [open, setOpen] = useState(false);

  //COnstante para adicionar a observação
  const [observacao, setObservacao] = useState(false);
  const [valueObservacao, setValueObservacao] = useState('');
  const [listaObservacao, setListaObservacao] = useState([]);
  const [renderObservacao, setRenderObservacao] = useState([]);

  // Lista de nomes dos meses
  const meses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  // Obter o nome do mês correspondente ao índice retornado por getMonth()
  const nomeMes = meses[mes];

  const ultimosMeses = [];
  for (let i = mes; i > mes - 5; i--) {
    if (i >= 0) {
      ultimosMeses.unshift(meses[i]);
    }
  }

  //Data para a configuração do Chart.js
  const data = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    datasets: [
      {
        label: 'Feedbacks realizados',
        data: [15, 20, 22, 19, 17, 23],
        borderColor: 'blue',
        backgroundColor: 'blue',
      },
      {
        label: 'Metas',
        /*Aqui a meta é automaticamente preenchido de acordo com o número dos
        feedbacks de cima e de acordo com o número de funcionários cadastrados*/
        data: Array(50).fill(listaCadastro.length),
        borderColor: 'red',
        backgroundColor: 'red',
      },
    ],
  };

  //Funções principais
  function handleMeses(e) {
    setMes(e.currentTarget.value);
  }

  function handleAdicionar() {
    setOpen(true);
    setObservacao(true);
  }

  function editar() {
    setRenderObservacao([]);
  }

  function onChangeObservacao(e) {
    const novaObservacao = e.target.value;

    // Verifica se o comprimento da observação atingiu 500 caracteres
    if (novaObservacao.length <= 500) {
      setValueObservacao(novaObservacao);
    }
  }

  async function gravarObservacao() {
    try {
      const observacaoExistente = listaObservacao.find(
        (item) => item.mes === nomeMes && item.ano === ano,
      );

      setOpen(false);
      if (observacaoExistente) {
        // Substituir o objeto existente
        const novaLista = listaObservacao.map((item) =>
          item.mes === nomeMes && item.ano === ano
            ? { observacao: valueObservacao, mes: nomeMes, ano: ano }
            : item,
        );

        await axios.put(`/cadastro/${idUsuario}/update-observacao`, {
          observacao: novaLista,
        });

        setObservacao(false);
        setListaObservacao(novaLista);
      } else {
        // Adicionar um novo objeto
        await axios.put(`/cadastro/${idUsuario}/update-observacao`, {
          observacao: [
            ...listaObservacao,
            { observacao: valueObservacao, mes: nomeMes, ano: ano },
          ],
        });
        setObservacao(false);
        setListaObservacao([
          ...listaObservacao,
          { observacao: valueObservacao, mes: nomeMes, ano: ano },
        ]);
      }
    } catch (error) {
      console.error('Erro ao gravar observação:', error);
    }

    setRenderObservacao([
      { observacao: valueObservacao, mes: nomeMes, ano: ano },
    ]);
  }

  return (
    <>
      <section>
        <h3>Olá, {usuario.name}!</h3>
        <h3>Gestor Direto: {usuario.responsavel}!</h3>
        <div className="container w-100 mb-3">
          <h5>Escolha a data</h5>
          <div className="container text-center">
            <div className="row align-items-start mb-1">
              <div
                className={
                  anoAtual - 2 === ano
                    ? 'col border p-1 bg-dark text-white'
                    : 'col border p-1'
                }
                style={{ cursor: 'pointer' }}
                onClick={() => setAno(anoAtual - 2)}
              >
                {anoAtual - 2}
              </div>
              <div
                className={
                  anoAtual - 1 === ano
                    ? 'col border p-1 bg-dark text-white'
                    : 'col border p-1'
                }
                style={{ cursor: 'pointer' }}
                onClick={() => setAno(anoAtual - 1)}
              >
                {anoAtual - 1}
              </div>
              <div
                className={
                  anoAtual === ano
                    ? 'col border p-1 bg-dark text-white'
                    : 'col border p-1'
                }
                style={{ cursor: 'pointer' }}
                onClick={() => setAno(anoAtual)}
              >
                {anoAtual}
              </div>
              <div
                className={
                  anoAtual + 1 === ano
                    ? 'col border p-1 bg-dark text-white'
                    : 'col border p-1'
                }
                style={{ cursor: 'pointer' }}
                onClick={() => setAno(anoAtual + 1)}
              >
                {anoAtual + 1}
              </div>
              <div
                className={
                  anoAtual + 2 === ano
                    ? 'col border p-1 bg-dark text-white'
                    : 'col border p-1'
                }
                style={{ cursor: 'pointer' }}
                onClick={() => setAno(anoAtual + 2)}
              >
                {anoAtual + 2}
              </div>
            </div>
          </div>
          <select
            className="form-select mb-2"
            aria-label="Default select example"
            onChange={handleMeses}
            value={mes}
          >
            <option selected>Escolha a data</option>
            {meses.map((item, index) => (
              <>
                <option key={index} value={index}>
                  {item}
                </option>
              </>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary mb-1"
          onClick={handleAdicionar}
        >
          {renderObservacao.length == 0 ? (
            <>Adicionar observações</>
          ) : (
            <>Ver observações</>
          )}
        </button>
        <h5>Números do mês: {nomeMes}</h5>
        <div
          style={{
            width: '100%',
            height: '80px',
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginRight: '10px',
              border: '1px solid rgb(204 204 204)',
            }}
          >
            <div
              style={{
                width: '40%',
                backgroundColor: '#1fc1ed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-briefcase"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
              </svg>
            </div>
            <div style={{ width: '60%', padding: '5px' }}>
              <div>Senioridade</div>
              <div>teste</div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginRight: '10px',
              border: '1px solid rgb(204 204 204)',
            }}
          >
            <div
              style={{
                width: '40%',
                backgroundColor: '#db4c3f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-list-check"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0m0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"
                />
              </svg>
            </div>
            <div style={{ width: '60%', padding: '5px' }}>
              <div>Atividades ok</div>
              <div>teste</div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              marginRight: '10px',
              border: '1px solid rgb(204 204 204)',
            }}
          >
            <div
              style={{
                width: '40%',
                backgroundColor: '#18a55d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-dash-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
              </svg>
            </div>
            <div style={{ width: '60%', padding: '5px' }}>
              <div>Faltam</div>
              <div>Teste</div>
            </div>
          </div>
        </div>
        <h5 className="mt-3">Gráfico das metas mensais do ano de {ano}</h5>
        <Chart data={data} />
      </section>
      <Dialog
        open={open}
        // descricao={descricao}
        button={renderObservacao.length == 0 ? '' : 'Editar'}
        handleClose={editar} //Coloquei no handleClose para não modificar muito o código
        Title="Atenção"
        observacao={observacao}
        onChangeObservacao={onChangeObservacao}
        valueObservacao={valueObservacao}
        gravarObservacao={gravarObservacao}
        renderObservacao={renderObservacao}
        titulo={
          renderObservacao.length == 0
            ? 'Observações'
            : `Observações ${nomeMes} ${ano}`
        }
        button2="Fechar"
        handleButton={() => setOpen(false)}
      />
    </>
  );
}

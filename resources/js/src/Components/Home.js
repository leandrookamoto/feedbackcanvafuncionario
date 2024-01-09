import Chart from './Chart';
import './Home.css';
import { useState, useEffect } from 'react';

export default function Home({ usuario, listaCadastro }) {
  //Constante responsável pela gravação do estado das avaliações realizadas para análise de metas
  const [avaliacoesRealizadas, setAvaliacoesRealizadas] = useState([]);
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

  //useEffect responsável pela retirada das informações do banco de dados através do props listaCadastro
  // useEffect(() => {
  //   const lista = listaCadastro.map((item) => item.avaliacoes);
  //   let novaLista = lista.filter((item) => Array.isArray(JSON.parse(item)));

  //   let arrayDeObjetos = [];

  //   for (let i = 0; i < novaLista.length; i++) {
  //     const item = novaLista[i];
  //     // Adiciona cada item (array) como um objeto ao arrayDeObjetos
  //     //Aqui faz o parse, pois os dados vem como JSON.stringfy do banco de dados
  //     arrayDeObjetos.push(JSON.parse(item));

  //     //gravação do local
  //     setAvaliacoesRealizadas(arrayDeObjetos);
  //   }
  // }, []);

  return (
    <>
      <section>
        <h3>Olá, {usuario}!</h3>
        <Chart data={data} />
      </section>
    </>
  );
}

import { useState, useEffect } from 'react';

export default function PlanoDeAcao({ usuario }) {
  const [mes, setMes] = useState('');
  const anoAtual = new Date().getFullYear();
  const [ano, setAno] = useState(anoAtual);
  const [listaPlano, setListaPlano] = useState([]);
  const [idFuncionario, setIdFuncionario] = useState(null);
  const data = [
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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/feedback/' + usuario.email);
        let lista = JSON.parse(response.data.plano);
        setListaPlano(lista);
        setIdFuncionario(response.data.id);
      } catch (error) {
        console.log('Erro ao buscar dados', error);
      }
    }

    fetchData();
  }, [usuario.email]);

  const handleData = (e) => {
    setMes(e.currentTarget.value);
  };

  const handleCheckboxChange = async (index) => {
    const novaListaPlano = listaPlano.map((item, i) =>
      i === index ? { ...item, feito: !item.feito } : item
    );
    setListaPlano(novaListaPlano);
  
    // Chamar a função gravar diretamente com a lista atualizada
    await gravar(novaListaPlano);
  };
  
  async function gravar(listaAtualizada) {
    try {
      console.log('id', idFuncionario);
      console.log('listaAtualizada', listaAtualizada);
  
      const response = await axios.put(`/feedback/${idFuncionario}`, {
        plano: JSON.stringify(listaAtualizada),
      });
  
      console.log('Resposta do servidor:', response.data);
    } catch (error) {
      console.log('Erro ao gravar', error);
    }
  }
  
  



  return (
    <>
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
          onChange={handleData}
        >
          <option selected>Escolha a data</option>
          {data.map((item, index) => (
            <>
              <option key={index} value={item}>
                {item}
              </option>
            </>
          ))}
        </select>
      </div>

      <ul class="list-group">
        <li
          class="list-group-item text-white"
          style={{ backgroundColor: '#2297aa' }}
          aria-current="true"
        >
          Plano de Ação
        </li>
        {listaPlano.map((item, index) => (
          <li
            key={index}
            class="list-group-item d-flex justify-content-between"
          >
            <div>{item.plano}</div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                checked={item.feito}
                id="flexCheckDefault"
                onChange={() => handleCheckboxChange(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

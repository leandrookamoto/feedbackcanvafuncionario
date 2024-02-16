import './Sidebar.css';
import {useEffect} from 'react';

export default function Sidebar({
  onClickCadastrados,
  onClickHome,
  planoDeAcao,
  onClickPlano,
  homeRender,
  feedback,
}) {

  // Todos as props são enviados para o App.js
  return (
    <section className="sidebar d-flex flex-column">
      <div className=" d-flex justify-content-center">
        <div className="m-3">
          <img src="../images/global.svg" alt="" className="img-fluid" />
        </div>
      </div>

      {/* Parte responsável pela renderização do componente Home ao apertar do div */}
      <div
        className={homeRender ? 'd-flex mt-2 home escolhido' : 'd-flex home mt-2'}
        style={{ marginLeft: '50px' }}
        onClick={onClickHome}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          fill="currentColor"
          className="bi bi-house mt-1"
          viewBox="0 0 16 16"
        >
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
        </svg>{' '}
        <div className={homeRender ? 'ml-3 escolhido' : 'ml-3'}>Home</div>
      </div>

     

      {/* Parte responsável pela renderização do componente de feedback */}
      <div
        className={feedback ? 'd-flex mt-2 home escolhido' : 'd-flex mt-2 home'}
        style={{ marginLeft: '50px' }}
        onClick={onClickCadastrados}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          fill="currentColor"
          className="bi bi-card-text mt-1"
          viewBox="0 0 16 16"
        >
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
          <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8m0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5" />
        </svg>{' '}
        <div className={feedback ? 'ml-3 escolhido' : 'ml-3'}>Feedback</div>
      </div>

       {/* Parte responsável pela renderização do componente de plano de ação */}
       <div
        className={planoDeAcao ? 'd-flex mt-2 home escolhido' : 'd-flex mt-2 home'}
        style={{ marginLeft: '50px' }}
        onClick={onClickPlano}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-calendar-event mt-1"
          viewBox="0 0 16 16"
        >
          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </svg>
        <div className={planoDeAcao ? 'ml-3 escolhido' : 'ml-3'}>
          Plano de Ação
        </div>
      </div>
    </section>
  );
}

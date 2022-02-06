import "./style.scss";

function CardDeDados({ cardType }) {
  const clientesDB = [
    { nome: "Sara Silva", id: 223456787, valor: 1000 },
    { nome: "Carlos Prado", id: 223456781, valor: 400 },
    { nome: "lara Brito", id: 223456782, valor: 900 },
    { nome: "Soraia Neves", id: 223456783, valor: 700 },
    { nome: "Soraia Neves", id: 223456783, valor: 700 },
    { nome: "Soraia Neves", id: 223456783, valor: 700 },
  ];

  const cards = [
    { name: "pagas", text: "Cobranças Pagas" },
    { name: "vencidas", text: "Cobranças Vencidas" },
    { name: "previstas", text: "Cobranças Previstas" },
    { name: "inadimplente", text: "Clientes Inadimplentes" },
    { name: "em-dia", text: "Clientes em dia" },
  ];

  const cardRender = cards.find((card) => card.name === cardType);

  return (
    <div className="card-cobranca">
      <div className="card-title">
        <h4>{cardRender.text}</h4>
        <span className={cardRender.name}>
          {String(clientesDB.length).padStart(2, "0")}
        </span>
      </div>
      <div className="card-body">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Id da cob.</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {clientesDB.slice(0, 4).map((cliente) => {
              return (
                <tr key={cliente.id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.id}</td>
                  <td>{`R$ ${cliente.valor}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card-footer">Ver Todos</div>
    </div>
  );
}

export default CardDeDados;

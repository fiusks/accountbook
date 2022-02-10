import "./style.scss";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import filterButton from "../../assets/images/filterbutton.svg";
import upDownArrowIcon from "../../assets/images/arrowupdown.svg";
import addPaperIcon from "../../assets/images/addpapericon.svg";
import useUser from "../../hooks/useUser";
import ClientEditForm from "../../components/clientEditModal";
import { SearchInput } from "../../components/input-generic";
import ToastComponent from "../../components/toast";

const clientesDB = [
  {
    nome: "Sara Silva",
    cpf: 223456787,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "inadimplente",
  },
  {
    nome: "Carlos Prado",
    cpf: 223456781,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "inadimplente",
  },
  {
    nome: "lara Brito",
    cpf: 223456782,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "inadimplente",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "inadimplente",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "inadimplente",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "inadimplente",
  },
  {
    nome: "Sara Silva",
    cpf: 223456787,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "inadimplente",
  },
  {
    nome: "Carlos Prado",
    cpf: 223456781,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "lara Brito",
    cpf: 223456782,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
  {
    nome: "Soraia Neves",
    cpf: 223456783,
    email: "teste@hotmail.com",
    phone: 123456789,
    status: "Em dia",
  },
];

function Clientes() {
  const { openClientModal, setOpenClientModal, toast } = useUser();

  return (
    <div className="client-container">
      {openClientModal && <ClientEditForm />}
      <div className="client-header-container">
        <div className="client-header-title">
          <img src={clientsIcon} alt="client icons" />
          <h1>Clientes</h1>
        </div>
        <div className="client-header-options">
          <button onClick={() => setOpenClientModal(true)}>
            + Adicionar Cliente
          </button>
          <img src={filterButton} alt="settings icon" />
          <SearchInput />
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th className="filter-icon-container">
                <img src={upDownArrowIcon} alt="filter arrow icon" />
                Cliente
              </th>
              <th>CPF</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Criar Cobrança</th>
            </tr>
          </thead>
          <tbody>
            {clientesDB.map((cliente, id) => {
              return (
                <tr key={id}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.phone}</td>
                  <td>
                    <span
                      className={
                        cliente.status === "inadimplente"
                          ? "inadimplente"
                          : "em-dia"
                      }
                    >
                      {cliente.status}
                    </span>
                  </td>
                  <td>
                    <img src={addPaperIcon} alt="add paper icon" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {toast && <ToastComponent />}
    </div>
  );
}

export default Clientes;

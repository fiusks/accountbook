import "./style.scss";
import homeIcon from "../../assets/images/homeIcon.svg";
import clientsIcon from "../../assets/images/clientsIcon.svg";
import cobrancaIcon from "../..assets/images/cobrancaIcon.svg";
import arrowDown from "../../assets/images/arrowdown.svg";
import editIconGreen from "../../assets/images/editIconGreen.svg";
import addIcon from "../../assets/images/addIcon.svg";
import arrowUpDown from "../../assets/images/arrowupdown.svg";
import deleteIconRed from "../../assets/images/deleteIconRed.svg";
import clientsIconPink from "../../assets/images/clientsIconPink.svg";


function ClientsDetails() {
    return (
        <div className="detalhes-do-cliente">
            <div className="conteudo">
                    <div className="flex-row">
                        <img className="img-cliente" src={clientsIcon} alt="" />
                        <h1 className="nome-cliente">Sara Lage Silva</h1>
                    </div>
                    <div className="dados-do-cliente">
                        <div className="flex-row">
                            <h3 className="dados-do-cliente-titulo">Dados do cliente</h3>
                            <button className="editar-cliente-button"><img src={editIconGreen} alt="Edit" />Editar Cliente</button>
                        </div>
                        <div className="flex-row">
                            <div className="div-email-cliente">
                                <h4 className="dados-do-cliente-email">E-mail*</h4>
                                <p className="email-cliente">sarasilva@gmail.com</p>
                            </div>
                            <div className="div-telefone-cliente">
                                <h4 className="dados-do-cliente-telefone">Telefone*</h4>
                                <p className="telefone-cliente">71 9 9462 8654</p>
                            </div>
                            <div className="div-cpf-cliente">
                                <h4 className="dados-do-cliente-cpf">CPF</h4>
                                <p className="cpf-cliente">054 365 255 87</p>
                            </div>
                        </div>
                        <div className="flex-row">
                            <div className="div-endereco-cliente">
                                <h4 className="dados-do-cliente-endereco">Endereço*</h4>
                                <p className="endereco-cliente">Rua das Cornélias; nº 512</p>
                            </div>
                            <div className="div-bairro-cliente">
                                <h4 className="dados-do-cliente-bairro">Bairro</h4>
                                <p className="bairro-cliente">Oliveiras</p>
                            </div>
                            <div className="div-complemento-cliente">
                                <h4 className="dados-do-cliente-complemento">Complemento</h4>
                                <p className="complemento-cliente">Ap: 502</p>
                            </div>
                            <div className="div-cep-cliente">
                                <h4 className="dados-do-cliente-cep">CEP</h4>
                                <p className="cep-cliente">031 654 524 04</p>
                            </div>
                            <div className="div-cidade-cliente">
                                <h4 className="dados-do-cliente-cidade">Cidade</h4>
                                <p className="cidade-cliente">Salvador</p>
                            </div>
                            <div className="div-uf-cliente">
                                <h4 className="dados-do-cliente-uf">UF</h4>
                                <p className="uf-cliente">BA</p>
                            </div>
                        </div>
                    </div>
                    <div className="cobrancas-do-cliente">
                        <div className="flex-row">
                            <h3 className="cobrancas-do-cliente-titulo">Cobranças do Cliente</h3>
                            <button className="nova-cobranca-button"><img src={addIcon} alt="" />Nova cobrança</button>
                        </div>
                        <div className="flex-row">
                            <img className="img-arrowupdown1" src={arrowUpDown} alt="" />
                            <h4 className="cobrancas-id">ID Cob.</h4>
                            <img className="img-arrowupdown2" src={arrowUpDown} alt="" />
                            <h4 className="cobrancas-data">Data de venc.</h4>
                            <h4 className="cobrancas-valor">Valor</h4>
                            <h4 className="cobrancas-status">Status</h4>
                            <h4 className="cobrancas-descricao">Descrição</h4>
                        </div>
                        <div className="linha2"></div>
                        <div className="flex-row">
                            <p className="cliente-cobrancas-id">248563147</p>
                            <p className="cliente-cobrancas-data">26/01/2021</p>
                            <p className="cliente-cobrancas-valor">R$ 500,00</p>
                            <p className="cliente-cobrancas-status">Vencida</p>
                            <p className="cliente-cobrancas-descricao">lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips,,,</p>
                            <div>
                                <img className="img-edit-cobranca" src={editIcon} alt="" />
                                <p className="txt-edit-cobranca">Editar</p>
                            </div>
                            <div>
                                <img className="img-delete-cobranca" src={deleteIconRed} alt="" />
                                <p className="txt-delete-cobranca">Excluir</p>
                            </div>
                        </div>
                        <div className="linha2"></div>
                        <div className="flex-row">
                            <p className="cliente-cobrancas-id">248563147</p>
                            <p className="cliente-cobrancas-data">26/01/2021</p>
                            <p className="cliente-cobrancas-valor">R$ 500,00</p>
                            <p className="cliente-cobrancas-status">Vencida</p>
                            <p className="cliente-cobrancas-descricao">lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips,,,</p>
                            <div>
                                <img className="img-edit-cobranca" src={editIcon} alt="" />
                                <p className="txt-edit-cobranca">Editar</p>
                            </div>
                            <div>
                                <img className="img-delete-cobranca" src={deleteIconRed} alt="" />
                                <p className="txt-delete-cobranca">Excluir</p>
                            </div>
                        </div>
                        <div className="linha2"></div>
                        <div className="flex-row">
                            <p className="cliente-cobrancas-id">248563147</p>
                            <p className="cliente-cobrancas-data">26/01/2021</p>
                            <p className="cliente-cobrancas-valor">R$ 500,00</p>
                            <p className="cliente-cobrancas-status">Vencida</p>
                            <p className="cliente-cobrancas-descricao">lorem ipsum  lorem ipsum lorem ipsuipsum lorem ips,,,</p>
                            <div>
                                <img className="img-edit-cobranca" src={editIcon} alt="" />
                                <p className="txt-edit-cobranca">Editar</p>
                            </div>
                            <div>
                                <img className="img-delete-cobranca" src={deleteIconRed} alt="" />
                                <p className="txt-delete-cobranca">Excluir</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ClientsDetails;
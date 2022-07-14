import cobrancaIcon from '../../assets/images/cobrancaIcon.svg';
import close from '../../assets/images/close.svg';
import useUser from '../../hooks/useUser';
import './style.scss';

function BillDetails({ nome, descricao, dataVencimento, valor, idCobranca, status }) {
    const { setShowBillDetail } = useUser();
    return (
        <div className="containerBillDetails">
            <div className="billDetails" >
                <div className="billDetailsHeader" >
                    <img src={cobrancaIcon} alt="icone de cobrança" />
                    <h1>Detalhe da Cobrança</h1>
                    <img onClick={() => setShowBillDetail(false)} className='close' src={close} alt="icone de fechar" />
                </div>
                <h2>Nome</h2>
                <span>{nome}</span>
                <h2>Descrição</h2>
                <p>
                    {descricao}
                </p>
                <div className='container-vencimento-valor' >
                    <div className='container-vencimento'>
                        <h2>Vencimento</h2>
                        <span>{dataVencimento}</span>
                    </div>
                    <div>
                        <h2>Valor</h2>
                        <span>{valor}</span>
                    </div>
                </div>
                <div className='container-id-status' >
                    <div  className='container-id'>
                        <h2>ID Cobranças</h2>
                        <span>{idCobranca}</span>
                    </div>
                    <div>
                        <h2>Status</h2>
                        <span className={status}>{status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BillDetails
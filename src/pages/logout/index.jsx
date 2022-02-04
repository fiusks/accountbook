import './style.scss';
import ProgressBar from '../../components/progressComponent';
import CardLogout from '../../components/cardLogoutComponent';

function LogOut() {
    return (
        <div className="logout">
            <ProgressBar></ProgressBar>
            <CardLogout></CardLogout>
        </div>);
}

export default LogOut;
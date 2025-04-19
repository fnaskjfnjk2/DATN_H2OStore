import { useNavigate } from 'react-router-dom';
import InputAdmin from '../components/input/Input-admin';
import styles from './auth.module.scss';
import { useContext, useState } from 'react';
import UserContext from '../../context/use.context';
import { ParseValid } from '../../lib/validate/ParseValid';
import { Validate } from '../../lib/validate/Validate';
import ButtonWed from '../components/button/Button-admin';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';
import ToastApp from '../../lib/notification/Toast';
import APP_LOCAL from '../../lib/localStorage';
import AppImages from '../../assets';


const Login = () => {
    const navigate = useNavigate();
    const [{ }, dispatch] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [listError, setListError] = useState({
        username: '',
        password: '',
    });
    const [formValue, setFormValue] = useState({
        username: null,
        password: null,
    });

    
};
export default Login;


//Mẫu Login
// const Login = () => {
//     const navigate = useNavigate();
//     const [{ }, dispatch] = useContext(UserContext);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//     const [listError, setListError] = useState({
//         username: '',
//         password: '',
//     });
//     const [formValue, setFormValue] = useState({
//         username: null,
//         password: null,
//     });

    
// };
// export default Login;

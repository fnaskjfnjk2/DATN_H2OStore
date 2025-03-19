import { useNavigate } from 'react-router-dom';
import InputAdmin from '../components/input/Input-admin';
import styles from './auth.module.scss';
import { useContext, useState } from 'react';
import UserContext from '../../context/use.context';
import { ParseValid } from '../../lib/validate/ParseValid';
import { Validate } from '../../lib/validate/Validate';
import ButtonWed from '../components/button/Button-admin';
import ToastApp from '../../lib/notification/Toast';
import AppImages from '../../assets';


const SignUpUser = () => {
    const navigate = useNavigate();
    const [userCtx, dispatch] = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [listError, setListError] = useState({
        username: '',
        password: '',
        name: ''
    });
    const [formValue, setFormValue] = useState({
        username: null,
        password: null,
        name: null
    });

   
};
export default SignUpUser;

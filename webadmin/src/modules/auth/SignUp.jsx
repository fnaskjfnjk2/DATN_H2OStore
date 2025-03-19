import { useContext, useEffect, useState } from 'react'
import APP_LOCAL from '../../lib/localStorage'
import ToastApp from '../../lib/notification/Toast'
import styles from './auth.module.scss'
import { useNavigate } from 'react-router-dom'
import InputAdmin from '../components/input/Input-admin'
import ButtonWed from '../components/button/Button-admin'
import { ParseValid } from '../../lib/validate/ParseValid'
import { Validate } from '../../lib/validate/Validate'
import UserContext from '../../context/use.context'
import { KEY_CONTEXT_USER } from '../../context/use.reducer'
// import { TYPE_MODEL } from '../components/modal'
import AppImages from '../../assets'
import ModalAdminDetail from '../components/modal/modalAdminDetails/ModalAdminDetail'

const SignUp = () => {
    const [userCtx, dispatch] = useContext(UserContext)
    const [data, setData] = useState(null)
    // const navigate = useNavigate();
    const [status, setStatus] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [reloadData, setReloadData] = useState(false);
    const [idAdmin, setIdAdmin] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)


   
    const getAccounts = async () => {
        try {
            const token = APP_LOCAL.getTokenStorage();
            const res = await fetch(`http://localhost:3001/admin/getAccountsAdmin/:token`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (data.status === 200) {
                setData(data.data)
            } else {
                ToastApp.error('Error: ' + data.message)
            }

        } catch (e) {
            console.log("Lỗi lấy danh sách tài khoảng admin")
        }
    }
    
}
export default SignUp
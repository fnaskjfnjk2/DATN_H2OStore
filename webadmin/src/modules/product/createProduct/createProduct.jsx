import './CreateProduct.scss';
import InputAdmin from '../../components/input/Input-admin';
import { useEffect, useState } from 'react';
import { Validate } from '../../../lib/validate/Validate';
import { ParseValid } from '../../../lib/validate/ParseValid';
import ToastApp from '../../../lib/notification/Toast';
import APP_LOCAL from '../../../lib/localStorage';
import Select from "react-select";
import ButtonWed from '../../components/button/Button-admin';
const CreateProduct = ({ handleBack }) => {
    const [colors, setColors] = useState([]);
        const [trademark, setTrademark] = useState([]);
        const [origin, setOrigin] = useState([]);
        const [material, setMaterial] = useState([]);
        const [selectedColor, setSelectedColor] = useState([]);
        const [imagePreview, setImagePreview] = useState({});
    
        const [listError, setListError] = useState({
            name: "Không được để trống",
            description: "Không được để trống",
    
        });
        const [listErrorDetails, setListErrorDetails] = useState({
            quantity: {},
            colorCode: {},
            price: {},
            size: {},
        })
    const [dataCreateProduct, setDataCreateProduct] = useState({
            name: '',
            description: '',
            material: '', // chất liệu
            origin: '', // xuất xứ
            trademark: '', // thương hiệu
    
        });
        const [dataProductDetails, setDataProductDetails] = useState([])
    
        const clearForm = () => {
            setDataCreateProduct({
                name: '',
                description: '',
                material: '',
                origin: '',
                trademark: ''
            });
            setDataProductDetails([]);
            setImagePreview({})
        }
    
        const getColor = async () => {
            try {
                const response = await fetch(`http://localhost:3001/color/getColor`, {
                    headers: {
                        Authorization: `Bearer`,
                    }
                })
                if (response.status === 200) {
                    const data = await response.json()
                    const formattedColors = data?.data.map((color) => ({
                        label: color.name,
                        value: color.name,
                        colorCode: color.colorCode,
                    }));
                    setColors(formattedColors)
                } else {
                    ToastApp.error(response.message)
                }
            } catch (error) {
                console.log("Lỗi web get list color: ", error)
            }
        }
        const getTrademark = async () => {
            try {
                const response = await fetch(`http://localhost:3001/trademark/getTrademark`, {
                    headers: {
                        Authorization: `Bearer`,
                    }
                })
                if (response.status === 200) {
                    const data = await response.json()
                    const formattedTrademark = data?.data.map((trademark) => ({
                        label: trademark.name,
                        value: trademark.brandCode,
                    }));
                    setTrademark(formattedTrademark)
                } else {
                    ToastApp.error(response.message)
                }
            } catch (error) {
                console.log("Lỗi web get list trademark: ", error)
            }
        }

        const getOrigin = async () => {
            try {
                const response = await fetch(`http://localhost:3001/origin/getOrigin`, {
                    headers: {
                        Authorization: `Bearer`,
                    }
                })
                if (response.status === 200) {
                    const data = await response.json()
                    const formattedOrigin = data?.data.map((origin) => ({
                        label: origin.name,
                        value: origin.originCode,
                    }));
                    setOrigin(formattedOrigin)
                } else {
                    ToastApp.error(response.message)
                }
            } catch (error) {
                console.log("Lỗi web get list trademark: ", error)
            }
        }       
};    
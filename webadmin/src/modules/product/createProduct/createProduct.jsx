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
        const getMaterial = async () => {
            try {
                const response = await fetch(`http://localhost:3001/material/getMaterial`, {
                    headers: {
                        Authorization: `Bearer`,
                    }
                })
                if (response.status === 200) {
                    const data = await response.json()
                    const formattedMaterial = data?.data.map((material) => ({
                        label: material.name,
                        value: material.materialCode,
                    }));
                    setMaterial(formattedMaterial)
                } else {
                    ToastApp.error(response.message)
                }
            } catch (error) {
                console.log("Lỗi web get list material: ", error)
            }
        } 
     const onChangeInput = (e, index) => {
            const { name, value } = e.target;
            setDataCreateProduct({ ...dataCreateProduct, [name]: value });
    
            setDataProductDetails(prev => {
                if (name === "colorCode") {
                    const updatedColor = prev[index].color;
                    return prev.map(item =>
                        item.color === updatedColor ? { ...item, colorCode: value } : item
                    );
                } else {
                    return prev.map((detail, i) =>
                        i === index ? { ...detail, [name]: value } : detail
                    );
                }
            });
    
            const inputValue = value.trim();
            const valid = e.target.getAttribute('validate');
            const validObject = ParseValid(valid);
    
            const error = Validate(
                name,
                inputValue,
                validObject,
            );
    
            const newListError = { ...listError, [name]: error };
            setListError(newListError);
    
            setListErrorDetails(prevErrors => {
                const newErrors = { ...prevErrors };
                if (!newErrors[index]) {
                    newErrors[index] = {};
                }
                newErrors[index][name] = error;
    
                return newErrors;
            });
        }
        const handleChangeSelect = async (selectedOption, name, nameAPI) => {
            if (!selectedOption) return;
            const token = APP_LOCAL.getTokenStorage();
            if (!token) {
                return ToastApp.warning("Bạn cần phải đăng nhập! ")
            }
            setDataCreateProduct(prev => ({
                ...prev,
                [name]: selectedOption
            }));
    
            if (selectedOption.__isNew__) {
                try {
                    const response = await fetch(`http://localhost:3001/${name}/${nameAPI}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ name: selectedOption.label }),
                    });
                    const data = await response.json();
    
                    if (data.status === 200) {
                        if (name === 'trademark') {
                            const newTrademark = { label: selectedOption.label, value: selectedOption.label };
                            setTrademark(prevTrademark => [...prevTrademark, newTrademark]);
                            setDataCreateProduct(prev => ({
                                ...prev,
                                trademark: selectedOption
                            }));
                            ToastApp.success("Thêm thương hiệu thành công!");
                        }
                        if (name === 'origin') {
                            const newOrigin = { label: selectedOption.label, value: selectedOption.label };
                            setOrigin(prevTrademark => [...prevTrademark, newOrigin]);
                            setDataCreateProduct(prev => ({
                                ...prev,
                                origin: selectedOption
                            }));
                            ToastApp.success("Thêm xuất xứ thành công!");
                        }
                        if (name === 'material') {
                            const newMaterial = { label: selectedOption.label, value: selectedOption.label };
                            setMaterial(prevTrademark => [...prevTrademark, newMaterial]);
                            setDataCreateProduct(prev => ({
                                ...prev,
                                material: selectedOption
                            }));
                            ToastApp.success("Thêm xuất xứ thành công!");
                        }
    
                    } else {
                        ToastApp.error(data.message);
                    }
                } catch (error) {
                    ToastApp.error(error.message)
                }
            }
        }
        const handleChangeColor = async (selectedOption) => {

            if (!selectedOption) return;
            const token = APP_LOCAL.getTokenStorage();
            if (!token) {
                return ToastApp.warning("Bạn cần phải đăng nhập! ")
            }
            setSelectedColor(selectedOption);
    
    
            setDataProductDetails(prev => {
                const existingItem = prev.find(item => item.color === selectedOption.label);
                const colorCode = selectedOption.colorCode || (existingItem ? existingItem.colorCode : "");
                const image = existingItem ? existingItem.image : null;
                return prev.map(item =>
                    item.color === selectedOption.label
                        ? { ...item, colorCode, image }
                        : item
                ).concat({
                    quantity: '',
                    price: '',
                    color: selectedOption.label,
                    colorCode,
                    size: '',
                    image,
                });
            });
            if (selectedOption.__isNew__) {
                try {
                    const response = await fetch(`http://localhost:3001/color/createColor`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ color: selectedOption.label }),
                    });
                    const data = await response.json();
    
                    if (data.status === 200) {
                        const newColor = { label: selectedOption.label, value: selectedOption.label, colorCode: "" };
                        setColors(prevColors => [...prevColors, newColor]);
                        setSelectedColor(newColor);
                        ToastApp.success("Thêm màu thành công!");
                    } else {
                        ToastApp.error(data.message || "Lỗi khi thêm màu!");
                    }
                } catch (error) {
                    ToastApp.error(error.message)
                }
            }
        }
        
        const handleImageChange = (e, index) => {
            const file = e.target.files[0];
            if (!file) return;
            if (index < 0 || index >= dataProductDetails.length) return;
    
            const objectURL = URL.createObjectURL(file);
            const updatedColor = dataProductDetails[index].color;
    
            setDataProductDetails(prev => prev.map(item =>
                item.color === updatedColor
                    ? { ...item, image: file }
                    : item
            ));
    
            setImagePreview(prev => {
                const newPreview = { ...prev };
                dataProductDetails.forEach((item, i) => {
                    if (item.color === updatedColor) {
                        newPreview[i] = objectURL;
                    }
                });
                return newPreview;
            });
        };     
};    
import './CreateProduct.scss';
;
import { useEffect, useState } from 'react';
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
};    
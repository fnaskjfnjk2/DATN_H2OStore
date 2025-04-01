import { useContext, useEffect, useState } from 'react';
import './Product.scss';
import CreateProduct from './createProduct/CreateProduct';
import APP_LOCAL from '../../lib/localStorage';
import ToastApp from '../../lib/notification/Toast';
import AppImages from '../../assets';
import { KEY_CONTEXT_USER } from '../../context/use.reducer';
import UserContext from '../../context/use.context';
import ModalDetails from '../components/modal/modalProductDetails/ModalDetails';
const Product = () => {
    const [navigateCreate, setNavigateCreate] = useState(false);
    const [{ }, dispatch] = useContext(UserContext);
    const [searchData, setSearchData] = useState('');
    const [reloadData, setReloadData] = useState(false);
    const [idProduct, setIdProduct] = useState(null);
    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const getProducts = async () => {
        try {
            const response = await fetch(`http://localhost:3001/product/getProducts`, {
                headers: {
                    Authorization: `Bearer`,
                },
            });
            const data = await response.json();

            if (data.status === 200) {
                setData(data.data)
            } else {
                ToastApp.error(data.message)
            }
        } catch (e) {
            console.log("Lỗi lấy sản phẩm: ", e)
        }

    }
    const handleInputSearch = (e) => {
        const { name, value } = e.target
        if (name === "search") {
            setSearchData(value.trim())
        }
    }
    const handleEdit = (id, e) => {
        e.stopPropagation();
        dispatch({
            type: KEY_CONTEXT_USER.SHOW_MODAL,
            payload: {
                typeModal: "EDIT_PRODUCT_MODAL",
                dataModal: id,
                titleModel: "Sửa thông tin sản phẩm!",
                onClickConfirmModel: async (data, selectedFile, listError) => {
                    const token = APP_LOCAL.getTokenStorage();
                    try {
                        let newErrors = { ...listError };
                        for (let key in newErrors) {
                            if (newErrors[key]) {
                                ToastApp.warning("Vui lòng nhập đúng dữ liệu!");
                                return;
                            }
                        }
                        const formDataToSend = new FormData();
                        formDataToSend.append('name', data.productName);
                        formDataToSend.append('idProduct', data.idProduct);
                        formDataToSend.append('productDetailCode', data.productDetailCode);
                        formDataToSend.append('trademark', data.trademark.value);
                        formDataToSend.append('origin', data.origin.value);
                        formDataToSend.append('material', data.material.value);
                        formDataToSend.append('color', data.color.value);
                        formDataToSend.append('idColor', data.idColor)
                        formDataToSend.append('idSize', data.idSize)
                        formDataToSend.append('quantity', data.quantity)
                        formDataToSend.append('price', data.price)
                        if (selectedFile) {
                            formDataToSend.append('image', selectedFile);
                        } else {
                            formDataToSend.append('imageUrl', data.idImage);
                        }
                        for (let [key, value] of formDataToSend.entries()) {
                            if (value === undefined || value === null || value === "") {
                                ToastApp.warning("Nhập đủ thông tin")
                                console.error(`Lỗi: Trường "${key}" không được để trống.`);
                                return;
                            }
                        }
                        const response = await fetch(`http://localhost:3001/product/updateProduct`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            body: formDataToSend,
                        });
                        const result = await response.json()
                        if (result.status === 200) {
                            dispatch({ type: KEY_CONTEXT_USER.HIDE_MODAL });
                            ToastApp.success("Cập nhật thành công!")
                            setReloadData(true)
                        } else {
                            ToastApp.warning("Lỗi cập nhật: ", result.message)
                        }

                    } catch (e) {
                        console.log("Lỗi cập nhật sản phẩm")
                    }
                }
            }
        })

    }
    const handleDelete = (product, e) => {
        e.stopPropagation();
        dispatch({
            type: KEY_CONTEXT_USER.SHOW_MODAL,
            payload: {
                typeModal: 'DELETE_ITEM',
                dataModal: product?.dataValues?.id,
                contentModel: "Bạn có chắc chắn muốn xóa sản phẩm " + product?.dataValues?.productDetailCode + " không?",
                onClickConfirmModel: async () => {
                    try {
                        const response = await fetch(`http://localhost:3001/product/delete/${product?.dataValues?.id}`,
                            {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer`
                                },

                            });
                        const data = await response.json();
                        if (data.status === 200) {
                            ToastApp.success('Xóa thành công');
                            setReloadData(true);
                        } else {
                            ToastApp.error('Error: ' + data.message);
                        }

                    } catch (e) {
                        console.log("Lỗi xóa sản phẩm: ", e)
                    }
                },
            },
        })
    }
    const handleClickItem = (product) => {
        setIdProduct(product?.dataValues?.id)
    }

    const handleStatus = async (e, id) => {
        e.stopPropagation();
        try {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: true })
            const response = await fetch(`http://localhost:3001/product/statusProduct/${id}`,
                {
                    method: 'GET',
                });
            const data = await response.json();
            if (data.status === 200) {
                ToastApp.success("Cập nhật trạng thái thành công")
                setReloadData(true)
            } else {
                ToastApp.error('Error: ' + data.message);
            }
        } catch (e) {
            console.log("Lỗi", e)
        } finally {
            dispatch({ type: KEY_CONTEXT_USER.SET_LOADING, payload: false })
        }
    }
};

export default Product;
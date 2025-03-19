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
        
};    
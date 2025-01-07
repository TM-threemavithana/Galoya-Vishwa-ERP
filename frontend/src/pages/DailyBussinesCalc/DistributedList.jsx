import { useLocation } from "react-router-dom";

const location = useLocation();
    const distributionData = location.state?.distribution || {
      date: '',
      vehicleNumber: '',
      route: '',
      refName: '',
      driverName: '',
      products: [],

    }
      const handleSubmit = () => {
        saveTotalsData(totals);
    };

        const [showReturned, setShowReturned] = useState(false);
        const [showExpired, setShowExpired] = useState(false);
        const [showSamples, setShowSamples] = useState(false);
        const [soldItems, setSoldItems] = useState([
            { productName: "", quantity: "", price: "", value: "" },
        ]);
        const [returnedItems, setReturnedItems] = useState([
            { productName: "", quantity: "", price: "", value: "" },
        ]);
        const [expiredItems, setExpiredItems] = useState([
            { productName: "", quantity: "", storeName: "", price: "", value: "" },
        ]);
        const [sampleItems, setSampleItems] = useState([
            { productName: "", quantity: "", storeName: "", price: "", value: "" },
        ]);
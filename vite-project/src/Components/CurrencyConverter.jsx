import { useState, useEffect } from 'react';
import axios from 'axios';
import './CurrencyConverter.css';

function CurrencyConverter () {
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                setCurrencies([...Object.keys(response.data.rates)]);
                console.log(response);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchCurrencies();
    }, []);

    const handleConvert = async () => {
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
            const rate = response.data.rates[toCurrency];
            setResult((amount * rate).toFixed(2));
        } catch (error) {
            console.error('Error converting currency:', error);
        }
    };

    return (
        <div className="container">
            <div className="currency-box">
                <h1 className="title">Currency Converter</h1>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="currency"
                    />
                </div>
                <div className="form-group">
                    <label>From</label>
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="form-control"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>To</label>
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="form-control"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>{currency}</option>
                        ))}
                    </select>
                </div>
                <button onClick={handleConvert} className="btn-convert">Convert</button>
                {result && (
                    <h3 className="result">Result: {result} {toCurrency}</h3>
                )}
            </div>
        </div>
    );
};

export default CurrencyConverter;

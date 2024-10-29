import { useEffect, useState } from "react";
import "./App.css";
import { tenureDAta } from "./utils/constants";
import TextInput from "./components/text-input";
import SliderInput from "./components/slider-input";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEmi = (downpayment) => {
    if (!cost) return 0;

    const principle = cost - downpayment;
    const rate = interest / 100 / 12; // Monthly interest
    const n = tenure; // Number of months

    const calcEmi =
      (principle * rate * Math.pow(1 + rate, n)) /
      (Math.pow(1 + rate, n) - 1);

    return Number(calcEmi.toFixed(0));
  };

  const calculateDownPayment = (emi) => {
    if (!cost) return 0;

    const downPaymentPercent = 100 - (emi / calculateEmi(0)) * 100;
    return Number(((downPaymentPercent / 100) * cost).toFixed(0));
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEmi(downPayment);
    setEmi(emi);
  }, [cost, tenure, interest]);

  const updateEmi = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setDownPayment(dp);
    const correspondingEmi = calculateEmi(dp);
    setEmi(correspondingEmi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emiValue = Number(e.target.value);
    setEmi(emiValue);

    const dp = calculateDownPayment(emiValue);
    setDownPayment(dp);
  };

  return (
    <div className="App">
      <span className="title">EMI CALCULATOR</span>

      <TextInput title="TOTAL COST OF ASSET" state={cost} setState={setCost} />
      <TextInput title="INTEREST RATE (%)" state={interest} setState={setInterest} />
      <TextInput title="PROCESSING FEE (%)" state={fee} setState={setFee} />

      <SliderInput
        title="DOWN PAYMENT"
        state={downPayment}
        mini={0}
        maxi={cost}
        onChange={updateEmi}
        labelMin={0}
        labelMax={cost}
        fee={fee}
      />

      <SliderInput
        title="LOAN PER MONTH"
        state={emi}
        mini={calculateEmi(cost)}
        maxi={calculateEmi(0)}
        onChange={updateDownPayment}
        labelMin={calculateEmi(cost)}
        labelMax={calculateEmi(0)}
        fee={0}
      />

      <span className="localTitle">TENURE</span>
      <div className="tenureContainer">
        {tenureDAta.map((t, index) => (
          <button
            key={index}
            className={`tenure ${t === tenure ? "selected" : ""}`}
            onClick={() => setTenure(t)}
          >
            {t} months
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

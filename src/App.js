import React, { useState } from 'react';
import './App.css';
import UnitRow from './components/UnitRow'
import convert from 'convert-units';

function App(props) {
  const [measure, setMeasure] = useState('')
  const [fromUnit, setFromUnit] = useState(convert().possibilities(measure)[0])
  const [toUnit, setToUnit] = useState(convert().possibilities(measure)[0])
  const [amount, setAmount] = useState(1)
  const [amountInFromUnit, setAmountInFromUnit] = useState(true)

  let toAmount, fromAmount
  if (amountInFromUnit) {
    fromAmount = amount
    toAmount = convertUnits(fromUnit, toUnit, fromAmount)
  } else {
    toAmount = amount
    fromAmount = convertUnits(toUnit, fromUnit, toAmount)
  }

  const handleChange=(e)=>{
    setMeasure(e.target.value)
    setFromUnit(convert().possibilities(e.target.value)[0])
    setToUnit(convert().possibilities(e.target.value)[0])
  }

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromUnit(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromUnit(false)
  }

  function convertUnits(fromUnit, toUnit, amount)
  {
    if(fromUnit !== '' && toUnit !== '')
    {
      // console.log(fromUnit + ' ' + toUnit)
      return convert(amount).from(fromUnit).to(toUnit)
    }
  }
  return (
    <>
    <h1>Unit Conversions</h1>
    <select onChange={handleChange}>
      {convert().measures().map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    {/* Use props here so you can pass the option from above? */}
    <h2>Convert from: </h2><UnitRow
      // onChange={e => setUnit(e.target.value)}
      measure = {measure}
      fromUnit = {fromUnit}
      onChangeUnit = {e => setFromUnit(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}
    />
    
    <h2>Convert to: </h2><UnitRow 
      measure = {measure}
      toUnit = {toUnit}
      onChangeUnit = {e => setToUnit(e.target.value)}
      onChangeAmount={handleToAmountChange}
      amount={toAmount}
    />
    </>
  );
}

export default App;

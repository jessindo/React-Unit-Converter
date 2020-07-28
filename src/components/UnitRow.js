import React from 'react';
import convert from 'convert-units';

export default function UnitRow(props) {
    const {
        measure,
        onChangeUnit,
        onChangeAmount,
        amount
      } = props

    return (
        <div>
            <input type = "number" min="0" className="input" value={amount || ''} onChange={onChangeAmount}/>
            <select onChange={onChangeUnit}>
                {convert().possibilities(measure).map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

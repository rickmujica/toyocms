'use client';
import { useRef, useEffect, useState } from 'react';
//import noUiSlider from 'nouislider';
import { useSearchParams } from 'next/navigation';
import { Slider } from '@mui/material';

const MIN = 0;
const MAX = 1;

export default function Range({ name, range, step = 1, initial = range, parentHandler }) {
  //const slider = useRef(null);

  if (!range[MIN]) range[MIN] = 0;
  if (!range[MAX]) range[MAX] = 500;

  const [values, setValues] = useState(initial)

  const handleChange = (Event, newValue) => {
    setValues(newValue);
  };

  return (
    <>
      <Slider
        id={`filtro-${name}`}
        getAriaLabel={() => name}
        min={range[MIN]}
        step={step}
        max={range[MAX]}
        value={values}
        onChange={handleChange}
        onChangeCommitted={(e, newValue) => parentHandler(name, newValue)}
        valueLabelDisplay="off"
        getAriaValueText={() => name}
      />
      <div id={`filtro-${name}-values`} className="range-values">
        <div className="min">{Intl.NumberFormat('es-PY', { style: 'decimal' }).format(values[MIN])}</div>
        -
        <div className="max">{Intl.NumberFormat('es-PY', { style: 'decimal' }).format(values[MAX])}</div>
      </div>
    </>
  )
}
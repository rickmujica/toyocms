'use client';
import { useSearchParams } from 'next/navigation';

export default function Checkbox({ name = "", value = "", label = "", id = name, handler = null }) {
  const searchParams = useSearchParams()
  const values = searchParams.getAll(name);

  return (
    <div className="form-check">
      <input className="form-check-input" type="checkbox" name={name} value={value} id={id} onChange={handler} checked={values.includes(String(value))} />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}


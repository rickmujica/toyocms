"use client"

import { Accordion, AccordionBody, AccordionItem, AccordionHeader } from "./BootstrapAccordion"
import Checkbox from "./Checkbox"
import Range from "./Range"
import React from "react"
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function Filters(props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  //const [query, setQuery] = useState(searchParams)

  let db = props?.data ? JSON.parse(props.data) : {}
  const { ranges, categories, brands } = db

  const createQueryString = (op, name, value = '') => {
    const params = new URLSearchParams(searchParams);
    if (op == 'add') {
      params.set(name, value);
    } else if (op == 'append') {
      if (params.has(name)) {
        params.append(name, value);
      } else {
        params.set(name, value);
      }
    } else if (op == 'del_one') {
      const allValues = params.getAll(name);
      console.log(allValues);
      params.delete(name);
      for (let v of allValues){
        if(v != value) params.append(name, v)
      }
    } else {
      params.delete(name);
    }
    return params.toString();
  }

  const applyFilter = (queryString) => {
    router.push(`${pathname}?${queryString}`)
  }

  const checkboxHandler = (e) => {
    let newQuery = '';

    if (e.target.checked) {
      newQuery = createQueryString('append', e.target.name, e.target.value);
    } else {
      newQuery = createQueryString('del_one', e.target.name, e.target.value);
    }
    applyFilter(newQuery)
  }

  const rangeHandler = (name, values) => {
    let newQuery = '';
    const value = String(values[0]) + '-' + String(values[1]);
    newQuery = createQueryString('add', name, value);
    applyFilter(newQuery)
  }

  return (
    <Accordion id="filters" defaultActiveKey="status" flush alwaysOpen>
      <AccordionItem eventKey="status">
        <AccordionHeader>
          Estado
        </AccordionHeader>
        <AccordionBody>
          <Checkbox id="status-available" name="status" value="available" label="Disponible" handler={checkboxHandler} />
          <Checkbox id="status-reserved" name="status" value="reserved" label="Señado" handler={checkboxHandler} />
          <Checkbox id="status-selled" name="status" value="selled" label="Vendido" handler={checkboxHandler} />
        </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey="price">
        <AccordionHeader>
          Precio
        </AccordionHeader>
        <AccordionBody>
          <Range name="price" range={[ranges?.min_price, ranges?.max_price]} step={1000} parentHandler={rangeHandler} />
        </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey="brands">
        <AccordionHeader>
          Marca
        </AccordionHeader>
        <AccordionBody className="dual">
          {brands && brands.map((brand) => (
            <Checkbox name="brand" value={brand.id} label={brand.name} key={brand.id} id={`brand-${brand.id}`} handler={checkboxHandler} />
          ))}
        </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey="tipo">
        <AccordionHeader>
          Tipo
        </AccordionHeader>
        <AccordionBody className="dual">
          {categories && categories.map((cat) => (
            <Checkbox name="category" value={cat.id} label={cat.name} key={cat.id} id={`cat-${cat.id}`} handler={checkboxHandler} />
          ))}
        </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey="transmision">
        <AccordionHeader>
          Transmisión
        </AccordionHeader>
        <AccordionBody>
          <Checkbox name="transmision" value="manual" label="Manual" id="tran-manual" handler={checkboxHandler} />
          <Checkbox name="transmision" value="automatico" label="Automatico" id="tran-auto" handler={checkboxHandler} />
        </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey="kilometers">
        <AccordionHeader>
          kilometraje
        </AccordionHeader>
        <AccordionBody>
          <Range name="kilometers" range={[ranges?.min_kms, ranges?.max_kms]} step={1000} parentHandler={rangeHandler} />
        </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey="year">
        <AccordionHeader>
          Año
        </AccordionHeader>
        <AccordionBody>
          <Range name="year" range={[ranges?.min_year, ranges?.max_year]} parentHandler={rangeHandler} />
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  )
}
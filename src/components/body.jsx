import React, { useState } from "react"
import '../styles/body.css';
import Select from 'react-select'
import Picker from "./picker";

function Body() {
  const [selectedOption, setSelectedOption] = useState({ value: "0", label: "Seleccione una opción" })

  const options = [

    { value: "1", label: "Bienvenida bitwan" },
    { value: "2", label: "Notificar agenda" },
    { value: "3", label: "Envió de factura" },
    { value: "4", label: "Notificar Solución de falla en servicio" },
    { value: "5", label: "Primer advertencia de reporte en centrales" },
    { value: "6", label: "Instalacion con puertos disponibles" },
    { value: "7", label: "Saldos pendientes en la factura" },
    { value: "8", label: "Labores tecnicas en la zona" },
    { value: "9", label: "Retiro de equipos" },
    { value: "10", label: "Finalizar proceso" }
  ]

  if (selectedOption.value === '0') {
    return (
      <div className="contenedor">

        <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} name="template" id="template-select" />

      </div>


    )
  } else {
      return (
      <div className="contenedor">

        <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} name="template" id="template-select" />
        <h1 >{selectedOption.label}</h1>
        <Picker {...selectedOption.value}/>



      </div>
    )
  }



}

export default Body;
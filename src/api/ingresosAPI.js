import axios from 'axios';
const destino = "http://localhost";
const port = "1337";
const POST = 'GestionNomina.asmx';
const Host = 'https://reto2propietaria20201109165745.azurewebsites.net';
export default {

  async create(ingreso) {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Agregar_Ing_Ded xmlns="https://github.com/alfredo00sd/">
          <entry>
            <Title>${ingreso.Title}</Title>
            <Value>0</Value>
            <Description>${ingreso.Description}</Description>
            <SalaryDependent>${ingreso.SalaryDependent.value}</SalaryDependent>
          </entry>
          <tipoIngresoDeduccion>ingreso</tipoIngresoDeduccion>
        </Agregar_Ing_Ded>
      </soap:Body>
    </soap:Envelope>`;

    let response = await axios.post(`https://reto2propietaria20201109165745.azurewebsites.net/GestionAdmin.asmx`, 
                  xmls,
                  {headers:
                    {'Content-Type': 'text/xml',
                  'Accept': 'text/xml'}
                  });

    return response;
  },

  async getTiposIngresos() {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Listar_Ing_Ded xmlns="https://github.com/alfredo00sd/">
          <tipoIngresoDeduccion>ingreso</tipoIngresoDeduccion>
        </Listar_Ing_Ded>
      </soap:Body>
    </soap:Envelope>`;

    let response = await axios.post(`https://reto2propietaria20201109165745.azurewebsites.net/GestionAdmin.asmx`, 
                  xmls,
                  {headers:
                    {'Content-Type': 'text/xml',
                  'Accept': 'text/xml'}
                  });

    return response;
  },
}
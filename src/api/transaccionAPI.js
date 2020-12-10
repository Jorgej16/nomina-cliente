import axios from 'axios';
const destino = "http://localhost";
const port = "1337";
const POST = 'GestionNomina.asmx';
const Host = 'https://reto2propietaria20201109165745.azurewebsites.net';
export default {

  async create(transaccion) {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Procesar_Nomina xmlns="https://github.com/alfredo00sd/">
          <cedula>${transaccion.empleado.Cedula}</cedula>
          <type>${transaccion.tipo}</type>
          <entries>${transaccion.ingreso}</entries>
          <deductions>${transaccion.deduccion}</deductions>
          <concept>${transaccion.description}</concept>
          <amount>${transaccion.monto}</amount>
        </Procesar_Nomina>
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

  async getTransacciones() {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Consultar_transacciones xmlns="https://github.com/alfredo00sd/">
          <transType>string</transType>
          <cedula>string</cedula>
          <fecha_desde>string</fecha_desde>
          <fecha_hasta>string</fecha_hasta>
          <enviadas>int</enviadas>
        </Consultar_transacciones>
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
  async sendAsientos() {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Enviar_asiento_contable xmlns="https://github.com/alfredo00sd/">
          <desde>2020-12-01</desde>
          <hasta>2020-12-31</hasta>
        </Enviar_asiento_contable>
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
  
  async getAsientos() {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Get_asientos_from_API xmlns="https://github.com/alfredo00sd/" />
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
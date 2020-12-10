import axios from 'axios';
const destino = "http://localhost";
const port = "1337";
const POST = 'GestionNomina.asmx';
const Host = 'https://reto2propietaria20201109165745.azurewebsites.net';
export default {

  async create(empleado) {
    let xmls=`<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
              <soap:Body>
                <Crear_Empleado xmlns="https://github.com/alfredo00sd/">
                  <employee>
                    <Nomina>${empleado.nomina}</Nomina>
                    <Cedula>${empleado.cedula}</Cedula>
                    <DepartamentId>${empleado.Departamento.Id}</DepartamentId>
                    <Name>${empleado.nombre}</Name>
                    <LastName>${empleado.apellido}</LastName>
                    <WorkPosition>${empleado.Puesto}</WorkPosition>
                    <Salary>${empleado.Salario}</Salary>
                  </employee>
                </Crear_Empleado>
              </soap:Body>
            </soap:Envelope>`;

    let response = await axios.post(`https://reto2propietaria20201109165745.azurewebsites.net/GestionNomina.asmx`, 
                  xmls,
                  {headers:
                    {'Content-Type': 'text/xml',
                  'Accept': 'text/xml'}
                  });

    return response;
  },

  async getEmpleados() {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Listar_Empleados xmlns="https://github.com/alfredo00sd/" />
      </soap:Body>
    </soap:Envelope>`;

    let response = await axios.post(`https://reto2propietaria20201109165745.azurewebsites.net/GestionNomina.asmx`, 
                  xmls,
                  {headers:
                    {'Content-Type': 'text/xml',
                  'Accept': 'text/xml'}
                  });

    return response;
  },
  async getDepartamentos() {
    let xmls=`<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <Listar_Departamentos xmlns="https://github.com/alfredo00sd/" />
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
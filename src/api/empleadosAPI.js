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
                    <Nomina>${70}</Nomina>
                    <Cedula>${empleado.cedula}</Cedula>
                    <DepartamentId>${22}</DepartamentId>
                    <Name>${empleado.nombre}</Name>
                    <LastName>${empleado.nombre}</LastName>
                    <WorkPosition>${empleado.Puesto}</WorkPosition>
                    <Salary>${empleado.Salario}</Salary>
                  </employee>
                </Crear_Empleado>
              </soap:Body>
            </soap:Envelope>`;

    let response = await axios.post(`${Host}/${POST}?op=Crear_Empleado`, 
                  xmls,
                  {headers:
                    {'Content-Type': 'text/xml'}
                  }).then(res=>{
                    console.log(res);
                  }).catch(err=>{console.log(err)});

    return response;
  },

  async getEmpleados(id) {
    if (id) {
    let response = await axios.get(`${destino}:${port}/v1/empleado/`+id)

    return response.data.body;
    }else{
      
    let response = await axios.get(`${destino}:${port}/v1/empleado/`)

    return response.data.body;
    }
  },
  
}
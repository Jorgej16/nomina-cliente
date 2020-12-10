<template>
  <div>
    <q-btn @click="agregarEmpleado" color="teal">
      <q-icon left size="3em" name="supervisor_account" />
      <div>Nuevo Empleado</div>
    </q-btn>
    <q-dialog v-model="modalCreate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">AGREGAR NUEVO EMPLEADO</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
                <div class="col">
                  <q-input
                    v-model="empleado.nombre"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Nombre"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="empleado.apellido"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Apellido"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="empleado.cedula"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Numero de Cedula"
                    unmasked-value
                    mask="###-#######-#"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="empleado.nomina"
                    label="Numero de cuenta"
                    mask="#####"
                    :rules="[val => !!val || 'Campo requerido']"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="empleado.Departamento"
                  :options="Departamentos"
                  option-value="Id"
                  option-label="Description"
                  label="Departamento"
                />
                </div>
                <div class="col">
                  <q-input
                    :rules="[val => !!val || 'Campo requerido']"
                    type="number"
                    v-model="empleado.Salario"
                  label="Salario"
                  />
                </div>
                <div class="col">
                  <q-select
                    :rules="[val => !!val || 'Campo requerido']"
                    v-model="empleado.Puesto"
                    :options="Puestos"
                    option-value="id"
                    option-label="Puesto"
                    label="Puesto"
                  />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="AGREGAR EMPLEADO" @click="saveEmpleado" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from "axios";
import EmpleadosAPI from "../../../api/empleadosAPI";
import Vue from 'vue';
import x2js from 'x2js'; //xml data processing plugin
Vue.prototype.$x2js = new x2js(); //Global method mount
export default {
  components: {},
  data() {
    return {
        empleado: {
            cedula: "",
            nombre: "",
            apellido: "",
            Departamento: "",
            Salario: "",
            Puesto: "",
            nomina: ""
        },
        Puestos: ["Ingeniero", "Auxiliar", "Gerente"],
        Departamentos: [],
        Nominas: ["Contabilidad"],
        modalCreate: false,
        data: []
    };
  },
  async created() {
    this.getEmpleados();
    this.getDepartamentos();
  },
  methods: {
    async getEmpleados() {
      this.data = await EmpleadosAPI.getEmpleados();
    },
    async getDepartamentos() {
      let empleados = await EmpleadosAPI.getDepartamentos();
      this.convertXml2JSon(empleados.data);
    },
    convertXml2JSon(xml) {
      var jsonObjt = this.$x2js.xml2js(xml);//res (xml data)
      let data = jsonObjt.Envelope.Body.Listar_DepartamentosResponse.Listar_DepartamentosResult.EmployeeDepartment;
     
      if (Array.isArray(data)) {
        this.Departamentos = data;
      }else{
        this.Departamentos.push(data);
      }
    },
    async saveEmpleado() {
      console.log(this.empleado);
      if (this.empleado) {
        await EmpleadosAPI.create(this.empleado).then(response => {
          console.log("mi respuesta", response);
          if (response.status == 200) {
            this.triggerPositive();
            setTimeout(this.loadOnce, 1000);
          } else {
            this.triggernegative();
          }
        });
        this.cleamImpus();
      }
    },
    loadOnce:function(){
      location.reload();
    },
    triggerPositive() {
      this.$q.notify({
        type: "positive",
        message: `Empleado Guardado Correctamente`,
        position: "center"
      });
    },
    triggerWarning() {
      this.$q.notify({
        type: "warning",
        message: `Este Empleado ya Existe.`,
        position: "center"
      });
    },
    triggernegative() {
      this.$q.notify({
        type: "negative",
        message: `No Fue Posible Agregar El Empleado`,
        position: "center"
      });
    },
    cleamImpus() {
      this.modalCreate = false;
      this.empleado.nombre = "";
      this.empleado.apellido = "";
      this.empleado.cedula = "";
      this.empleado.Departamento = "";
      this.empleado.Salario = "";
      this.empleado.Puesto = "";
      this.empleado.Nómina = "";
    },
    agregarEmpleado() {
      this.modalCreate = true;
    }
  }
};
</script>
<style scoped>
.q-btn {
  margin: 10px 5px 0px 0px;
}
.card {
  max-width: 100%;
  margin: 20px 25px;
}
</style>

<template>
  <div>
    <q-btn @click="agregarEmpleado" color="teal">
      <q-icon left size="3em" name="supervisor_account" />
      <div>Nueva Transaccion</div>
    </q-btn>
    <q-btn @click="enviarAsientos" color="purple">
      <div>Enviar asientos</div>
      <q-icon right size="3em" name="send" />
    </q-btn>
    <q-dialog v-model="modalCreate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">AGREGAR NUEVA TRANSACCION</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="transaccion.empleado"
                  :options="empleados"
                  option-value="Cedula"
                  map-options
                  option-label="Name"
                  label="Empleado"
                />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="transaccion.tipo"
                  :options="tipos"
                  option-value="id"
                  option-label="tipo"
                  label="Tipo"
                />
                </div>
                <div v-if="transaccion.tipo == 'Ingreso'" class="row">
                  <div class="col">
                    <q-select
                      :rules="[val => !!val || 'Campo requerido']"
                      v-model="ingresoSelect"
                      :options="ingresos"
                      emit-value
                      map-options
                      option-value="Title"
                      option-label="Title"
                      label="Ingresos"
                    />
                  </div>
                  <div v-if="ingresoSelect != 'salario'" class="col">
                    <q-input
                      v-model="ingresoMonto"
                      type="number"
                      :rules="[val => !!val || 'Campo requerido']"
                      :label="'valor '+ingresoSelect"
                    />
                  </div>
                </div>
                <div v-if="transaccion.tipo == 'Deduccion'" class="col">
                  <!-- <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  filled
                  v-model="deduccionesSelect"
                  multiple
                  use-chips
                  stack-label
                  :options="deducciones"
                  option-value="id"
                  option-label="Title"
                  label="Deduccion"
                /> -->
                
                    <q-select
                      :rules="[val => !!val || 'Campo requerido']"
                      v-model="deduccionesSelect"
                      :options="deducciones"
                      map-options
                      option-value="Title"
                      option-label="Title"
                      label="Deduccion"
                    />
                </div>
                <div class="col">
                  <q-input
                    v-model="transaccion.monto"
                    type="number"
                    readonly
                    label="Monto"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="transaccion.description"
                    type="text"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Description"
                  />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="AGREGAR TRANSACCION" @click="saveTransaccion" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from "axios";
import TransaccionAPI from "../../../api/transaccionAPI";
import EmpleadosAPI from "../../../api/empleadosAPI";
import ingresosAPI from "../../../api/ingresosAPI";
import deducionesAPI from "../../../api/deducionesAPI";
import Vue from 'vue';
import x2js from 'x2js'; //xml data processing plugin
Vue.prototype.$x2js = new x2js(); //Global method mount
export default {
  components: {},
  data() {
    return {
        transaccion: {
            empleado: "",
            ingreso: "",
            deduccion: "",
            description: "",
            tipo: "",
            monto: ""
        },
        ingresoSelect: "",
        deduccionesSelect: "",
        ingresoValor: 0,
        ingresoMonto: 0,
        empleados: [],
        ingresos: [],
        deducciones: [],
        Puestos: ["Ingeniero", "Auxiliar", "Gerente"],
        tipos: ["Ingreso", "Deduccion"],
        estados: ["activo", "inactivo"],
        modalCreate: false,
        data: []
    };
  },
  watch: {
    ingresoSelect: function(val, oldVal) {
      this.transaccion.ingreso = this.ingresoSelect;
      this.transaccion.monto = this.calculateSalary(val);
    },
    ingresoMonto: function(val, oldVal) {
      this.transaccion.monto = this.ingresoMonto;
    },
    deduccionesSelect: function(val, oldVal) {
      this.transaccion.deduccion = this.deduccionesSelect.Title;
      this.transaccion.monto = this.calculateDeduccion(val);
    },
  },
  async created() {
    this.getTransacciones();
    this.getEmpleados();
    this.getIngresos();
    this.getDeduciones();
  },
  methods: {
    calculateSalary(value){
      let monto = 0;
      if (value == "salario") {
        monto = this.transaccion.empleado.Salary/2;
      }
      return monto;
    },
    calculateDeduccion(value){
      let monto = 0;
      if (value.Title == "AFP") {
        let salary = this.transaccion.empleado.Salary/2;
        let descuento = 100/value.Value;
        monto = salary/descuento;
      }
      if (value.Title == "ARS") {
        let salary = this.transaccion.empleado.Salary/2;
        let descuento = 100/value.Value;
        monto = salary/descuento;
      }
      if (value.Title == "ISR") {
        let salaryX12 = this.transaccion.empleado.Salary*12;
        if(salaryX12 <= 416220){
          monto = 0;
        }
        if(salaryX12 >= 416220 && salaryX12 <= 624329){
          let descuento = 100/15;
          monto = this.transaccion.empleado.Salary/descuento;
        }
        if(salaryX12 >= 624329 && salaryX12 <= 867123){
          let descuento = 100/20;
          monto = this.transaccion.empleado.Salary/descuento;
        }
        if(salaryX12 >= 867123){
          let descuento = 100/25;
          monto = this.transaccion.empleado.Salary/descuento;
          console.log(monto);
        }
      }
      return Math.round(monto);
    },
    async getDeduciones() {
      let hola = await deducionesAPI.getDeduciones();  
      var jsonObjt = this.$x2js.xml2js(hola.data);//res (xml data)
      let data = jsonObjt.Envelope.Body.Listar_Ing_DedResponse.Listar_Ing_DedResult.EntryType;
      
      if (Array.isArray(data)) {
        this.deducciones = data;
      }else{
        this.deducciones.push(data);
      }
    },
    async getTransacciones() {
      this.data = await TransaccionAPI.getTransacciones();
    },
    async getEmpleados() {
      let hola = await EmpleadosAPI.getEmpleados();
      var jsonObjt = this.$x2js.xml2js(hola.data);//res (xml data)
      let data = jsonObjt.Envelope.Body.Listar_EmpleadosResponse.Listar_EmpleadosResult.Employee;
      
      if (Array.isArray(data)) {
        this.empleados = data;
      }else{
        this.empleados.push(data);
      }
    },
    async getIngresos() {
      let hola = await ingresosAPI.getTiposIngresos();
      var jsonObjt = this.$x2js.xml2js(hola.data);//res (xml data)
      let data = jsonObjt.Envelope.Body.Listar_Ing_DedResponse.Listar_Ing_DedResult.EntryType;
      
      if (Array.isArray(data)) {
        this.ingresos = data;
      }else{
        this.ingresos.push(data);
      }
    },
    async saveTransaccion() {
      // let deduccionesString = "";
      // for(let deducion of this.deduccionesSelect){
      //   if(deduccionesString != ""){
      //     deduccionesString = deduccionesString+", "+deducion.Title
      //   }else{
      //     deduccionesString = deducion.Title
      //   }
      // }
      // this.transaccion.deduccion = deduccionesString;
      if (this.transaccion) {
        await TransaccionAPI.create(this.transaccion).then(response => {
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
    async enviarAsientos(){
        await TransaccionAPI.sendAsientos();
    },
    loadOnce:function(){
      location.reload();
    },
    triggerPositive() {
      this.$q.notify({
        type: "positive",
        message: `Transaccion Guardado Correctamente`,
        position: "center"
      });
    },
    triggerWarning() {
      this.$q.notify({
        type: "warning",
        message: `Este Transaccion ya Existe.`,
        position: "center"
      });
    },
    triggernegative() {
      this.$q.notify({
        type: "negative",
        message: `No Fue Posible Agregar El Transaccion`,
        position: "center"
      });
    },
    cleamImpus() {
      this.modalCreate = false;
      this.transaccion.empleado = "";
      this.transaccion.ingreso = "";
      this.transaccion.deduccion = "";
      this.transaccion.description = "";
      this.transaccion.tipo = "";
      this.transaccion.monto = "";
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

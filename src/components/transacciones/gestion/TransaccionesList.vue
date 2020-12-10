<template>
  <div class="q-pa-md">
    <q-table title="TRANSACCIONES" :data="data" :columns="columns" row-key="cedula" :filter="filter">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
         
        </q-tr>
      </template>
    </q-table>
    <q-dialog ref="transacciones_delete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_sweep" color="red" text-color="white" />
          <h6>
            <span class="q-ml-sm">Estas Seguro que Deseas Borrar.</span>
          </h6>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes" @click="removeTransacciones(CurrentId)" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalUpdate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">EDITAR TRANSACCION</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentTransaccion.empleado"
                  :options="empleados"
                  option-value="id"
                  option-label="Empleado"
                  label="Empleado"
                />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentTransaccion.ingreso"
                  :options="ingresos"
                  option-value="id"
                  option-label="Ingreso"
                  label="Ingresos"
                />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentTransaccion.deduccion"
                  :options="deducciones"
                  option-value="id"
                  option-label="deduccion"
                  label="Deduccion"
                />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentTransaccion.tipo"
                  :options="tipos"
                  option-value="id"
                  option-label="tipo"
                  label="Tipo"
                />
                </div>
                <div class="col">
                  <q-input
                    v-model="CurrentTransaccion.monto"
                    type="number"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Monto"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="CurrentTransaccion.fecha"
                    type="date"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Fecha"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentTransaccion.estado"
                  :options="estados"
                  option-value="id"
                  option-label="Estados"
                  label="Estados"
                />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="ACTUALIZAR TRANSACCION" @click="updateEmpleado" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import TransaccionAPI from "../../../api/transaccionAPI";
import Vue from 'vue';
import x2js from 'x2js'; //xml data processing plugin
Vue.prototype.$x2js = new x2js(); //Global method mount
export default {
  data() {
    return {
      filter: "",  
        empleados: [],
        ingresos: [],
        deducciones: [],
        Puestos: ["Ingeniero", "Auxiliar", "Gerente"],
        tipos: ["nomina", "regalia", "bono"],
        estados: ["activo", "inactivo"],
      columns: [
        {
          name: "Cedula",
          align: "left",
          label: "Cedula",
          field: "Cedula",
          sortable: true
        },
        {
          name: "EntryDetails",
          align: "left",
          label: "Ingreso",
          field: "EntryDetails",
          sortable: true
        },
        {
          name: "DeductionDetails",
          align: "left",
          label: "Deduccion",
          field: "DeductionDetails",
          sortable: true
        },
        {
          name: "TranscType",
          align: "left",
          label: "Tipo",
          field: "TranscType",
          sortable: true
        },
        {
          name: "Amount",
          align: "left",
          label: "Monto",
          field: "Amount",
          sortable: true
        },
        {
          name: "Date",
          align: "left",
          label: "Fecha",
          field: "Date",
          sortable: true
        },
        { name: "State", label: "Estado", field: "State", 
          align: "left", sortable: true }
      ],
      data: [],
      CurrentId: null,
      CurrentTransaccion: [],
      modalUpdate: false,
    };
  },
  async created() {
    this.getTransacciones();
  },
  methods: {
    async getTransacciones() {
      let hola = await TransaccionAPI.getTransacciones();
      this.convertXml2JSon(hola.data);
    },
    convertXml2JSon(xml) {
      var jsonObjt = this.$x2js.xml2js(xml);//res (xml data)
      let data = jsonObjt.Envelope.Body.Consultar_transaccionesResponse.Consultar_transaccionesResult.TransaccionLog;
      
      if (Array.isArray(data)) {
        this.data = data;
      }else{
        this.data.push(data);
      }
      console.log(this.data);
    },
    updateTransaccionesShow(transaccion) {
      this.CurrentTransaccion = transaccion;
      this.modalUpdate = true;
    },
    async updateEmpleado() {
      let transaccion = this.CurrentTransaccion;
      if (transaccion) {
        await TransaccionAPI.edit(transaccion.id, {
          body: {
            empleado: transaccion.empleado,
            ingreso: transaccion.ingreso,
            deduccion: transaccion.deduccion,
            tipo: transaccion.tipo,
            monto: transaccion.monto,
            fecha: transaccion.fecha,
            estado: transaccion.estado
          }
        }).then(response => {
          if (response.data.status == 1) {
            this.$q.notify({
              type: "positive",
              message: `Actualizado`,
              position: "center"
            });
            this.modalUpdate = false;
            this.getTransacciones();
          } else {
            this.$q.notify({
              type: "negative",
              message: `No Fue Posible`,
              position: "center"
            });
          }
        });
      }
    },
    deleteTransaccion(id) {
      this.CurrentId = id;
      this.$refs.transacciones_delete.show();
    },
    async removeTransacciones(id) {
      await TransaccionAPI.delete(id).then(response => {
        this.$q.notify({
          type: "positive",
          message: `Data successfully deleted.`
        });
        this.getTransacciones();
      });
    }
  }
};
</script>

<style>
</style>
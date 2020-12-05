<template>
  <div class="q-pa-md">
    <q-table title="EMPLEADOS" :data="data" :columns="columns" row-key="Cedula" :filter="filter">
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
          <q-th auto-width>Accion</q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
          <q-td auto-width>
            <q-btn
              size="sm"
              color="teal"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-right">
              <q-btn
                size="sm"
                color="orange"
                round
                dense
                :icon="'edit'"
                @click="updateEmpleadoShow(props.row)"
              />
              <q-btn
                size="sm"
                color="red"
                round
                dense
                :icon="'delete'"
                @click="deleteEmpleado(props.row.id)"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog ref="empleado_delete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_sweep" color="red" text-color="white" />
          <h6>
            <span class="q-ml-sm">Estas Seguro que Deseas Borrar.</span>
          </h6>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes" @click="removeEmpleado(CurrentId)" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalUpdate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">EDITAR EMPLEADO</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
                <div class="col">
                  <q-input
                    v-model="CurrentEmpleado.nombre"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Nombre"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="CurrentEmpleado.apellido"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Apellido"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="CurrentEmpleado.cedula"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Numero de Cedula"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentEmpleado.Departamento"
                  :options="Departamentos"
                  option-value="id"
                  option-label="Departamento"
                  label="Departamento"
                />
                </div>
                <div class="col">
                  <q-input
                    :rules="[val => !!val || 'Campo requerido']"
                    type="number"
                    v-model="CurrentEmpleado.Salario"
                  label="Salario"
                  />
                </div>
                <div class="col">
                  <q-select
                    :rules="[val => !!val || 'Campo requerido']"
                    v-model="CurrentEmpleado.Puesto"
                    :options="Puestos"
                    option-value="id"
                    option-label="Puesto"
                    label="Puesto"
                  />
                </div>
                <div class="col">
                  <q-select
                    :rules="[val => !!val || 'Campo requerido']"
                    v-model="CurrentEmpleado.Nomina"
                    :options="Nominas"
                    option-value="id"
                    option-label="Nomina"
                    label="Nomina"
                  />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="ACTUALIZAR EMPLEADO" @click="updateEmpleado" color="primary" />
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
// import parser from 'xml2json';
import x2js from 'x2js'; //xml data processing plugin
Vue.prototype.$x2js = new x2js(); //Global method mount
export default {
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "Cedula",
          align: "left",
          label: "Cedula",
          field: "Cedula",
          sortable: true
        },
        {
          name: "Name",
          required: true,
          label: "Nombre Y Apellido",
          align: "left",
          field: row => row.Name+' '+row.LastName,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "DepartamentId",
          align: "left",
          label: "Departamento",
          field: "DepartamentId",
          sortable: true
        },
        {
          name: "WorkPosition",
          align: "left",
          label: "Puesto",
          field: "WorkPosition",
          sortable: true
        },
        {
          name: "Salary",
          align: "left",
          label: "Salario",
          field: "Salary",
          sortable: true
        },
        { name: "Nomina", label: "Nomina", field: "Nomina", 
          align: "left", sortable: true }
      ],
      data: [],
      CurrentId: null,
      CurrentEmpleado: [],
        Puestos: ["Ingeniero", "Auxiliar", "Gerente"],
        Departamentos: ["Contabilidad", "RRHH", "Desarrollo"],
        Nominas: ["Contabilidad"],
      modalUpdate: false,
    };
  },
  async created() {
    this.getEmpleados();
  },
  methods: {
    async getEmpleados() {
      let hola = await EmpleadosAPI.getEmpleados();
      console.log(hola);
      this.convertXml2JSon(hola.data);
    },
    convertXml2JSon(xml) {
      var jsonObjt = this.$x2js.xml2js(xml);//res (xml data)
      let data = jsonObjt.Envelope.Body.Listar_EmpleadosResponse.Listar_EmpleadosResult.Employee;
      this.data = data;
      console.log(this.data);
      // console.log(jsonObjt.Envelope.Body.Listar_EmpleadosResponse.Listar_EmpleadosResult); 
    },
    updateEmpleadoShow(empleado) {
      this.CurrentEmpleado = empleado;
      this.modalUpdate = true;
    },
    async updateEmpleado() {
      let empleado = this.CurrentEmpleado;
      if (empleado) {
        await EmpleadosAPI.edit(empleado.id, {
          body: {
            nombre: empleado.nombre,
            cedula: empleado.cedula,
            tanda: empleado.tanda,
            comision: empleado.comision,
            fechaIngreso: empleado.fechaIngreso,
            estado: empleado.estado
          }
        }).then(response => {
          if (response.data.status == 1) {
            this.$q.notify({
              type: "positive",
              message: `Actualizado`,
              position: "center"
            });
            this.modalUpdate = false;
            this.getEmpleados();
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
    deleteEmpleado(id) {
      this.CurrentId = id;
      this.$refs.empleado_delete.show();
    },
    async removeEmpleado(id) {
      await EmpleadosAPI.delete(id).then(response => {
        this.$q.notify({
          type: "positive",
          message: `Data successfully deleted.`
        });
        this.getEmpleados();
      });
    }
  }
};
</script>

<style>
</style>
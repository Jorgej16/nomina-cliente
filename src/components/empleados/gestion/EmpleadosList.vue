<template>
  <div class="q-pa-md">
    <q-table title="EMPLEADOS" :data="data" :columns="columns" row-key="cedula" :filter="filter">
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
                  label="Nombre Y Apellido"
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
                  v-model="CurrentEmpleado.tanda"
                  :options="tandas"
                  option-value="id"
                  option-label="tanda"
                  label="Tanda Laboral"
                />
              </div>
              <div class="col">
                <q-input
                  :rules="[val => !!val || 'Campo requerido']"
                  type="number"
                  v-model="CurrentEmpleado.comision"
                  label="Porciento Comision"
                />
              </div>
              <div class="col">
                <q-input
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentEmpleado.fechaIngreso"
                  filled
                  type="date"
                  label="Fecha de Ingreso"
                />
              </div>
              <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentEmpleado.estado"
                  :options="estados"
                  option-value="id"
                  option-label="name"
                  label="Estado"
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
export default {
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "cedula",
          align: "left",
          label: "Cedula",
          field: "cedula",
          sortable: true
        },
        {
          name: "nombre",
          required: true,
          label: "Nombre Y Apellido",
          align: "left",
          field: row => row.nombre,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "Departamento",
          align: "left",
          label: "Departamento",
          field: "Departamento",
          sortable: true
        },
        {
          name: "Puesto",
          align: "left",
          label: "Puesto",
          field: "Puesto",
          sortable: true
        },
        {
          name: "Salario",
          align: "left",
          label: "Salario",
          field: "Salario",
          sortable: true
        },
        { name: "Nómina", label: "Nómina", field: "Nómina", 
          align: "left", sortable: true }
      ],
      data: [],
      CurrentId: null,
      CurrentEmpleado: [],
      modalUpdate: false,
    };
  },
  async created() {
    this.getEmpleados();
  },
  methods: {
    async getEmpleados() {
      this.data = await EmpleadosAPI.getEmpleados();
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
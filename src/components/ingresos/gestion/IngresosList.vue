<template>
  <div class="q-pa-md">
    <q-table title="TIPOS DE INGRESOS" :data="data" :columns="columns" row-key="cedula" :filter="filter">
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
                @click="updateIngresosShow(props.row)"
              />
              <q-btn
                size="sm"
                color="red"
                round
                dense
                :icon="'delete'"
                @click="deleteIngreso(props.row.id)"
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog ref="ingreso_delete">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete_sweep" color="red" text-color="white" />
          <h6>
            <span class="q-ml-sm">Estas Seguro que Deseas Borrar.</span>
          </h6>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Yes" @click="removeIngreso(CurrentId)" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modalUpdate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">EDITAR TIPO DE INGRESO</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
              <div class="col">
                  <q-input
                    v-model="CurrentTipoIngreso.Nombre"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Nombre"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="CurrentTipoIngreso.SalaryDependent"
                  :options="SalaryDependents"
                  option-value="id"
                  option-label="SalaryDependent"
                  label="SalaryDependent"
                />
                </div>
                <div class="col">
                  <q-select
                    :rules="[val => !!val || 'Campo requerido']"
                    v-model="CurrentTipoIngreso.Estado"
                    :options="Estados"
                    option-value="id"
                    option-label="Estado"
                    label="Estado"
                  />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="ACTUALIZAR TIPO DE INGRESO" @click="updateEmpleado" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import ingresosAPI from "../../../api/ingresosAPI";
export default {
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "nombre",
          required: true,
          label: "Nombre",
          align: "left",
          field: row => row.nombre,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "SalaryDependent",
          align: "left",
          label: "SalaryDependent",
          field: "SalaryDependent",
          sortable: true
        },
        {
          name: "Estado",
          align: "left",
          label: "Estado",
          field: "Estado",
          sortable: true
        },
      ],
      data: [],
      CurrentId: null,
      CurrentTipoIngreso: [],
        Estados: ["Activo", "Inactivo"],
        SalaryDependents: ["contablidad", "ninguno"],
      modalUpdate: false,
    };
  },
  async created() {
    this.getIngresos();
  },
  methods: {
    async getIngresos() {
      this.data = await ingresosAPI.getIngresos();
    },
    updateIngresosShow(ingresos) {
      this.CurrentTipoIngreso = ingresos;
      this.modalUpdate = true;
    },
    async updateEmpleado() {
      let ingresos = this.CurrentTipoIngreso;
      if (ingresos) {
        await ingresosAPI.edit(ingresos.id, {
          body: {
            nombre: ingresos.nombre,
            SalaryDependent: ingresos.SalaryDependent,
            estado: ingresos.estado
          }
        }).then(response => {
          if (response.data.status == 1) {
            this.$q.notify({
              type: "positive",
              message: `Actualizado`,
              position: "center"
            });
            this.modalUpdate = false;
            this.getIngresos();
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
    deleteIngreso(id) {
      this.CurrentId = id;
      this.$refs.ingreso_delete.show();
    },
    async removeIngreso(id) {
      await ingresosAPI.delete(id).then(response => {
        this.$q.notify({
          type: "positive",
          message: `Data successfully deleted.`
        });
        this.getIngresos();
      });
    }
  }
};
</script>

<style>
</style>
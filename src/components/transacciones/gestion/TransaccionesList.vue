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
                @click="updateTransaccionesShow(props.row)"
              />
              <q-btn
                size="sm"
                color="red"
                round
                dense
                :icon="'delete'"
                @click="deleteTransaccion(props.row.id)"
              />
            </div>
          </q-td>
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
          name: "empleado",
          align: "left",
          label: "Empleado",
          field: "empleado",
          sortable: true
        },
        {
          name: "ingreso",
          align: "left",
          label: "Ingreso",
          field: "ingreso",
          sortable: true
        },
        {
          name: "deduccion",
          align: "left",
          label: "Deduccion",
          field: "deduccion",
          sortable: true
        },
        {
          name: "tipo",
          align: "left",
          label: "Tipo",
          field: "tipo",
          sortable: true
        },
        {
          name: "monto",
          align: "left",
          label: "Monto",
          field: "monto",
          sortable: true
        },
        {
          name: "fecha",
          align: "left",
          label: "Fecha",
          field: "fecha",
          sortable: true
        },
        { name: "estado", label: "Estado", field: "estado", 
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
      this.data = await TransaccionAPI.getTransacciones();
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
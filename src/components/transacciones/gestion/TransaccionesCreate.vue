<template>
  <div>
    <q-btn @click="agregarEmpleado" color="teal">
      <q-icon left size="3em" name="supervisor_account" />
      <div>Nueva Transaccion</div>
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
                  option-value="id"
                  option-label="Empleado"
                  label="Empleado"
                />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="transaccion.ingreso"
                  :options="ingresos"
                  option-value="id"
                  option-label="Ingreso"
                  label="Ingresos"
                />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="transaccion.deduccion"
                  :options="deducciones"
                  option-value="id"
                  option-label="deduccion"
                  label="Deduccion"
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
                <div class="col">
                  <q-input
                    v-model="transaccion.monto"
                    type="number"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Monto"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="transaccion.fecha"
                    type="date"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Fecha"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="transaccion.estado"
                  :options="estados"
                  option-value="id"
                  option-label="Estados"
                  label="Estados"
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
export default {
  components: {},
  data() {
    return {
        transaccion: {
            empleado: "",
            ingreso: "",
            deduccion: "",
            tipo: "",
            monto: "",
            fecha: "",
            estado: ""
        },
        empleados: [],
        ingresos: [],
        deducciones: [],
        Puestos: ["Ingeniero", "Auxiliar", "Gerente"],
        tipos: ["nomina", "regalia", "bono"],
        estados: ["activo", "inactivo"],
        modalCreate: false,
        data: []
    };
  },
  async created() {
    this.getTransacciones();
  },
  methods: {
    async getTransacciones() {
      this.data = await TransaccionAPI.getTransacciones();
    },
    async saveTransaccion() {
      if (this.transaccion) {
        await TransaccionAPI.create(this.transaccion).then(response => {
          if (response.data.status == 0) {
            this.triggerWarning();
          }
          if (response.data.status == 1) {
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
      this.transaccion.tipo = "";
      this.transaccion.monto = "";
      this.transaccion.fecha = "";
      this.transaccion.estado = "";
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

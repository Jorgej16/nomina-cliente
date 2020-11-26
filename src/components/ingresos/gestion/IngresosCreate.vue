<template>
  <div>
    <q-btn @click="agregaringreso" color="teal">
      <q-icon left size="3em" name="supervisor_account" />
      <div>Tipos de Ingreso</div>
    </q-btn>
    <q-dialog v-model="modalCreate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">AGREGAR NUEVO TIPO DE INGRESO</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
                <div class="col">
                  <q-input
                    v-model="ingreso.Nombre"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Nombre"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="ingreso.SalaryDependent"
                  :options="SalaryDependents"
                  option-value="id"
                  option-label="SalaryDependent"
                  label="Salary Dependent"
                />
                </div>
                <div class="col">
                  <q-select
                    :rules="[val => !!val || 'Campo requerido']"
                    v-model="ingreso.Estado"
                    :options="Estados"
                    option-value="id"
                    option-label="Estado"
                    label="Estado"
                  />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="AGREGAR TIPO INGRESO" @click="saveingreso" color="primary" />
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
  components: {},
  data() {
    return {
        ingreso: {
            Nombre: "",
            SalaryDependent: "",
            Estado: "",
        },
        Estados: ["Activo", "Inactivo"],
        SalaryDependents: ["si", "no"],
        modalCreate: false,
        data: []
    };
  },
  async created() {
    this.getTiposIngresos();
  },
  methods: {
    async getTiposIngresos() {
      this.data = await ingresosAPI.getTiposIngresos();
    },
    async saveingreso() {
      if (this.ingreso) {
        await ingresosAPI.create(this.ingreso).then(response => {
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
        message: `ingreso Guardado Correctamente`,
        position: "center"
      });
    },
    triggerWarning() {
      this.$q.notify({
        type: "warning",
        message: `Este ingreso ya Existe.`,
        position: "center"
      });
    },
    triggernegative() {
      this.$q.notify({
        type: "negative",
        message: `No Fue Posible Agregar El ingreso`,
        position: "center"
      });
    },
    cleamImpus() {
      this.modalCreate = false;
      this.ingreso.Nombre = "";
      this.ingreso.SalaryDependent = "";
      this.ingreso.Estado = "";
    },
    agregaringreso() {
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

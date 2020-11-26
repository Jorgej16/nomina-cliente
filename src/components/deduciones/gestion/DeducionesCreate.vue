<template>
  <div>
    <q-btn @click="agregardeducion" color="teal">
      <q-icon left size="3em" name="supervisor_account" />
      <div>Tipos de Deducion</div>
    </q-btn>
    <q-dialog v-model="modalCreate">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">AGREGAR NUEVO TIPO DE DEDUCION</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form>
            <div class="q-gutter-md">
                <div class="col">
                  <q-input
                    v-model="deducion.Nombre"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Nombre"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="deducion.SalaryDependent"
                  :options="SalaryDependents"
                  option-value="id"
                  option-label="SalaryDependent"
                  label="Salary Dependent"
                />
                </div>
                <div class="col">
                  <q-select
                    :rules="[val => !!val || 'Campo requerido']"
                    v-model="deducion.Estado"
                    :options="Estados"
                    option-value="id"
                    option-label="Estado"
                    label="Estado"
                  />
                </div>
            </div>
          </q-form>

          <q-card-actions align="right">
            <q-btn flat label="AGREGAR TIPO DEDUCION" @click="savededucion" color="primary" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import axios from "axios";
import deducionesAPI from "../../../api/deducionesAPI";
export default {
  components: {},
  data() {
    return {
        deducion: {
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
    this.getTipos();
  },
  methods: {
    async getTiposDeduciones() {
      this.data = await deducionesAPI.getTiposDeduciones();
    },
    async savededucion() {
      if (this.deducion) {
        await deducionesAPI.create(this.deducion).then(response => {
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
        message: `deducion Guardado Correctamente`,
        position: "center"
      });
    },
    triggerWarning() {
      this.$q.notify({
        type: "warning",
        message: `Este deducion ya Existe.`,
        position: "center"
      });
    },
    triggernegative() {
      this.$q.notify({
        type: "negative",
        message: `No Fue Posible Agregar La Deducion`,
        position: "center"
      });
    },
    cleamImpus() {
      this.modalCreate = false;
      this.deducion.Nombre = "";
      this.deducion.SalaryDependent = "";
      this.deducion.Estado = "";
    },
    agregardeducion() {
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

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
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="empleado.Departamento"
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
                <div class="col">
                  <q-select
                    :rules="[val => !!val || 'Campo requerido']"
                    v-model="empleado.Nómina"
                    :options="Nominas"
                    option-value="id"
                    option-label="Nómina"
                    label="Nómina"
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
            Nómina: ""
        },
        Puestos: ["Ingeniero", "Auxiliar", "Gerente"],
        Departamentos: ["Contabilidad", "RRHH", "Desarrollo"],
        Nominas: ["Contabilidad"],
        modalCreate: false,
        data: []
    };
  },
  async created() {
    this.getEmpleados();
  },
  methods: {
    async getEmpleados() {
      this.data = await EmpleadosAPI.getEmpleados();
    },
    async saveEmpleado() {
      if (this.empleado) {
        await EmpleadosAPI.create(this.empleado).then(response => {
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

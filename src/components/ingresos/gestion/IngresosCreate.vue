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
                    v-model="ingreso.Title"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Titulo"
                  />
                </div>
                <div class="col">
                  <q-input
                    v-model="ingreso.Description"
                    :rules="[val => !!val || 'Campo requerido']"
                    label="Description"
                  />
                </div>
                <div class="col">
                <q-select
                  :rules="[val => !!val || 'Campo requerido']"
                  v-model="ingreso.SalaryDependent"
                  :options="SalaryDependents"
                  option-value="value"
                  option-label="label"
                  label="Salary Dependent"
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
import Vue from 'vue';
import x2js from 'x2js'; //xml data processing plugin
Vue.prototype.$x2js = new x2js(); //Global method mount
export default {
  components: {},
  data() {
    return {
        ingreso: {
            Title: "",
            Description: "",
            SalaryDependent: "",
        },
        SalaryDependents: [{label:"si", value:true}, {label: "no", value:false}],
        modalCreate: false,
        data: []
    };
  },
  async created() {
    this.getTiposIngresos();
  },
  methods: {
    async getTiposIngresos() {
      let hola = await ingresosAPI.getTiposIngresos();
      this.convertXml2JSon(hola.data);
    },
    convertXml2JSon(xml) {
      var jsonObjt = this.$x2js.xml2js(xml);//res (xml data)
      // console.log(jsonObjt.Envelope.Body);
      let data = jsonObjt.Envelope.Body.Listar_Ing_DedResponse.Listar_Ing_DedResult.EntryType;
      
      if (Array.isArray(data)) {
        this.data = data;
      }else{
        this.data.push(data);
      }
    },
    async saveingreso() {
      if (this.ingreso) {
        await ingresosAPI.create(this.ingreso).then(response => {
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
      this.ingreso.Title = "";
      this.ingreso.Description = "";
      this.ingreso.SalaryDependent = "";
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

<template>
<div>
     <q-card class="card">
        <q-card-section>
          <div class="text-h6">20190101
             <q-icon class="icon  text-blue" name="supervisor_account"/>
          </div>
          <h6>JORGE LUIS HERRERA</h6>
        </q-card-section>
      </q-card>
      <q-card class="card">
        <q-card-section>
          <div class="text-h6">20181829
            <q-icon  class="icon" name="supervisor_account"/>
          </div> 
          <h6>ALFREDO ACOSTA</h6>
        </q-card-section>
      </q-card>
      <q-card class="card">
        <q-card-section>
          <div class="text-h6">20181040
            <q-icon  class="icon text-red" name="supervisor_account"/>
          </div> 
          <h6>VICTORIA GARCÍA</h6>
        </q-card-section>
      </q-card>
      <q-card class="card">
        <q-card-section>
          <div class="text-h6">20190036
            <q-icon  class="icon text-orange" name="supervisor_account"/>
          </div> 
          <h6>MIQUEAS GARCÍA</h6>
        </q-card-section>
      </q-card>
    <div>
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
    </div>
</div>
</template>

<script>
import axios from "axios";
import TransaccionAPI from "../api/transaccionAPI";
import Vue from 'vue';
import x2js from 'x2js'; //xml data processing plugin
Vue.prototype.$x2js = new x2js(); //Global method mount
export default {
  name: "Boxes",
  data() {
    return {
      filter: "",
      filter2: "",
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
  }
};
</script>
<style scoped>
.card {
  width: 45%;
  height: 130px;
  margin: 20px 25px;
  display:inline-block;
}
.icon{
  float:right;
  color:green;
  font-size: 40px;
}
h6{
  margin: 2%;
}
</style>
</style>

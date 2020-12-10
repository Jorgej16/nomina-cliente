<template>
  <div class="q-pa-md">
    <q-table title="ASIENTOS CONTABLES" :data="data" :columns="columns" row-key="cedula" :filter="filter">
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
</template>

<script>
import axios from "axios";
import TransaccionAPI from "../../../api/transaccionAPI";
import Vue from 'vue';
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
      CurrentId: null,
    };
  },
  async created() {
    this.getAsientos();
  },
  methods: {
    async getAsientos() {
      let hola = await TransaccionAPI.getAsientos();
      this.convertXml2JSon(hola.data);
    },
    convertXml2JSon(xml) {
      var jsonObjt = this.$x2js.xml2js(xml);//res (xml data)
      let data = jsonObjt.Envelope.Body.Get_asientos_from_APIResponse.Get_asientos_from_APIResult;
      
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

<style>
</style>
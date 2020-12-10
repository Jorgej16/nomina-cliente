<template>
  <div class="q-pa-md">
    <q-table title="ASIENTOS CONTABLES" :data="asientos" :columns="columns" row-key="cedula" :filter="filter">
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
import moment from "moment";
// import json from "../../../api/asiento.json"
import Vue from 'vue';
import x2js from 'x2js'; //xml data processing plugin
Vue.prototype.$x2js = new x2js(); //Global method mount
export default {
  data() {
    return {
      filter: "",  
      columns: [
        {
          name: "auxiliar",
          align: "left",
          label: "auxiliar",
          field: "auxiliar",
          sortable: true
        },
        {
          name: "cuenta",
          align: "left",
          label: "cuenta",
          field: "cuenta",
          sortable: true
        },
        {
          name: "noAsiento",
          align: "left",
          label: "no Asiento",
          field: "noAsiento",
          sortable: true
        },
        {
          name: "descripcionCuenta",
          align: "left",
          label: "descripcion",
          field: "descripcionCuenta",
          sortable: true
        },
        {
          name: "tipoMovimiento",
          align: "left",
          label: "tipo Movimiento",
          field: "tipoMovimiento",
          sortable: true
        },
        {
          name: "fecha",
          align: "left",
          label: "fecha",
          field: "fecha",
          sortable: true,
          format: (val) => this.formatDate(val),
        },
        {
          name: "estado",
          align: "left",
          label: "estado",
          field: "estado",
          sortable: true
        },
        { name: "moneda", label: "moneda", field: "moneda", 
          align: "left", sortable: true }
      ],
      data: [],
      asientos: [],
      CurrentId: null,
    };
  },
  async created() {
    this.getAsientos();
    // this.asientos = json;
  },
  methods: {
      formatDate(date) {
        return moment(date).format('MM-DD-YYYY hh:mm A');
      },
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
      var obj = JSON.parse(this.data[0]);
      this.asientos = obj;
    },
  }
};
</script>

<style>
</style>
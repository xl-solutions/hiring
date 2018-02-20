<template>
    <div class="container custom-input">
        <div>{{ stock }}</div>
        <div class="input-field">
            <span>Data da compra</span>
            <input id="start-date" type="date" :max="maxDate">
        </div>
        <div class="input-field">
            <span>Número de ações</span>
            <input type="number">
        </div>
        <button id="search-btn" class="waves-effect waves-light btn" @click="search" :disabled="queringData">
            Buscar
        </button>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'projection',
    props: ['stock'],
    data () {
        return  {
            queringData: false,
            maxDate: moment().format('YYYY-MM-DD')
        };
    },
    methods: {
        project() {

        }
    }
}
</script>
<style>
.custom-input {
width: 500px;
max-width: 90vw;
}
</style>

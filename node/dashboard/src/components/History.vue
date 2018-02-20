<template>
    <div class="container custom-input">
        <div>{{ stock }}</div>
        <div class="input-field">
            <span>Data Inicial</span>
            <input id="start-date" type="date" :max="maxDate">
        </div>
        <div class="input-field">
            <span>Data final</span>
            <input id="end-date" type="date" :max="maxDate">
        </div>
        <button id="search-btn" class="waves-effect waves-light btn" @click="search" :disabled="queringData">
            Buscar
        </button>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    name: 'history',
    props: ['stock'],
    data () {
        return {
            queringData: false,
            maxDate: moment().format('YYYY-MM-DD')
        };
    },
    methods: {
        search() {

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


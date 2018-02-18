<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" class="glossy">
      <q-toolbar-title class="justify-center">
        Dashboard
      </q-toolbar-title>
    </q-toolbar>
  </q-layout>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle
  } from 'quasar';
  export default {
    name: 'dashboard',
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle
    }
  };
</script>
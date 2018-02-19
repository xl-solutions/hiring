<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" color="dark">
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        XL Soluctions - Stocks Test
        <div slot="subtitle">Using Quasar Framework and NodeJS</div>
      </q-toolbar-title>
    </q-toolbar>

    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-side-link item to="/portfolio" class="side-link">
          <q-item-main label="Portfolio"/>
        </q-side-link >
        <q-side-link item to="/history" class="side-link">
          <q-item-main label="History"/>
        </q-side-link >
        <q-side-link item to="/gains" class="side-link">
          <q-item-main label="Gains"/>
        </q-side-link >
      </q-list>
    </div>

    <router-view />
  </q-layout>
</template>

<script>
  import {
    QBtn,
    QIcon,
    QLayout,
    QList,
    QListHeader,
    QItemSide,
    QItemMain,
    QSideLink,
    QToolbar,
    QToolbarTitle
  } from 'quasar'

  export default {
    name: 'lauouts_default',
    components: {
      QBtn,
      QIcon,
      QLayout,
      QList,
      QListHeader,
      QItemSide,
      QItemMain,
      QSideLink,
      QToolbar,
      QToolbarTitle
    },
    data () {
      return { }
    }
  }
</script>

<style lang="stylus">
</style>

<template>
  <div>
    <md-card class="margin-content">
      <md-card-area class="margin-content">
        <form @submit.prevent="newStock()">
          <md-input-container>
            <label for="stock">Stock Name</label>
            <md-input placeholder="Stock Name" v-model="stock.name"></md-input>
          </md-input-container>
          <md-button type="submit" class="md-icon-button md-raised md-primary">
            <md-icon>save</md-icon>
          </md-button>
        </form>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      stock: {
        name: ''
      }
    }
  },
  methods: {
    newStock: function () {
      localStorage.setItem(this.stock.name, JSON.stringify(this.stock))
      this.$router.push('/')
    }
  }
}
</script>

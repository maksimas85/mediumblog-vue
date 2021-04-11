<template>
  <div id="app">
    <mbv-top-bar />
    <router-view />
  </div>
</template>

<script>
import MbvTopBar from '@/components/TopBar'
import {actionsTypes} from '@/store/types/auth'

export default {
  name: 'MbvApp',
  components: {
    MbvTopBar
  },
  mounted() {
    this.$store.dispatch(actionsTypes.getCurrentUser)
  }
}
</script>

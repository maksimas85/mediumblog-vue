<template>
  <div id="app">
    <mbv-top-bar />
    <router-view />
  </div>
</template>

<script>
import MbvTopBar from '@/components/TopBar'

export default {
  name: 'MbvApp',
  components: {
    MbvTopBar
  }
}
</script>

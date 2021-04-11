<template>
  <div>Feed</div>
</template>

<script>
import {actionTypes} from '@/store/types/feed'

export default {
  name: 'MbvFeed',
  props: {
    apiURL: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.$store.dispatch(actionTypes.getFeed, {apiURL: this.apiURL})
  }
}
</script>

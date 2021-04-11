<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mbv-feed :apiURL="apiURL" />
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import MbvFeed from '@/components/Feed'

export default {
  name: 'MbvGlobalFeed',
  components: {
    MbvFeed
  },
  data() {
    return {
      apiURL: '/articles'
    }
  }
}
</script>

<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mbv-feed :apiURL="apiURL" />
        </div>
        <div class="col-md-3">
          <mbv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MbvFeed from '@/components/Feed'
import MbvPopularTags from '@/components/PopularTags'

export default {
  name: 'MbvGlobalFeed',
  components: {
    MbvFeed,
    MbvPopularTags
  },
  data() {
    return {
      apiURL: '/articles'
    }
  }
}
</script>

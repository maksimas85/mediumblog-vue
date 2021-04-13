<template>
  <div class="home-page">
    <mbv-banner />
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
import MbvBanner from '@/components/Banner'

export default {
  name: 'MbvYourFeed',
  components: {
    MbvFeed,
    MbvPopularTags,
    MbvBanner
  },
  data() {
    return {
      apiURL: '/articles/feed'
    }
  }
}
</script>

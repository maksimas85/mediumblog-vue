<template>
  <div class="home-page">
    <mbv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mbv-feed-toggle :tag-name="tagName" />
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
import MbvFeedToggle from '@/components/FeedToggle'

export default {
  name: 'MbvTagFeed',
  components: {
    MbvFeed,
    MbvPopularTags,
    MbvBanner,
    MbvFeedToggle
  },
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiURL() {
      return `articles?tag=${this.tagName}`
    }
  }
}
</script>

<template>
  <div>
    <mbv-loading v-if="isLoading" />
    <mbv-error-message v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-meta">
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src="article.author.image" alt="#" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: {slug: article.author.username}
              }"
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">
              {{ article.createdAt }}
            </span>
          </div>
          <div class="pull-xs-right">
            <mbv-add-to-favorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <mbv-tag-list :tags="article.tagList" />
        </router-link>
      </div>
      <mbv-pagination
        :total="feed.articlesCount"
        :limit="limit"
        :current-page="currentPage"
        :url="baseURL"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/types/feed'
import MbvPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import {stringify, parseUrl} from 'query-string'
import MbvLoading from '@/components/Loading'
import MbvErrorMessage from '@/components/ErrorMessage'
import MbvTagList from '@/components/TagList'
import MbvAddToFavorites from '@/components/AddToFavorites'

export default {
  name: 'MbvFeed',
  props: {
    apiURL: {
      type: String,
      required: true
    }
  },
  components: {
    MbvPagination,
    MbvLoading,
    MbvErrorMessage,
    MbvTagList,
    MbvAddToFavorites
  },
  data() {
    return {
      limit
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseURL() {
      return this.$route.path
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed()
    },
    apiURL() {
      this.fetchFeed()
    }
  },
  mounted() {
    this.fetchFeed()
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiURL)
      const stringParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiURLWithParams = `${parsedUrl.url}?${stringParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiURL: apiURLWithParams})
    }
  }
}
</script>

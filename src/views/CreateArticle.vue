<template>
  <mbv-article-form
    :initial-values="initialValues"
    :errors="validationErrors"
    :isSubmitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/types/createArticle'
import MbvArticleForm from '@/components/ArticleForm'

export default {
  name: 'MbvCreateArticle',
  components: {
    MbvArticleForm
  },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    }
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors
    })
  },
  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, {articleInput})
        .then(article => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    }
  }
}
</script>

<template>
  <div>
    Create Article
    <mbv-article-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
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
      },
      validationErrors: null,
      isSubmitting: false
    }
  },
  methods: {
    onSubmit(data) {
      console.log('onSubmit data', data)
    }
  }
}
</script>

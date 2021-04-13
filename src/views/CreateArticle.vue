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
export default {
  name: 'MbvCreateArticle',
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

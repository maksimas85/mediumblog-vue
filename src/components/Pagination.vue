<template>
  <div>PAGINATION!!!</div>
</template>

<script>
export default {
  name: 'MbvPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    pages() {
      const pagesCount = Math.ceil(this.total/this.limit)
      return [1,2,3,4,5]
    }
  }
}
</script>

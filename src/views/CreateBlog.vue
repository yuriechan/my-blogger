<template>
  <v-container>
    <v-text-field label="Title" v-model="headerText"></v-text-field>
    <v-textarea
      name="input-7-1"
      auto-grow
      background-color="transparent"
      v-model="bodyText"
    >
    </v-textarea>
    <div class="text-center">
      <v-btn rounded color="primary" :disabled="isEmptyContext"
        >Publish it.
      </v-btn>
    </div>
  </v-container>
</template>
<script>
export default {
  name: "CreateBlog",
  data: () => ({
    headerText: "",
    bodyText: ""
  }),
  methods: {},
  computed: {
    isEmptyContext() {
      return this.bodyText.length === 0 || this.headerText.length === 0;
    }
  }
};
</script>

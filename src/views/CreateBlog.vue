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
      <v-btn
        rounded
        color="primary"
        :disabled="isEmptyContext"
        @click="createBlog"
        >Publish it.
      </v-btn>
    </div>
  </v-container>
</template>
<script>
import db from "../../firebaseConfig.js";
export default {
  name: "CreateBlog",
  data: () => ({
    headerText: "",
    bodyText: ""
  }),
  methods: {
    createBlog() {
      db.collection("blog")
        .add({
          post_id: this.postCount,
          post_title: this.headerText,
          post_content: this.bodyText,
          post_timestamp: Date()
        })
        .then(() => {
          this.$router.push("/");
          this.clearInputField();
          this.$store.commit("incrementPostCount");
          console.log("was posted!");
        })
        .catch(error => console.log(error));
    },
    clearInputField() {
      this.headerText = "";
      this.bodyText = "";
    }
  },
  computed: {
    isEmptyContext() {
      return this.bodyText.length === 0 || this.headerText.length === 0;
    },
    postCount() {
      return this.$store.state.postCount;
    }
  }
};
</script>

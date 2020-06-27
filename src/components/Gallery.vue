<template>
  <div>
    <v-container v-for="blogPost in blogPosts" v-bind:key="blogPost.id">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        >
          <v-card-title>{{ blogPost.post_title }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">{{
          `Number: ${blogPost.post_id}`
        }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ limitTextLength(blogPost.post_content) }}</div>
        </v-card-text>
      </v-card>
      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import db from "../../firebaseConfig";
export default {
  name: "Gallery",

  data: () => ({
    blogPosts: []
  }),
  created() {
    db.collection("blog")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data());
          const data = {
            id: doc.id,
            post_id: doc.data().post_id,
            post_title: doc.data().post_title,
            post_content: doc.data().post_content
          };
          this.blogPosts.push(data);
          this.sortByDescendingId(this.blogPosts);
        });
      });
  },
  methods: {
    sortByDescendingId(arr) {
      arr.sort((a, b) => b.post_id - a.post_id);
    },
    limitTextLength(state) {
      let slicedText =
        state.length > 190 ? state.slice(0, 190) + "....." : state;
      return slicedText;
    }
  },
  computed: {}
};
</script>

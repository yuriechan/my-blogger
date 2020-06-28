<template>
  <div>
    <v-container v-for="blogPost in blogPosts" v-bind:key="blogPost.id">
      <v-dialog width="900px">
        <template v-slot:activator="{ on, attrs }">
          <v-hover v-slot:default="{ hover }">
            <v-card
              @click="addQueryToPath(blogPost.post_id)"
              class="mx-auto"
              max-width="400"
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
              v-bind="attrs"
              v-on="on"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="blogDefaultImg"
              >
                <v-card-title>{{ blogPost.post_title }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">{{
                `${formatDate(blogPost.post_timestamp)}`
              }}</v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{ limitTextLength(blogPost.post_content) }}</div>
              </v-card-text>
            </v-card>
          </v-hover>
        </template>

        <BlogDetail
          :postTitle="blogPost.post_title"
          :postContent="blogPost.post_content"
          :postDefaultImg="blogDefaultImg"
          :postId="blogPost.post_id"
          :postAutoId="blogPost.id"
        />
      </v-dialog>

      <v-spacer></v-spacer>
    </v-container>
  </div>
</template>

<script>
import db from "../../firebaseConfig";
import BlogDetail from "../components/BlogDetail";
import moment from "moment";
export default {
  name: "Gallery",
  components: {
    BlogDetail
  },
  data: () => ({
    blogPosts: [],
    blogDefaultImg: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
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
            post_content: doc.data().post_content,
            post_timestamp: doc.data().post_timestamp
          };
          this.blogPosts.push(data);
        });
        this.sortByLatestTime(this.blogPosts);
      });
  },
  methods: {
    sortByDescendingId(arr) {
      arr.sort((a, b) => b.post_id - a.post_id);
    },
    sortByLatestTime(arr) {
      arr.sort(
        (a, b) => new Date(b.post_timestamp) - new Date(a.post_timestamp)
      );
    },
    limitTextLength(state) {
      let slicedText =
        state.length > 190 ? state.slice(0, 190) + "....." : state;
      return slicedText;
    },
    formatDate(originalDate) {
      return moment(originalDate).format("LLL");
    },
    addQueryToPath(postId) {
      console.log("add param to path");
      console.log(this.$router);
      this.$router.push({
        name: "Gallery",
        query: { id: postId }
      });
    }
  },
  computed: {}
};
</script>
<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
}
</style>

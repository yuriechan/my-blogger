<template>
  <v-card
    :style="
      editing ? { backgroundColor: '#BBDEFB' } : { backgroundColor: '#FFFFFF' }
    "
  >
    <v-img class="white--text" height="200px" :src="this.postDefaultImg">
    </v-img>
    <div class="px-16">
      <v-card-title class="pb-10" :contenteditable="editing" @input="editTitle">
        <span class="headline">{{ this.postTitle }}</span>
      </v-card-title>
      <v-card-text :contenteditable="editing" @input="editBody">{{
        this.postContent
      }}</v-card-text>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-speed-dial
        v-model="fab"
        :bottom="bottom"
        :right="right"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
      >
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="green" @click="editing = !editing">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          color="red"
          @click="confirmDialogOpen = !confirmDialogOpen"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
      <v-btn class="ma-2 saveBtn" outlined color="indigo"
        >Outlined Button</v-btn
      >
    </v-card-actions>
    <v-dialog v-model="confirmDialogOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this post?</v-card-title
        >
        <v-card-text>Deleted post will never be recovered.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="(confirmDialogOpen = false), deletePost()"
            >Yes, delete.</v-btn
          >
          <v-btn color="green darken-1" text @click="confirmDialogOpen = false"
            >No, I changed my mind.</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import db from "../../firebaseConfig";
export default {
  name: "BlogDetail",
  props: ["postTitle", "postContent", "postDefaultImg", "postId", "postAutoId"],
  data: () => ({
    direction: "left",
    fab: false,
    hover: true,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition",
    confirmDialogOpen: false,
    titleText: "",
    bodyText: "",
    editing: false,
    saveBtnOpen: false
  }),
  methods: {
    deletePost() {
      db.collection("blog")
        .where("post_id", "==", this.$route.query.id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
          this.$router.go();
        })
        .catch(err => console.log("Error getting documents", err));
    },
    editTitle(e) {
      this.titleText = e.target.innerText;
    },
    editBody(e) {
      this.bodyText = e.target.innerText;
    },
    textChanged(originalText, newText) {
      return originalText.localeCompare(newText);
    }
    // Did not work as expected, might use later.
    // focusTitleInput() {
    //   console.log("focus");
    //   console.log(this.$refs.editTitle);
    //   this.$refs.editTitle.focus();
    // },
    // focusBodyInput() {
    //   console.log("focus");
    //   console.log(this.$refs.editBody);
    //   this.$refs.editBody.focus();
    // }
  },
  watch: {
    // editing: function(val) {
    //   console.log(val);
    //   if (val) {
    //     this.focusTitleInput();
    //     this.focusBodyInput();
    //   }
    // }
  }
};
</script>
<style scoped>
.saveBtn {
  left: 16px;
  position: absolute;
  bottom: 16px;
}</style
>>

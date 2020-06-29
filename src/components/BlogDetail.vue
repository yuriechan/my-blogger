<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="this.postDefaultImg">
    </v-img>
    <div
      class="px-16"
      :style="editing ? { outlineWidth: 'thin', outlineStyle: 'dashed' } : null"
      :class="editing ? editField.className : null"
    >
      <v-card-title class="pb-10" :contenteditable="editing" @input="editTitle">
        <span class="headline">{{ postTitle }}</span>
      </v-card-title>
      <v-card-text :contenteditable="editing" @input="editBody">{{
        postContent
      }}</v-card-text>
    </div>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-speed-dial
        class="actionOption"
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
        <v-btn
          fab
          dark
          small
          color="green"
          @click="(editing = !editing), createCopy()"
        >
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
      <v-btn
        @click="updatePost()"
        class="ma-2 saveBtn"
        absolute
        outlined
        color="indigo"
        v-show="saveBtnOpen"
        >Save change</v-btn
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
  props: [
    "postTitle",
    "postContent",
    "postDefaultImg",
    "postId",
    "postAutoId",
    "detailDialog"
  ],
  data: () => ({
    direction: "left",
    fab: false,
    hover: true,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition",
    confirmDialogOpen: false,
    editedTitle: null,
    editedBody: null,
    editing: false,
    saveBtnOpen: false,
    editField: {
      className: {
        "ma-2": true
      }
    }
  }),
  methods: {
    deletePost() {
      const autoIdDocRef = db.collection("blog").doc(this.postAutoId);
      autoIdDocRef
        .delete()
        .then(() => {
          this.$router.go();
        })
        .catch(error => {
          "Error removing document: ", error;
        });
    },
    updatePost() {
      const autoIdDocRef = db.collection("blog").doc(this.postAutoId);
      return db
        .runTransaction(transaction => {
          return transaction.get(autoIdDocRef).then(autoIdDoc => {
            if (!autoIdDoc.exists) {
              throw "Document does not exist!";
            }
            transaction.update(autoIdDocRef, {
              post_title: this.editedTitle,
              post_content: this.editedBody
            });
          });
        })
        .then(() => {
          console.log("Transaction success!");
          this.$router.go();
        })
        .catch(error => {
          console.log("Transaction error", error);
        });
    },
    editTitle(e) {
      this.editedTitle = e.target.innerText;
    },
    editBody(e) {
      this.editedBody = e.target.innerText;
    },
    textChanged() {
      return (
        this.postTitle.trim() != this.editedTitle.trim() ||
        this.postContent.trim() != this.editedBody.trim()
      );
    },
    createCopy() {
      this.editedTitle = this.postTitle;
      this.editedBody = this.postContent;
    }
  },
  watch: {
    editedTitle: function() {
      console.log("inside watch title");
      this.saveBtnOpen = this.textChanged();
    },
    editedBody: function() {
      console.log("inside watch body");
      this.saveBtnOpen = this.textChanged();
    },
    detailDialog: function() {
      if (this.detailDialog === false) {
        this.editing = this.saveBtnOpen = false;
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style scoped>
.saveBtn {
  left: 16px;
  bottom: 16px;
}
.actionOption {
  top: -5px;
}
</style>

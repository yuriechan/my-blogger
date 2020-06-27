<template>
  <v-card>
    <v-img class="white--text" height="200px" :src="this.postDefaultImg">
    </v-img>
    <div class="px-16">
      <v-card-title class="pb-10">
        <span class="headline">{{ this.postTitle }}</span>
      </v-card-title>
      <v-card-text>{{ this.postContent }}</v-card-text>
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
        <v-btn fab dark small color="green">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn fab dark small color="red">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: "BlogDetail",
  props: ["postTitle", "postContent", "postDefaultImg"],
  data: () => ({
    direction: "left",
    fab: false,
    hover: true,
    right: true,
    bottom: true,
    transition: "slide-y-reverse-transition"
  })
};
</script>

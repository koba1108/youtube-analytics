<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card>
        <v-card-title class="headline">
          Youtube Channel Results
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="youtubeChannels"
          item-key="id.channelId"
          sort-by="subscriberCount"
          :sort-desc="true"
          :items-per-page="50"
          dense
        />
        <v-card-actions>
          <v-spacer/>
          <v-btn color="secondary" @click="doGet">Get</v-btn>
          <v-btn color="primary" @click="doSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { YoutubeSearch, YoutubeChannel } from '~/plugins/youtube'
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      collection: firebase.firestore().collection('youtube'),
      keyword: 'エンジニア',
      nextPageToken: '',
      channels: [],
      channelIds: [],
      youtubeChannels: [],
      headers: [
        { text: 'チャンネルID', value: 'id.channelId' },
        { text: 'チャンネル名', value: 'snippet.title', },
        { text: 'チャンネル登録者数', value: 'subscriberCount' },
        { text: '総視聴回数', value: 'viewCount' },
      ],
    }
  },
  async mounted() {
    const { docs } = await this.collection.get()
    docs.map((doc) => {
      this.channelIds.push(doc.id)
      this.youtubeChannels.push(doc.data())
    })
  },
  methods: {
    async doLogin() {
      try {
        const authUI = new firebase.auth.GoogleAuthProvider()
        await firebase.auth().signInWithPopup(authUI)
      } catch (e) {
        console.error(e)
        alert(e.message)
      }
    },
    async doGet() {
      const idListSlice = [
        this.channelIds.slice(0, 50),
        this.channelIds.slice(50, 100),
        this.channelIds.slice(100, 150),
        this.channelIds.slice(150, 200),
        this.channelIds.slice(200, 250),
        this.channelIds.slice(250, 300),
        this.channelIds.slice(300, 350),
        this.channelIds.slice(350, 400),
        this.channelIds.slice(400, 450),
        this.channelIds.slice(450, 500),
      ]
      idListSlice.map(async ids => {
        const { items } = await YoutubeChannel(ids, this.nextPageToken)
        items.map(async item => {
          await this.collection.doc(item.id).set({
            hiddenSubscriberCount: item.statistics.hiddenSubscriberCount,
            subscriberCount: Number(item.statistics.subscriberCount),
            videoCount: Number(item.statistics.videoCount),
            viewCount: Number(item.statistics.viewCount),
          }, {merge: true})
        })
      })
    },
    async doSave() {
      try {
        if(!firebase.auth().currentUser) {
          await this.doLogin()
        } else {
          await this.fetchYoutubeData()
          await this.save2Firestore()
          if (this.nextPageToken) {
            await this.doSave()
          }
        }
      } catch (e) {
        console.error(e)
        alert(e.message)
      }
    },
    async fetchYoutubeData() {
      const result = await YoutubeSearch(this.keyword, this.nextPageToken)
      this.nextPageToken = result.nextPageToken ? result.nextPageToken : ''
      this.channels = result.items
    },
    async save2Firestore() {
      await this.channels.map(channel => this.collection.doc(channel.id.channelId).set(channel))
    },
  },
}
</script>

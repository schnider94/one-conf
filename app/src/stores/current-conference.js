import { defineStore } from 'pinia'

import { getCurrent } from '@/API/conferences'

export const useCurrentConference = defineStore('current-conference', {
  state: () => ({
    initial: true,
    conference: null,
  }),
  getters: {
    id: state => state.conference?._id,
    name: state => state.conference?.name,
  },
  actions: {
    init() {
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          this.update()
        }
      });

      this.update()
    },
    update() {
      getCurrent()
        .then(conference => {
          if (!this.initial && conference?._id !== this.conference?._id) window.location.reload()

          this.conference = conference
          this.initial = false
        })
    },
  },
})

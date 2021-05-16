<template>
  <div class="text-center section">
    <h2 class="h2">Custom Calendars</h2>
    <p class="text-lg font-medium text-gray-600 mb-6">
      Roll your own calendars using scoped slots
    </p>
    <vc-calendar
      class="custom-calendar max-w-full"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <template v-slot:day-content="{ day, attributes }">
        <div class="flex flex-col h-full z-10 overflow-hidden">
          <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
          <div class="flex-grow overflow-y-auto overflow-x-auto">
            <p
              v-for="attr in attributes"
              :key="attr.key"
              class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
              :class="attr.customData.class"
            >
              {{ attr.customData.title }}
              <v-icon size="18" style="float:right">{{ attr.customData.icon }}</v-icon>
            </p>
          </div>
        </div>
      </template>
    </vc-calendar>
  </div>
</template>

<script>
export default {
  data() {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      posts: [],
      masks: {
        weekdays: 'WWW',
      },
      attributes: [
        {
          key: 1,
          customData: {
            title: 'Lolo1',
            class: this.getColor(new Date(year, month, 1), "Published"),
            icon: this.getIcon(new Date(year, month, 1)),
          },
          dates: new Date(year, month, 1),
        },
        {
          key: 2,
          customData: {
            title: 'Lolo2',
            class: this.getColor(new Date(year, month, 2), "Published"),
            icon: this.getIcon(new Date(year, month, 2)),
          },
          dates: new Date(year, month, 2),
        },
        {
          key: 3,
          customData: {
            title: "lili1",
            class: this.getColor(new Date(year, month, 5), "Published"),
            icon: this.getIcon(new Date(year, month, 5)),
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Post 2',
            class: this.getColor(new Date(year, month, 5), "Published"),
            icon: this.getIcon(new Date(year, month, 5)),
          },
          dates: new Date(year, month, 5),
        },
        {
          key: 4,
          customData: {
            title: 'Doraraaaaaa!',
            class: this.getColor(new Date(year, month, 7), "Published"),
            icon: this.getIcon(new Date(year, month, 7)),
          },
          dates: new Date(year, month, 7),
        },
        {
          key: 5,
          customData: {
            title: "horaaaaa :)",
            class: this.getColor(new Date(year, month, 11), "Published"),
            icon: this.getIcon(new Date(year, month, 11)),
          },
          dates: new Date(year, month, 11),
        },
        {
          key: 6,
          customData: {
            title: 'riders on storm',
            class: this.getColor(new Date(year, month, 11), "Published"),
            icon: this.getIcon(new Date(year, month, 11)),
          },
          dates: { months: 5, ordinalWeekdays: { 2: 1 } },
        },
        {
          key: 7,
          customData: {
            title: "resiidiii",
            class: this.getColor(new Date(year, month, 22), "Published"),
            icon: this.getIcon(new Date(year, month, 22)),
          },
          dates: new Date(year, month, 22),
        },
        {
          key: 8,
          customData: {
            title: 'Nope',
            class: this.getColor(new Date(year, month, 25), "Published"),
            icon: this.getIcon(new Date(year, month, 25)),
          },
          dates: new Date(year, month, 25),
        },
      ],
    };
  },
  mounted() {
    this.getAllPosts()
  },
  methods: {
    getAllPosts: function () {
      const teamID = this.$route.params.workspace
      this.$store.dispatch('post/getAllPosts', teamID).then(resp => {
        this.posts = resp.data
        this.fillCalender()
        console.log(resp.data)
      }).catch()
    },
    fillCalender() {
      console.log(this.posts)
      var postIndex
      for (postIndex in this.posts) {
        this.attributes.push({
          key: postIndex,
          customData: {
            title: this.posts[postIndex].name,
            class: this.getColor(new Date(this.posts[postIndex].created_at), this.posts[postIndex].status),
            icon: this.getIcon(new Date(this.posts[postIndex].created_at)),
          },
          dates: new Date(this.posts[postIndex].created_at),
        })
      }
    },
    getIcon(date) {
      var now = new Date()
      console.log(now)
      console.log(date)
      console.log(now > date)

      if (now > date) {
        return 'mdi-checkbox-marked-circle-outline'
      } else {
        return 'mdi-timelapse'
      }
    },
    getColor(date, postStatus) {
      var nowMinus1 = new Date();
      var now = new Date();
      nowMinus1.setHours(now.getHours() - 1);

      if (((date > nowMinus1) || (date < now)) && postStatus != 'Published') {
        return 'bg-blue-500 text-white'
      } else if (date > now) {
        return 'bg-indigo-500 text-white'
      } else {
        return 'bg-green-600 text-white'
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f8fafc;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .is-today {
      border: hotpink;
      &.vc-day {
          background-color: white;
          &.weekday-1,
          &.weekday-7 {
          background-color: #eff8ff;
          border: 2px dashed #f56565!important;
        }
      }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>

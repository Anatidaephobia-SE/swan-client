<template>
  <v-container class="pa-md4">

    <v-card-title>
      <v-icon aria-hidden="false" class="mr-2" role="img">{{ icons.mdiTrendingUp }}</v-icon>
      Trending Hashtags
    </v-card-title>

    <v-card-text class="text">
      <v-select
          v-model="selected"
          :items="available_countries"
          class="select"
          filled
          placeholder="Choose a country"

      >
      </v-select>
      <!-- <v-btn
          class="button"
          color="primary"
          :loading="loading"
          :disabled="selected == null"
          depressed
          @click="getHashtags"
          >
      Get Hashtags
      </v-btn> -->
      <div class="lists">
        <v-list v-if="this.hashtags.length != 0" class="hashtag-list" dense nav>
          <v-subheader style="font-size: 20px">Trends On {{ this.selected }}</v-subheader>

          <vue-custom-scrollbar class="scroll-area">
            <v-list-item-group color="primary">

              <v-list-item v-for="hashtag in this.hashtags1" :key="hashtag" color="#68b3e8">
                <a :href="`https://twitter.com/search?q=%23${hashtag.replace('#', '')}&src=typed_query`"
                   target="_blank">{{ hashtag }}</a>
                <v-icon style="margin-left: auto; margin-right: 5px;" @click="addToPost(hashtag)">mdi-plus</v-icon>
              </v-list-item>


            </v-list-item-group>
          </vue-custom-scrollbar>

        </v-list>

        <v-list v-if="this.hashtags.length == 0" class="hashtags-list-preview" dense nav>

          <v-subheader style="font-size: 20px">Select A Country To Get Trend Hashtags On It</v-subheader>
          <v-list-item-group color="primary">

            <v-list-item color="#68b3e8">
              <a href="#">#example</a>
              <v-icon style="margin-left: auto">mdi-plus</v-icon>

            </v-list-item>

          </v-list-item-group>

        </v-list>

      </div>

    </v-card-text>

  </v-container>
</template>


<script>
import {mdiTrendingUp} from "@mdi/js";
import axios from "axios";
import vueCustomScrollbar from 'vue-custom-scrollbar'
import "vue-custom-scrollbar/dist/vueScrollbar.css"
import {mapMutations, mapState} from "vuex";


export default {
  name: "RetrieveHashtags",
  components: {
    vueCustomScrollbar
  },
  data() {
    return {
      available_countries: ['Winnipeg', 'Ottawa', 'Quebec', 'Montreal', 'Toronto', 'Edmonton', 'Calgary', 'Vancouver', 'Birmingham',
        'Blackpool', 'Bournemouth', 'Brighton', 'Bristol', 'Cardiff', 'Coventry', 'Derby', 'Edinburgh', 'Glasgow',
        'Hull', 'Leeds', 'Leicester', 'Liverpool', 'Manchester', 'Middlesbrough', 'Newcastle', 'Nottingham', 'Plymouth',
        'Portsmouth', 'Preston', 'Sheffield', 'Stoke-on-Trent', 'Swansea', 'London', 'Belfast', 'Santo Domingo', 'Guatemala City',
        'Acapulco', 'Aguascalientes', 'Chihuahua', 'Mexico City', 'Ciudad Juarez', 'Nezahualcóyotl', 'Culiacán', 'Ecatepec de Morelos',
        'Guadalajara', 'Hermosillo', 'León', 'Mérida', 'Mexicali', 'Monterrey', 'Morelia', 'Naucalpan de Juárez', 'Puebla', 'Querétaro',
        'Saltillo', 'San Luis Potosí', 'Tijuana', 'Toluca', 'Zapopan', 'Mendoza', 'Santiago', 'Concepcion', 'Valparaiso', 'Bogotá', 'Cali',
        'Medellín', 'Barranquilla', 'Quito', 'Guayaquil', 'Caracas', 'Maracaibo', 'Maracay', 'Valencia', 'Barcelona', 'Ciudad Guayana',
        'Turmero', 'Lima', 'Brasília', 'Belém', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Recife', 'Rio de Janeiro', 'Salvador',
        'São Paulo', 'Campinas', 'Fortaleza', 'Goiânia', 'Manaus', 'São Luís', 'Guarulhos', 'Córdoba', 'Rosario', 'Barquisimeto',
        'Maturín', 'Buenos Aires', 'Gdańsk', 'Kraków', 'Lodz', 'Poznań', 'Warsaw', 'Wroclaw', 'Vienna', 'Cork', 'Dublin', 'Galway',
        'Bordeaux', 'Lille', 'Lyon', 'Marseille', 'Montpellier', 'Nantes', 'Paris', 'Rennes', 'Strasbourg', 'Toulouse', 'Berlin',
        'Bremen', 'Dortmund', 'Dresden', 'Dusseldorf', 'Essen', 'Frankfurt', 'Hamburg', 'Cologne', 'Leipzig', 'Munich', 'Stuttgart',
        'Bologna', 'Genoa', 'Milan', 'Naples', 'Palermo', 'Rome', 'Turin', 'Den Haag', 'Amsterdam', 'Rotterdam', 'Utrecht',
        'Barcelona', 'Bilbao', 'Las Palmas', 'Madrid', 'Malaga', 'Murcia', 'Palma', 'Seville', 'Valencia', 'Zaragoza', 'Geneva',
        'Lausanne', 'Zurich', 'Brest', 'Grodno', 'Gomel', 'Minsk', 'Riga', 'Bergen', 'Oslo', 'Gothenburg', 'Stockholm',
        'Dnipropetrovsk', 'Donetsk', 'Kharkiv', 'Kyiv', 'Lviv', 'Odesa', 'Zaporozhye', 'Athens', 'Thessaloniki', 'Bekasi', 'Depok',
        'Pekanbaru', 'Surabaya', 'Makassar', 'Bandung', 'Jakarta', 'Medan', 'Palembang', 'Semarang', 'Tangerang', 'Singapore', 'Perth',
        'Adelaide', 'Brisbane', 'Canberra', 'Darwin', 'Melbourne', 'Sydney', 'Kitakyushu', 'Saitama', 'Chiba', 'Fukuoka', 'Hamamatsu',
        'Hiroshima', 'Kawasaki', 'Kobe', 'Kumamoto', 'Nagoya', 'Niigata', 'Sagamihara', 'Sapporo', 'Sendai', 'Takamatsu', 'Tokyo',
        'Yokohama', 'Goyang', 'Yongin', 'Ansan', 'Bucheon', 'Busan', 'Changwon', 'Daegu', 'Gwangju', 'Incheon', 'Seongnam', 'Suwon',
        'Ulsan', 'Seoul', 'Kajang', 'Ipoh', 'Johor Bahru', 'Klang', 'Kuala Lumpur', 'Calocan', 'Makati', 'Pasig', 'Taguig',
        'Antipolo', 'Cagayan de Oro', 'Cebu City', 'Davao City', 'Manila', 'Quezon City', 'Zamboanga City', 'Bangkok', 'Hanoi',
        'Hai Phong', 'Can Tho', 'Da Nang', 'Ho Chi Minh City', 'Algiers', 'Accra', 'Kumasi', 'Benin City', 'Ibadan', 'Kaduna',
        'Kano', 'Lagos', 'Port Harcourt', 'Giza', 'Cairo', 'Alexandria', 'Mombasa', 'Nairobi', 'Durban', 'Johannesburg',
        'Port Elizabeth', 'Pretoria', 'Soweto', 'Cape Town', 'Medina', 'Dammam', 'Riyadh', 'Jeddah', 'Mecca', 'Sharjah',
        'Abu Dhabi', 'Dubai', 'Haifa', 'Tel Aviv', 'Jerusalem', 'Amman', 'Chelyabinsk', 'Khabarovsk', 'Krasnodar', 'Krasnoyarsk',
        'Samara', 'Voronezh', 'Yekaterinburg', 'Irkutsk', 'Kazan', 'Moscow', 'Nizhny Novgorod', 'Novosibirsk', 'Omsk', 'Perm',
        'Rostov-on-Don', 'Saint Petersburg', 'Ufa', 'Vladivostok', 'Volgograd', 'Karachi', 'Lahore', 'Multan', 'Rawalpindi',
        'Faisalabad', 'Muscat', 'Nagpur', 'Lucknow', 'Kanpur', 'Patna', 'Ranchi', 'Kolkata', 'Srinagar', 'Amritsar', 'Jaipur',
        'Ahmedabad', 'Rajkot', 'Surat', 'Bhopal', 'Indore', 'Thane', 'Mumbai', 'Pune', 'Hyderabad', 'Bangalore', 'Chennai',
        'Mersin', 'Adana', 'Ankara', 'Antalya', 'Bursa', 'Diyarbakır', 'Eskişehir', 'Gaziantep', 'Istanbul', 'Izmir', 'Kayseri',
        'Konya', 'Okinawa', 'Daejeon', 'Auckland', 'Albuquerque', 'Atlanta', 'Austin', 'Baltimore', 'Baton Rouge', 'Birmingham',
        'Boston', 'Charlotte', 'Chicago', 'Cincinnati', 'Cleveland', 'Colorado Springs', 'Columbus', 'Dallas-Ft. Worth', 'Denver',
        'Detroit', 'El Paso', 'Fresno', 'Greensboro', 'Harrisburg', 'Honolulu', 'Houston', 'Indianapolis', 'Jackson', 'Jacksonville',
        'Kansas City', 'Las Vegas', 'Long Beach', 'Los Angeles', 'Louisville', 'Memphis', 'Mesa', 'Miami', 'Milwaukee', 'Minneapolis',
        'Nashville', 'New Haven', 'New Orleans', 'New York', 'Norfolk', 'Oklahoma City', 'Omaha', 'Orlando', 'Philadelphia', 'Phoenix',
        'Pittsburgh', 'Portland', 'Providence', 'Raleigh', 'Richmond', 'Sacramento', 'St. Louis', 'Salt Lake City', 'San Antonio',
        'San Diego', 'San Francisco', 'San Jose', 'Seattle', 'Tallahassee', 'Tampa', 'Tucson', 'Virginia Beach', 'Washington',
        'Osaka', 'Kyoto', 'Delhi', 'United Arab Emirates', 'Algeria', 'Argentina', 'Australia', 'Austria', 'Bahrain', 'Belgium',
        'Belarus', 'Brazil', 'Canada', 'Chile', 'Colombia', 'Denmark', 'Dominican Republic', 'Ecuador', 'Egypt', 'Ireland', 'France',
        'Ghana', 'Germany', 'Greece', 'Guatemala', 'Indonesia', 'India', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya', 'Korea',
        'Kuwait', 'Lebanon', 'Latvia', 'Oman', 'Mexico', 'Malaysia', 'Nigeria', 'Netherlands', 'Norway', 'New Zealand', 'Peru',
        'Pakistan', 'Poland', 'Panama', 'Portugal', 'Qatar', 'Philippines', 'Puerto Rico', 'Russia', 'Saudi Arabia', 'South Africa',
        'Singapore', 'Spain', 'Sweden', 'Switzerland', 'Thailand', 'Turkey', 'United Kingdom', 'Ukraine', 'United States', 'Venezuela',
        'Vietnam', 'Petaling', 'Hulu Langat', 'Ahsa', 'Okayama'],
      selected: null,
      icons: {
        mdiTrendingUp
      },
      hashtags1: [],
      hashtags2: [],
      hashtags: [],
      hashtag: '',
      loading: false
    };
  },
  computed: {
    ...mapState('post', ['post'])
  },
  watch: {
    selected: function (val) {
      this.getHashtags();
    }
  },
  methods: {
    ...mapMutations('post', ['ADD_HASHTAG']),
    getHashtags: function () {
      this.loading = true;
      axios.get(`api/v1/socialmedia/twitter/get_trends?location=${this.selected}`)
          .then(
              response => {
                this.hashtags = response.data.trends;
                var half_length = Math.ceil(this.hashtags.length / 2);
                this.hashtags1 = this.hashtags.splice(0, half_length);
                this.hashtags2 = this.hashtags.splice(half_length, this.hashtags.length);
              }
          )
          .finally(
              () => this.loading = false
          );

    },
    addToPost: function (hashtag) {
      // let currentPost = this.$store.getters.getNewPost;
      // // this.$store.dispatch('setCaption', `${currentPost.caption}\n${hashtag}`);
      // console.log(currentPost.caption);
      // let newPost = {
      //   name: currentPost.name,
      //   caption: `${currentPost.caption}\n${hashtag}`,
      //   team: currentPost.team
      // }
      // console.log(newPost.caption);
      // this.$store.dispatch('setPost', newPost);
      this.ADD_HASHTAG(hashtag)
    }
  }
};
</script>

<style scoped>

.text {
  max-width: 720px;
  margin: auto;
}

.hashtag-list {
  background: rgb(240, 236, 236);
  border-radius: 10px;
  margin-top: 20px;
}

.hashtags-list-preview {
  background: rgb(240, 236, 236);
  border-radius: 10px;
  margin-top: 20px;
}

.scroll-area {
  position: relative;
  margin: auto;
  max-width: 720px;
  height: 400px;
}


</style>
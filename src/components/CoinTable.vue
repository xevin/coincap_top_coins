<template>
  <vue-custom-scrollbar class="coin-table__wrap-scroll">
    <table class="coin-table">
      <thead>
        <tr>
          <th class="coin-table__th">Name</th>
          <th class="coin-table__th">Price $</th>
          <th class="coin-table__th">Market capt.</th>
          <th class="coin-table__th">Vol. 24Hr</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="coin in coinList"
          :key="coin.id"
          :ref="coin.id"
        >
          <td>{{ coin.name }}</td>
          <td>${{ parseFloat(coin.priceUsd).toFixed(2) }}</td>
          <td>${{ parseFloat(coin.marketCapUsd/BILLION).toFixed(2) }}b</td>
          <td>${{ parseFloat(coin.volumeUsd24Hr/BILLION).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </vue-custom-scrollbar>
</template>


<script>
import vueCustomScrollbar from 'vue-custom-scrollbar';

const BILLION = 1000000000;
const COIN_LIMIT = 15;

export default {
  components: {
    vueCustomScrollbar,
  },
  data() {
    return {
      coinList: [],
      BILLION,
    };
  },
  mounted() {
    fetch('https://api.coincap.io/v2/assets')
      .then(data => data.json())
      .then((data) => {
        const coins = data.data.sort(
          (a, b) => parseFloat(a.marketCapUsd) < parseFloat(b.marketCapUsd) || -1,
        );
        this.$set(this, 'coinList', coins.slice(0, COIN_LIMIT));
        const coinIds = this.coinList.map(coin => coin.id);

        let tradeWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinIds}`);

        tradeWs.onmessage = (msg) => {
          let data = JSON.parse(msg.data);
          let keys = Object.keys(data);

          this.coinList.forEach((el, idx) => {
            if (keys.indexOf(el.id) >= 0) {
              // this.$refs[el.id][0].classList.add('update');
              el.priceUsd = data[el.id];
              this.$set(this.coinList, idx, el);
            }
          });
        }
      });
  },
};
</script>

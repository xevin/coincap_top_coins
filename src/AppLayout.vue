<template>
  <div class="app">
    <header>
      <div class="container">
        <div class="title">Top coins</div>
      </div>
    </header>

    <div class="content">
      <div class="container">
        <CoinTable />
      </div>
    </div>
  </div>
</template>

<script>
import CoinTable from './components/CoinTable';

export default {
  components: {
    CoinTable,
  },
};
</script>

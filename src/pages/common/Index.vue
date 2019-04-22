<template>
  <div>
    <header-bar></header-bar>
    <router-view class="content-view"></router-view>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from './Header.vue'
import FooterBar from './Footer.vue'

export default {
  components: {
    HeaderBar,
    FooterBar
  }
}
</script>

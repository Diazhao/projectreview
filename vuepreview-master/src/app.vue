<template>
  <div class="example">
      <sideleft></sideleft>
      <sidemiddle></sidemiddle>
      <sideright></sideright>
  </div>
</template>

<script>
import sideright from './components/side-right.vue';
import sideleft from './components/side-left.vue';
import sidemiddle from './components/side-middle.vue';

export default {
    components: {
        sideright,
        sideleft,
        sidemiddle
    },
    data () {
        return {
        msg: 'Hello world!'
        }
    }
}
</script>

<style>
    .example {
        
    }
</style>
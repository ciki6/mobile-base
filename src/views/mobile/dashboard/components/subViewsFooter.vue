<template>
  <div class="placeholder">
    <div class="footer">
      <div
        v-for="item in (props.btnsOptions as any[])"
        :key="item.text"
        :class="['footer-btn', item.type || 'primary']"
        @click="item.handler"
      >
        <img v-if="item.icon" class="btn-icon" :src="item.icon" />
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  btnsOptions: { type: Array, default: [] },
});

onMounted(() => {});
</script>
<style lang="less" scoped>
.placeholder {
  height: 3rem;
}
.footer {
  width: 100%;
  height: 3rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  &-btn {
    color: #fff;
    padding: 0.2rem 1.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    .btn-icon {
      width: 1rem;
      margin-right: 0.5rem;
    }
  }
  .gray {
    background-color: #828282;
  }
  .primary {
    background-color: #1989fa;
  }
  &-btn + .footer-btn {
    margin-left: 2rem;
  }
}
</style>

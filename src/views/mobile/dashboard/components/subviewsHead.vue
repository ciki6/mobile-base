<template>
  <div class="subview-head">
    <van-icon name="arrow-left" color="#fff" @click="router.go(-1)" />
    <div class="head-middle">
      <img class="head-title-icon" :src="props.headTitleIcon" alt="" />
      <div class="title">{{ title }}</div>
    </div>
    <van-icon class="more-icon" name="ellipsis" color="#fff" />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import titleIcon from "@/assets/icon/icon_计划.png";
const route = useRoute();
const router = useRouter();
const props = defineProps({
  headTitleIcon: {
    type: String,
    default: titleIcon,
  },
});

const title = computed(() => route.meta.title);

onMounted(() => {});
</script>
<style lang="less" scoped>
.subview-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(4, 116, 237);
  padding: 0.3rem 0.2rem;
  .head-middle {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 1rem;
    .head-title-icon {
      position: absolute;
      left: -0.8rem;
      width: 1.2rem;
    }
    .title {
      font-size: 1.2rem;
      color: #fff;
      font-weight: bold;
      font-family: MicroSoft YaHei;
    }
  }
  .more-icon {
    transform: rotate(90deg);
  }
}
</style>

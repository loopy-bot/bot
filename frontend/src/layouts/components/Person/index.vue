<template>
  <a-dropdown>
    <a-avatar trigger-type="mask" :size="30">
      <img
        v-if="personInfo.avatar"
        alt="avatar" :src="personInfo.avatar"
      />
      <IconUser v-else />
    </a-avatar>
    <template #content>
      <router-link to="/">
        <a-doption :key="home">主页</a-doption>
      </router-link>
      <a-doption :key="loginout" @click="loginOut">注销</a-doption>
    </template>
  </a-dropdown>
</template>

<script setup>
import { useUserStore } from '@/store/user';
import { computed } from 'vue';
import { Notification } from '@arco-design/web-vue';

const loginStore = useUserStore();
const router = useRouter();

const personInfo = computed(() => loginStore.person);

const loginOut = async () => {
  await loginStore.logout();
  Notification.success('退出登录成功');
  setTimeout(() => {
    router.push(`/login`);
  }, 2000);
};

</script>

<style scoped lang="scss"></style>

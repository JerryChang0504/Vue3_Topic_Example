`
<template>
  <div :class="context.theme">
    <h1>🌐 多語系與主題切換</h1>
    <ThemeToggler />
    <LanguageSwitcher />
    <ContextUser />
  </div>
</template>

<script setup>
import { ref, provide, reactive } from 'vue'
import { createAppContext } from '../provide/context'
import { AppContextKey } from '../provide/context-key'

import ThemeToggler from './ThemeToggler.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ContextUser from './ContextUser.vue'

const context = createAppContext()
provide(AppContextKey, context)
</script>

<style scoped>
.light {
  background-color: #fff;
  color: #000;
}
.dark {
  background-color: #222;
  color: #fff;
}
</style>
`

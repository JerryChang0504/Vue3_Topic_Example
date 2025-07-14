<template>
  <ChildEmit v-on:child-event="handleClick" />
  <br />
  <ChildEmit v-on:ChildEvent="handleClick" />
  <br />
  <ChildEmit @child-event="handleClick" />
  <br />
  <ChildEmit @ChildEvent="handleClick" />

  <MsgEmit @send="handleSend" @focus="handleFocus" />
</template>

<script setup>
import ChildEmit from './ChildEmit.vue'
import MsgEmit from './MsgEmit.vue'

const handleClick = (e) => {
  console.log('點擊了 EmitButton', e)
}

const handleSend = (payload) => {
  console.log(payload)
}

const handleFocus = () => {
  console.log('focus')
}
</script>

<style scoped></style>

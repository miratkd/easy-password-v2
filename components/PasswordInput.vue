<template>
  <div class="password-input-container">
    <input type="text" :value="password" data-test="password-input" v-on:change="handleChange"
      placeholder="PTx1f5DaFX" class="password-input-input">
    <span v-on:click="copyToClipboard()" class="material-icons password-input-icon">content_copy</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  callNotification: {
    type: Function,
    required: true
  },
  password: String,
  setPassword: {
    type: Function,
    required: true
  },
})
function copyToClipboard(): void {
  if (props.password) navigator.clipboard.writeText(props.password)
  props.callNotification('Texto copiado.')
}
function handleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  props.setPassword(input.value)
}

</script>

<style scoped>
.password-input-container {
  background-color: #24232C;
  padding: 2vh 2.5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2vh;
}

.password-input-input {
  width: 90%;
  background-color: transparent;
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 700;
  font-size: 2.2em;
  color: #E6E5EA;
  border: none;
}

.password-input-input:focus {
  outline: none;
}

.password-input-icon {
  font-size: 3em;
  color: #A4FFAF;
  cursor: pointer;
}

@media screen and (max-width: 800px) {
  .password-input-icon {
    display: none;
  }
}
</style>
<template>
  <div class="config-container">
    <div class="config-title-container">
      <p>Quantidade de caracteres</p>
      <p class="config-title-number">{{ charNumber }}</p>
    </div>
    <input data-test="slide-input" class="config-range-input" v-model="charNumber" min="5" max="15" type="range">
    <div class="config-check-container" data-test="upper-check" v-on:click="updateUpperCase(!upperCase)">
      <span v-if="upperCase" class="material-icons config-check-true">check_box</span>
      <span v-else class="material-icons config-check-false">check_box_outline_blank</span>
      <p>Incluir letra maiúsculas.</p>
    </div>
    <div class="config-check-container" data-test="lower-check" v-on:click="updateLowerCase(!lowerCase)">
      <span v-if="lowerCase" class="material-icons config-check-true">check_box</span>
      <span v-else class="material-icons config-check-false">check_box_outline_blank</span>
      <p>Incluir letra minúsculas.</p>
    </div>
    <div class="config-check-container" data-test="numbers-check" v-on:click="updateNumbers(!numbers)">
      <span v-if="numbers" class="material-icons config-check-true">check_box</span>
      <span v-else class="material-icons config-check-false">check_box_outline_blank</span>
      <p>Incluir numeros.</p>
    </div>
    <div class="config-check-container" data-test="symbols-check" v-on:click="updateSymbols(!symbols)">
      <span v-if="symbols" class="material-icons config-check-true">check_box</span>
      <span v-else class="material-icons config-check-false">check_box_outline_blank</span>
      <p>Incluir simbolos.</p>
    </div>
    <div class="config-level-container">
      <p class="config-level-label">Força</p>
      <div class="config-level-bars-container">
        <p data-test="level-name" class="config-level-name">{{ getLevelName() }}</p>
        <div class="config-level-bar" :class="getActiveBar(1)"></div>
        <div class="config-level-bar" :class="getActiveBar(2)"></div>
        <div class="config-level-bar" :class="getActiveBar(3)"></div>
        <div class="config-level-bar" :class="getActiveBar(4)"></div>
      </div>
    </div>
    <GenerateButton :action="generatePassword" />
    <SaveButton :action="savePassword" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  getPasswordCreated: {
    required: true,
    type: Function
  },
  savePassword: {
    required: true,
    type: Function
  },
})
const charNumber = ref(10)
const upperCase = ref(true)
const lowerCase = ref(true)
const numbers = ref(true)
const symbols = ref(false)

const passwordLevel = computed(() => {
  let level = charNumber.value / 7
  if (upperCase.value) level += 0.5
  if (lowerCase.value) level += 0.5
  if (numbers.value) level += 0.5
  if (symbols.value) level += 0.5
  return Math.round(level)
})

function updateUpperCase(value: boolean) {
  if (lowerCase.value || numbers.value || symbols.value) upperCase.value = value
}

function updateLowerCase(value: boolean) {
  if (upperCase.value || numbers.value || symbols.value) lowerCase.value = value
}

function updateNumbers(value: boolean) {
  if (lowerCase.value || upperCase.value || symbols.value) numbers.value = value
}

function updateSymbols(value: boolean) {
  if (upperCase.value || numbers.value || lowerCase.value) symbols.value = value
}

function getLevelName() {
  if (passwordLevel.value == 1) return 'Muito fraca!'
  else if (passwordLevel.value == 2) return 'Fraca.'
  else if (passwordLevel.value == 3) return 'Media.'
  else if (passwordLevel.value >= 4) return 'Forte.'
}

function getActiveBar(level: number) {
  let className
  if (passwordLevel.value == 1) { className = 'config-level-bar-realy-weak' }
  else if (passwordLevel.value == 2) { className = 'config-level-bar-weak' }
  else if (passwordLevel.value == 3) { className = 'config-level-bar-medium' }
  else if (passwordLevel.value >= 4) { className = 'config-level-bar-strong' }
  if (level <= passwordLevel.value) return className
}

function generatePassword() {
  let result = '';
  let characters = ''
  if (upperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lowerCase) characters += 'abcdefghijklmnopqrstuvwxyz'
  if (numbers) characters += '0123456789'
  if (symbols) characters += '!@#$%^&*()'
  let counter = 0;
  while (counter < charNumber.value) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  props.getPasswordCreated(result)
}

</script>

<style scoped>
.config-container {
  background-color: #24232C;
  padding: 2vh 2.5vw;
  margin-top: 2vh;
}

.config-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #E6E5EA;
  font-weight: 700;
  font-size: 1.3em;
}

.config-title-number {
  font-size: 1.7em;
  color: #A4FFAF;
}

.config-range-input {
  width: 100%;
  margin-top: 2vh;
  -webkit-appearance: none;
  appearance: none;
  background: #18171F;
  outline: none;
  height: 1em;
  border-radius: 8px;
}

.config-range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 2em;
  height: 2em;
  background: #A4FFAF;
  cursor: grab;
  border-radius: 50%;
}

.config-range-input::-moz-range-thumb {
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background: #A4FFAF;
  cursor: grab;
}

.config-check-container {
  display: flex;
  align-items: center;
  gap: 2vw;
  margin-top: 2vh;
  cursor: pointer;
  font-size: 1.2em;
  width: fit-content;
}

.config-check-true {
  font-size: 1.5em;
  color: #A4FFAF;
}

.config-check-false {
  font-size: 1.5em;
}

.config-level-container {
  background: #18171F;
  padding: 1.5vh 4vw;
  margin-top: 3vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.config-level-label {
  color: #817D92;
  font-weight: 700;
  font-size: 1.35em;
  text-transform: uppercase;
}

.config-level-bars-container {
  display: flex;
  align-items: center;
  gap: 1vw;

}

.config-level-bar {
  width: 1em;
  outline: 2px solid white;
  height: 3vh;
}

.config-level-bar-strong {
  background-color: #A4FFAF;
}

.config-level-bar-realy-weak {
  background-color: #F64A4A;
}

.config-level-bar-weak {
  background-color: #FB7C58;
}

.config-level-bar-medium {
  background-color: #F8CD65;
}

.config-level-name {
  font-weight: 700;
  font-size: 1.85em;
  text-transform: uppercase;
  margin-right: 1vw;
}
</style>
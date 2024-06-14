<template>
  <basic-modal
    class="share-modal"
    :is-shown="isShown"
    :is-close-by-click-outside="isCloseByClickOutside"
    :title="$t('share-modal.title')"
    :subtitle="$t('share-modal.subtitle')"
    @update:is-shown="emit('update:is-shown', $event)"
  >
    <template #default="{ modal }">
      <div id="share-modal" class="modal">
        <div class="modal-content">
            <button id="tweet-button">Tweet</button>
            <button id="cast-button">Cast</button>
            <p>Connect with us:</p>
            <a href="https://twitter.com/NounspaceTom" target="_blank">@NounspaceTom</a>
            <a href="https://twitter.com/nounspace" target="_blank">@nounspace</a>
          </div>
      </div>
    </template>
  </basic-modal>
</template>

<script lang="ts" setup>
import { type BigNumber } from '@/types'
import BasicModal from '../BasicModal.vue'

const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
}>()

withDefaults(
  defineProps<{
    isShown: boolean
    poolId: number
    minStake: BigNumber
    isCloseByClickOutside?: boolean
  }>(),
  {
    isCloseByClickOutside: true,
  },
)
</script>

<style lang="scss" scoped>
.share-modal__form {
  margin-top: toRem(24);

  @include respond-to(medium) {
    margin-top: toRem(28);
  }
}
</style>

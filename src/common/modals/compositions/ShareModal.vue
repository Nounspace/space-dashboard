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
            <app-button
              class="cast__btn"
              :text="Cast"
              :disabled="isSubmitting || !isFieldsValid"
              :is-loading="isInitializing"
              @click="onSubmit"
            />
            <app-button
              class="tweet__btn"
              :text="Tweet"
              :disabled="isSubmitting || !isFieldsValid"
              :is-loading="isInitializing"
              @click="onSubmit"
            />
            <div>
              <p>Connect with us:</p>
              <a href="https://twitter.com/NounspaceTom" target="_blank">@NounspaceTom </a>
              <a href="https://twitter.com/nounspace" target="_blank">@nounspace</a>
            </div>
          </div>
      </div>
    </template>
  </basic-modal>
</template>

<script lang="ts" setup>
import { type BigNumber } from '@/types'
import BasicModal from '../BasicModal.vue'
import { AppButton } from '@/common'

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

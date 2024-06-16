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
            <div class="share-modal__buttons-wrp">
              <div>
                <img src="../../../assets/farcaster.png" class="share-modal__logo">
                <a :href="`https://warpcast.com/~/compose?text=I%20just%20staked%20${availableAmount}%20stETH%20in%20the%20Nounspace%20Fair%20Launch%21%20Total%20staked%3A%20%24%7BtotalStaked%7D%20stETH.%20Connect%20with%20@NounspaceTom%20and%20@nounspace%21&embeds[]=https://space.nounspace.com/`">
                <app-button
                  class="share-modal__buttons-wrp"
                  :text="$t('home-page.public-pool-view.cast-btn')"
                />
                </a>
                <div class="share-modal__connect-wrp">
                  <a href="https://warpcast.com/nounspacetom" target="_blank">@NounspaceTom </a>
                  <a href="https://warpcast.com/~/channel/nounspace" target="_blank">/nounspace</a>
                </div>
              </div>

              <div>
                <img src="../../../assets/x.webp" class="share-modal__logo">
                <a :href="`https://twitter.com/intent/tweet?text=I%20just%20staked%20${availableAmount}%20stETH%20in%20the%20Nounspace%20Fair%20Launch%21%20Total%20staked%3A%20%24%7BtotalStaked%7D%20stETH.%20Connect%20with%20@NounspaceTom%20and%20@nounspace%21`">
                  <app-button
                    class="share-modal__buttons-wrp"
                    :text="$t('home-page.public-pool-view.tweet-btn')"
                  /> 
                </a>
                <div class="share-modal__connect-wrp">
                  <a href="https://twitter.com/NounspaceTom" target="_blank">@NounspaceTom </a>
                  <a href="https://twitter.com/nounspace" target="_blank">@nounspace</a>
                </div>
              </div>
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
    availableAmount: BigNumber
    isCloseByClickOutside?: boolean
  }>(),
  {
    isCloseByClickOutside: true,
  },
)
</script>

<style lang="scss" scoped>
.share-modal__logo{
  width: 80px;
  padding: toRem(16);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.25rem;
  margin: toRem(16) auto;
}

.share-modal__connect-wrp {
  margin-top: toRem(20);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: toRem(32);

  @include respond-to(medium) {
    margin-top: toRem(16);
  }
}

.share-modal__buttons-wrp {
  margin-top: toRem(20);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: toRem(36);
  margin:auto;

  @include respond-to(medium) {
    margin-top: toRem(16);
  }
}

.share-modal__button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: toRem(16);

  @include respond-to(medium) {
    flex-direction: column;
    gap: toRem(8);
  }
}

.share-modal__form {
  margin-top: toRem(24);

  @include respond-to(medium) {
    margin-top: toRem(28);
  }
}
</style>

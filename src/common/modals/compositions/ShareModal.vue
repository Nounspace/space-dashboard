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
                <a target="_blank" :href="`https://warpcast.com/~/compose?text=I%20just%20deposited%20stETH%20and%20started%20earning%20%24SPACE%20in%20the%20%2Fnounspace%20fair%20launch!%20%0A%0ATotal%20staked%3A%20${formatEther(totalDeposited)}%20stETH.%20%0A%0AJoin%20us%20in%20building%20the%20community-owned%20future%20of%20social%20on%20space.nounspace.com%0A%0AConnect%20with%20@NounspaceTom%20and%20join%20/nounspace%21&embeds[]=https://space.nounspace.com/`">
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

              <div style="border-left:1px solid #000;height:100px"></div>

              <div>
                <img src="../../../assets/x.webp" class="share-modal__logo">
                <a target="_blank" :href="`https://twitter.com/intent/tweet?text=I%20just%20deposited%20stETH%20and%20started%20earning%20%24SPACE%20in%20the%20%2Fnounspace%20fair%20launch!%20%0A%0ATotal%20staked%3A%20${formatEther(totalDeposited)}%20stETH.%20%0A%0AJoin%20us%20in%20building%20the%20community-owned%20future%20of%20social%20on%20space.nounspace.com%0A%0AConnect%20with%20@NounspaceTom%20and%20@nounspace%21&embeds[]=https://space.nounspace.com/`">
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
import BasicModal from '../BasicModal.vue'
import { AppButton } from '@/common'
import { formatEther, BigNumber } from '@/utils'
import { ErrorHandler } from '@/helpers'
import { onMounted } from 'vue'
import type { Erc1967ProxyType,
} from '@/types'

const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
}>()

const props = withDefaults(
  defineProps<{
    isShown: boolean
    availableAmount: BigNumber
    poolData: Erc1967ProxyType.PoolData | null
    isCloseByClickOutside?: boolean
  }>(),
  {
    isCloseByClickOutside: true,
  },
)

let totalDeposited = BigNumber.from(0)

async function fetchTotal() {
  if (!props.poolData) throw new Error('poolData unavailable')

  try {
       totalDeposited = await props.poolData.totalDeposited
  } catch (error) {
    ErrorHandler.process(error)
  }
}

onMounted(() => {
  fetchTotal()
})
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

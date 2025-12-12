<template>
  <basic-modal
    class="deposit-modal"
    :is-shown="isShown"
    :is-close-by-click-outside="isCloseByClickOutside"
    title="The $SPACE Fair Launch has concluded"
    @update:is-shown="emit('update:is-shown', $event)"
  >
    <template #default="{ modal } ">
      <div class="deposit-modal__content">
        <p class="deposit-modal__lead">stETH deposits are paused.</p>
        <p>Withdrawals will remain open forever.</p>
        <p>
          If you have unclaimed $SPACE rewards, you will be eligible to claim them via the upcoming airdrop of the new
          $SPACE ClankerV4 token.
        </p>
        <p class="deposit-modal__proposal">
          Read this
          <a
            href="https://app.charmverse.io/nounspace/forum"
            target="_blank"
            rel="noopener noreferrer"
          >proposal</a>
          for more information.
        </p>
      </div>
    </template>
  </basic-modal>
</template>

<script lang="ts" setup>
import { type BigNumber } from '@/types'
import BasicModal from '../BasicModal.vue'

const emit = defineEmits<{
  (e: 'update:is-shown', v: boolean): void
  (e: 'share', v: boolean): void
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
.deposit-modal__content {
  margin-top: toRem(24);
  display: flex;
  flex-direction: column;
  gap: toRem(12);
  line-height: 1.5;
  text-align: center;

  @include respond-to(medium) {
    margin-top: toRem(28);
  }
}

.deposit-modal__lead {
  font-weight: 600;
}

.deposit-modal__proposal a {
  text-decoration: underline;
}
</style>

<template>
  <div class="zero-pool-description">
    <div class="zero-pool-description__content">
      <p class="zero-pool-description__title">The $SPACE Fair Launch has concluded</p>
      <p class="zero-pool-description__lead">stETH deposits are paused.</p>
      <p>Withdrawals will remain open forever.</p>
      <p>
        If you have unclaimed $SPACE rewards, you will be eligible to claim them via the upcoming airdrop of the new
        $SPACE ClankerV4 token.
      </p>
      <p>
        Read this
        <a
          class="zero-pool-description__link"
          href="https://app.charmverse.io/nounspace/forum"
          target="_blank"
          rel="noopener noreferrer"
        >proposal</a>
        for more information.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.zero-pool-description__content {
  margin-top: toRem(8);
  display: flex;
  flex-direction: column;
  gap: toRem(12);
  text-align: center;
  line-height: 1.5;
}

.zero-pool-description__title {
  font-weight: 700;
}

.zero-pool-description__lead {
  font-weight: 600;
}

.zero-pool-description__link {
  text-decoration: underline;
}

.zero-pool-description__details {
  margin: toRem(16) 0 0 toRem(16);
}

.zero-pool-description .zero-pool-description__details-link {
  display: inline-block;
  overflow: unset;

  @include body-3-regular;
}
</style>

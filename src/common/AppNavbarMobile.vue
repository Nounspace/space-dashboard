<template>
  <div class="app-navbar-mobile">
    <div class="app-navbar-mobile__logo-icon-wrp">
      <app-logo />
      <a
        href="https://basescan.org/address/0x48C6740BcF807d6C47C864FaEEA15Ed4dA3910Ab"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          class="app-navbar-mobile__base-icon"
          alt="View SPACE on basescan"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEGElEQVR4AbWWA5AcXRSFX2ytbe/+DNccx6vYtm3bTjm2jUGyVg/CRmzb6dwXdO12LaYHt+oMu/s797zbQMYWy7JVMzIyYkaPHjstOTlln1SmKBCJpDfFYukNqUxe2D459cCwESOmnz17Nh62rY4sVXfu3LGZOHHiJIlUdsfG1v577Tr12PLUyMaOFUuk9ydPnjqNJEl7k8HQRZWVK1f2a9Y8/GmduvU5gLHC+zRr3uL50uXLB+P0BMFfvnzZqHvPXkegY8Fgvho2smW79ehx8vXr17bGRu4qkyl05oL5kkikV+7fv+9RYecyOQe3uKRyBTZhV+aa9+7d95CloXx179HrRKkzsWLF6t4wwd/NBSQmibW7d+9OP3DgSFuscRMmbIY5KDETK1asGFQCjgckPDzysSU63LNnT2f+9SMqKuZ98W2aNw9//ubNGwduo6lTp46rW6+BRSI+efJkMuJVTEzca/4pOmHSpKnc2sNwMEIgdvaObOs2bTPaJaccxFK0bFXQoKGN0QawRCLJPWBXQ3B5Dbe1cxC09smpaSdh50rFYq4sb9kqV4gB3ARUMBo9evQkoTF36dJ1Ix+SnJy6V4iB6OjYV2CgAUpLS99dTtTf/fwDPvv5B3729PT+CmtnEQNOzq7fVq9e3QnhgqteXmlwX1//L0eOHGkFLp2x4CLlDXfBU+YawMs9d+78idyfIrGk1AFMSEy6iXi1YMGigeYYcHRy+Y6n/8/8qAiyK0qCe3qpBhJENxCvli1b1s9UAz4+fp8XLFo0/A9cSVxvqSq6rkVSqVxnbQPDho2gt27dKvvzPeMyFaYirj9TEuRF1LZd8hFrG4Cunf58Vhbd8FIR1E2InwUTO9CAQYPmW9kAVxcIOgDAzC84SEtORAcOH5bBZdgiBmDC2UKtNrE0uJKgoyDyhxwcS8tE43jqRsfEPjfXwPLly6fjO2op8VeCqIcC/GNxOHy/m5+fXw3hGjhw8HIhBrp3774GGVFKLekGsMMYyJdaS07nNtTr9b4BgcEfStzXE0UM4tWuXbu6QNRnzp8/H1oe2GBgq8P6DgTQ89Lg0P3Ls3rGkXeRWTA8MCjko5u757d//v3//dix45aUFmd54N1wZwVwK1UReYkH5WtUWY9ljiAvUH0koHYbDNXVBNlLWXSdqAAM3V+/cPw4WQOZWziN8zqqsVpLLeFNdzmibmYS11xNhp7SauvAQeJVWnoexHzZOCh3zt/O0FJhRsM2wimiKSRDNFo6WU1Qs2FqVXCgN4KgHJzKO1fIeCIhhc9RiHYCOH8rHMrpA+w/L/POnVrI1FLnUu5woGWg1wLA7yC1DcpLlB+yVGWTZH2NlkmBjtbCwTNg6h/BHHwF2FeY/qdwtcuB/zapdXSnzEt3bJCR9QPwKOxl9MLyXAAAAABJRU5ErkJggg=="
        />
      </a>
    </div>

    <music-player />

    <button
      class="app-navbar-mobile__burger-btn"
      @click="isExtShown = !isExtShown"
    >
      <transition name="fade" mode="out-in">
        <app-icon
          class="app-navbar-mobile__burger-icon"
          :key="String(isExtShown)"
          :name="!isExtShown ? $icons.menuAlt1 : $icons.x"
        />
      </transition>
    </button>

    <transition name="fade" appear>
      <div v-if="isExtShown" class="app-navbar-mobile__ext-wrp">
        <transition name="slide" appear>
          <div class="app-navbar-mobile__ext">
            <transition name="fade" mode="out-in">
              <connect-wallet-button
                v-if="!web3ProvidersStore.isConnected"
                class="app-navbar-mobile__connect-wallet-btn"
                color="secondary"
              />
              <div v-else class="app-navbar-mobile__wallet-info-wrp">
                <network-switch />
                <wallet-balances />
                <wallet-dashboard />
              </div>
            </transition>
          </div>
        </transition>
        <button
          class="app-navbar-mobile__ext-backdrop"
          tabindex="-1"
          @click="closeExt"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import MusicPlayer from './MusicPlayer.vue'
import { useWeb3ProvidersStore } from '@/store'
import { ref } from 'vue'
import AppIcon from './AppIcon.vue'
import AppLogo from './AppLogo.vue'
import ConnectWalletButton from './ConnectWalletButton.vue'
// import NetworkSwitch from './NetworkSwitch.vue'
// import WalletBalances from './WalletBalances.vue'
import WalletDashboard from './WalletDashboard.vue'

const web3ProvidersStore = useWeb3ProvidersStore()

const isExtShown = ref(false)

const closeExt = () => {
  isExtShown.value = false
}
</script>

<style scoped lang="scss">
$background: #ffffff;
$z-index: 1000;

.app-navbar-mobile {
  position: fixed;
  z-index: $z-index;
  top: 0;
  height: var(--app-navbar-height);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: toRem(24);
  padding: 0 2rem 0 2rem;
  background: $background;
  border-bottom: toRem(1) solid #CBD5E0;
}

.app-navbar-mobile__logo-icon-wrp {
  display: flex;
  align-items: center;
  gap: toRem(8);
}

.app-navbar-mobile__base-icon {
  width: toRem(20);
  height: toRem(20);
  cursor: pointer;
}

.app-navbar-mobile__burger-icon {
  height: toRem(24);
  width: toRem(24);
  color: var(--text-secondary-dark);
  transition: var(--transition-duration-fast) var(--transition-timing-default);

  .app-navbar-mobile__burger-btn:not([disabled]):hover &,
  .app-navbar-mobile__burger-btn:not([disabled]):focus &,
  .app-navbar-mobile__burger-btn:not([disabled]):active & {
    color: var(--primary-main);
  }
}

.app-navbar-mobile__ext-wrp {
  position: fixed;
  overflow: hidden;
  inset: var(--app-navbar-height) 0 0;
  background: var(--backdrop-modal);
  width: 100%;
}

.app-navbar-mobile__ext {
  display: flex;
  flex-direction: column;
  background: $background;
  padding: toRem(28) var(--app-padding-right) toRem(32) var(--app-padding-left);
}

.app-navbar-mobile__nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: toRem(20);
}

.app-navbar-mobile .app-navbar-mobile__link {
  &.router-link-active {
    @include respond-to(medium) {
      font-family: var(--app-font-family);
      font-size: toRem(18);
      font-weight: 600;
      line-height: toRem(26);
      letter-spacing: 0;
    }
  }

  @include respond-to(medium) {
    font-family: var(--app-font-family);
    font-size: toRem(18);
    font-weight: 400;
    line-height: toRem(26);
    letter-spacing: 0;
  }
}

.app-navbar-mobile .app-navbar-mobile__connect-wallet-btn {
  margin: toRem(76) auto 0;
  min-width: toRem(202);
}

.app-navbar-mobile__wallet-info-wrp {
  display: flex;
  align-items: center;
  gap: toRem(20);
  margin: toRem(76) auto 0;

  @include respond-to(medium) {
    flex-direction: column;
  }
}

.app-navbar-mobile__ext-backdrop {
  $z-index: -1;

  position: absolute;
  cursor: default;
  z-index: $z-index;
  inset: 0;
  width: 100%;
}

.slide-enter-active {
  animation: slide-in var(--transition-duration-fast)
    var(--transition-timing-default);
}

.slide-leave-active {
  animation: slide-in var(--transition-duration-fast)
    var(--transition-timing-default) reverse;
}

@keyframes slide-in {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}
</style>

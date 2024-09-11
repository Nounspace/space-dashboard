<template>
  <div class="app-view">
    <div class="text-bar">
      <p class="text-bar-title">Team</p>
      <div class="text-bar__subtitle-wrp">
        <p class="text-bar__subtitle">20% of $SPACE emissions are allocated to the Based Space Foundation</p>
      </div>
      <div class="text-bar__description-wrp">
        <p class="text-bar-description">The Based Spaced Foundation is an independent organization dedicated to
          supporting the open source development, growth, and decentralization of nounspace, and has no ownership over nounspace's brand or code. The Foundation is responsible for the development of nounspace so far,
          and intends to continue developing in collaboration with the community. However, the
          Based Space Foundation intentionally designed nounspace to be independent and empowered to evolve in any direction the community chooses, with or without the Foundation.
        </p>
      </div>
    </div>
    <div class="text-bar">
      <p class="text-bar-title">Meet the Cadets</p>
      <div class="cadet-list">
        <a href="https://www.nounspace.com/s/nounspacetom" target="_blank" class="cadet-link">
          <img src="../../../assets/cadets/Tom.gif" alt="Tom" class="cadet-img" />
          <span class="cadet">Tom</span>
          <span class="cadet-title">Former CEO</span>
        </a>
        <a href="https://www.nounspace.com/s/willywonka.eth" target="_blank" class="cadet-link">
          <img src="../../../assets/cadets/Willy.gif" alt="Willy" class="cadet-img" />
          <span class="cadet">Willy</span>
          <span class="cadet-title">Product</span>
        </a>
        <a href="https://www.nounspace.com/s/realitycrafter.eth" target="_blank" class="cadet-link">
          <img src="../../../assets/cadets/Jesse.gif" alt="Jesse" class="cadet-img" />
          <span class="cadet">Jesse</span>
          <span class="cadet-title">Engineering</span>
        </a>
        <a href="https://www.nounspace.com/s/skateboard" target="_blank" class="cadet-link">
          <img src="../../../assets/cadets/Vlad.gif" alt="Vlad" class="cadet-img" />
          <span class="cadet">Vlad</span>
          <span class="cadet-title">Engineering</span>
        </a>
        <a href="https://www.nounspace.com/s/ryannorton" target="_blank" class="cadet-link">
          <img src="../../../assets/cadets/Ryan3.gif" alt="Ryan" class="cadet-img" />
          <span class="cadet">Ryan</span>
          <span class="cadet-title">Engineering</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-bottom: 1rem;
}

.container-subtitle {
  font-size: 1rem; /* 16px */
  font-weight: 700;
  line-height: 1.4;
}

.container-description {
  font-size: 1rem; /* 16px */
  line-height: 1.4;
}

.container-description a {
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
  transition: border-bottom 0.2s ease-in-out;

  &:hover {
    border-bottom: 1px solid currentColor;
  }
}

.textlink {
  font-size: inherit;
  color: inherit;
  text-decoration: none;
  border-bottom: 1px dotted currentColor;
  transition: border-bottom 0.2s ease-in-out;

  &:hover {
    border-bottom: 1px solid currentColor;
  }
}

.app-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-view__grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.app-view__container {
  flex: 1 1 calc(50% - 1rem);
  border-radius: 6px;
  border: 1px solid #eeeeee;
  padding: 20px;
  height: max-content;
}

@media (max-width: 768px) {
  .app-view__container {
    flex: 1 1 100%;
  }
}

.cadet-list {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  margin-top: 1rem;
  margin-bottom: 1rem; /* 16px */
  justify-content: center;
  overflow-x: auto;
}

.cadet-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem; /* 8px */
  text-decoration: none;
  color: inherit;
  flex: 0 0 auto;
}

.cadet {
  font-size: 1rem; /* 16px */
  font-weight: 700;
  text-align: center;
}

.cadet-title {
  font-size: 1rem; /* 16px */
  text-align: center;
}

.cadet-img {
  width: 6rem;
  height: 6rem;
}

.text-bar {
  border-radius: 0.375rem; /* 6px */
  border: 1px solid #eeeeee;
  padding: 1.25rem; /* 20px */
  height: max-content;
}

.text-bar-title {
  font-size: 1.5rem; /* 24px */
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
}

.text-bar__subtitle-wrp {
  display: flex;
  align-items: center;
  gap: 1rem; /* 16px */
}

.text-bar__subtitle {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: left;
  margin-top: 0.75rem; /* 8px */
}

.text-bar-description {
  font-size: 1rem; /* 16px */
  line-height: 1.4;
}

.text-bar__description-wrp {
  margin-top: 1.5rem; /* 24px */
}
</style>

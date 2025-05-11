<template>
  <div
    id="teleports"
    class="w-screen h-screen overflow-hidden relative bg-blue-100"
  >
    <WorldMap />
    <div class="absolute top-3 right-20 z-1000000">
      Map by NoxX, Cailco, Disort &
      <a
        class="underline"
        href="https://discord.gg/lost-skies-947796968669851659"
        >Community</a
      >
    </div>
    <a
      class="absolute bottom-5 right-5 text-5xl z-1000000"
      target="_blank"
      href="https://github.com/AutomaticPotato/found-skies"
    >
      <Icon name="mdi:github" />
    </a>
    <img class="absolute top-5 left-10 size-40 z-10000000" src="/compass.svg" />
  </div>
</template>

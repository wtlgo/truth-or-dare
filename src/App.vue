<template>
    <div class="app">
        <div class="glow"></div>

        <header class="header">
            <div class="header-left">
                <div class="header-icon">?</div>
                <div class="header-title">{{ t("title") }}</div>
            </div>
            <div class="header-right">
                <ChangeLanguage />
                <button class="btn-edit" @click="showAddNames = true">
                    {{ t("button.edit-names") }}
                </button>
            </div>
        </header>

        <main class="main">
            <template v-if="len > 0">
                <div :key="pairKey" class="pair">
                    <div class="pair-name">{{ pair.from }}</div>
                    <div class="pair-label">{{ t("asks") }}</div>
                    <div class="pair-name">{{ pair.to }}</div>
                </div>
            </template>
            <template v-else>
                <div class="empty">
                    <div class="empty-text">
                        {{ t("message.no-names-provided") }}
                    </div>
                    <button
                        class="btn-primary"
                        @click="showAddNames = true"
                    >
                        {{ t("button.edit-names") }}
                    </button>
                </div>
            </template>
        </main>

        <footer class="footer">
            <div class="progress-row">
                <div class="segments">
                    <div
                        v-for="i in len"
                        :key="i"
                        class="segment"
                        :class="{ active: i - 1 <= turn.counter }"
                        @click="turn.setCounter(i - 1)"
                    ></div>
                </div>
                <div class="progress-label">{{ progressLabel }}</div>
            </div>
            <div class="nav-row">
                <button class="btn-back" @click="turn.back">
                    {{ t("button.back") }}
                </button>
                <button class="btn-next" @click="turn.next">
                    {{ t("button.next") }}
                </button>
            </div>
        </footer>
    </div>

    <AddNames v-model="showAddNames" />
</template>

<script setup lang="ts">
import { useTurnStore } from "./stores/turn";
import AddNames from "./components/AddNames.vue";
import ChangeLanguage from "./components/ChangeLanguage.vue";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const turn = useTurnStore();
const pair = computed(() => turn.pairs[turn.counter]);
const len = computed(() => turn.len);
const pairKey = computed(
    () => `${turn.counter}-${pair.value?.from}-${pair.value?.to}`
);
const progressLabel = computed(() =>
    len.value ? `${turn.counter + 1} / ${len.value}` : "0 / 0"
);

const showAddNames = ref(false);

watchEffect(async () => {
    document.querySelector("html")?.setAttribute("lang", locale.value);
    document.title = t("title");
});
</script>

<style scoped>
.app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: #14131a;
    font-family: "Space Grotesk", sans-serif;
    color: #f4f2ee;
    position: relative;
    overflow: hidden;
}

.glow {
    position: absolute;
    top: -220px;
    left: 50%;
    transform: translateX(-50%);
    width: 900px;
    height: 600px;
    background: radial-gradient(
        50% 50% at 50% 50%,
        rgba(18, 184, 134, 0.16),
        rgba(18, 184, 134, 0) 70%
    );
    pointer-events: none;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 24px;
    position: relative;
    z-index: 2;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.header-icon {
    width: 22px;
    height: 22px;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.07);
    border: 1px solid rgba(255, 255, 255, 0.09);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(244, 242, 238, 0.45);
    font-size: 11px;
    font-weight: 500;
    user-select: none;
}

.header-title {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.01em;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-edit {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f4f2ee;
    font-family: "Space Grotesk", sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 9px 16px;
    border-radius: 999px;
    cursor: pointer;
}

.btn-edit:hover {
    background: rgba(18, 184, 134, 0.14);
    border-color: rgba(18, 184, 134, 0.4);
    color: #3fd6a8;
}

.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 40px 24px;
    position: relative;
    z-index: 1;
    text-align: center;
}

.pair {
    animation: tod-in 0.32s ease both;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.pair-name {
    font-size: clamp(44px, 9vw, 88px);
    font-weight: 500;
    letter-spacing: -0.04em;
    line-height: 1;
    text-wrap: balance;
}

.pair-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #12b886;
    padding: 2px 0;
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.empty-text {
    font-size: 20px;
    color: rgba(244, 242, 238, 0.45);
    font-weight: 300;
}

.btn-primary {
    background: #12b886;
    border: none;
    color: #0c1512;
    font-family: "Space Grotesk", sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 12px 22px;
    border-radius: 999px;
    cursor: pointer;
}

.btn-primary:hover {
    background: #3fd6a8;
}

.footer {
    padding: 20px 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
    z-index: 2;
}

.progress-row {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
}

.segments {
    display: flex;
    flex: 1;
    gap: 4px;
}

.segment {
    flex: 1;
    height: 6px;
    border-radius: 99px;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.12);
}

.segment:hover {
    opacity: 0.75;
}

.segment.active {
    background: #12b886;
}

.progress-label {
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    color: rgba(244, 242, 238, 0.45);
    min-width: 56px;
    text-align: right;
}

.nav-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    max-width: 720px;
    width: 100%;
    margin: 0 auto;
}

.btn-back {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: #f4f2ee;
    font-family: "Space Grotesk", sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 15px 30px;
    border-radius: 999px;
    cursor: pointer;
    min-height: 52px;
}

.btn-back:hover {
    background: rgba(255, 255, 255, 0.06);
}

.btn-next {
    background: #12b886;
    border: none;
    color: #0c1512;
    font-family: "Space Grotesk", sans-serif;
    font-size: 15px;
    font-weight: 600;
    padding: 15px 38px;
    border-radius: 999px;
    cursor: pointer;
    min-height: 52px;
}

.btn-next:hover {
    background: #3fd6a8;
}
</style>

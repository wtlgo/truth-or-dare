<template>
    <div class="locale-picker">
        <button class="locale-btn" @click="open = !open">
            <span>{{ t("language.name") }}</span>
            <span class="locale-arrow">▼</span>
        </button>
        <template v-if="open">
            <div class="locale-overlay" @click="open = false"></div>
            <div class="locale-dropdown">
                <button
                    v-for="lang in availableLocales"
                    :key="lang"
                    class="locale-item"
                    :class="{ active: lang === locale }"
                    @click="selectLocale(lang)"
                >
                    <span>{{
                        t("language.name", {}, { locale: lang })
                    }}</span>
                    <span
                        v-if="lang === locale"
                        class="locale-check"
                    >
                        ✓
                    </span>
                </button>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { setLocale as applyLocale } from "@/i18n";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale, availableLocales } = useI18n();

const open = ref(false);

const selectLocale = (lang: string) => {
    applyLocale(lang);
    open.value = false;
};
</script>

<style scoped>
.locale-picker {
    position: relative;
}

.locale-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #f4f2ee;
    font-family: "Space Grotesk", sans-serif;
    font-size: 13px;
    padding: 9px 14px;
    border-radius: 999px;
    cursor: pointer;
    outline: none;
}

.locale-btn:hover {
    background: rgba(255, 255, 255, 0.09);
}

.locale-arrow {
    font-size: 9px;
    opacity: 0.5;
    line-height: 1;
}

.locale-overlay {
    position: fixed;
    inset: 0;
    z-index: 19;
}

.locale-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 20;
    min-width: 150px;
    padding: 6px;
    background: #1f1e27;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.locale-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    background: transparent;
    border: none;
    color: rgba(244, 242, 238, 0.6);
    font-family: "Space Grotesk", sans-serif;
    font-size: 14px;
    text-align: left;
    padding: 10px 12px;
    border-radius: 11px;
    cursor: pointer;
}

.locale-item:hover {
    background: rgba(255, 255, 255, 0.06);
}

.locale-item.active {
    color: #f4f2ee;
}

.locale-check {
    font-size: 11px;
    color: #12b886;
}
</style>

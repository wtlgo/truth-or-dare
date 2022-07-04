<style>
@import "bootstrap";

body,
html,
#app {
    height: 100%;
}

* {
    touch-action: manipulation;
}
</style>

<template>
    <div
        class="container pt-2 h-100 d-flex flex-column justify-content-between"
    >
        <div class="row">
            <div class="col-auto">
                <ChangeLanguage />
            </div>
            <div class="col" />
            <div class="col-auto">
                <button class="btn btn-primary" @click="showAddNames = true">
                    {{ t("button.edit-names") }}
                </button>
            </div>
        </div>

        <div class="row p-4" v-if="len">
            <div
                class="col d-flex flex-wrap justify-content-evenly"
                v-html="
                    t('message.html.asks', {
                        from: pair.from,
                        to: pair.to,
                    })
                "
            />
        </div>
        <div class="row" v-else>
            <div class="col d-flex justify-content-evenly">
                {{ t("message.no-names-provided") }}
            </div>
        </div>

        <div class="row p-2">
            <div class="container-fluid">
                <div class="row">
                    <div class="col d-flex justify-content-between">
                        <button class="btn btn-primary" @click="turn.back">
                            {{ t("button.back") }}
                        </button>
                        <button class="btn btn-primary" @click="turn.next">
                            {{ t("button.next") }}
                        </button>
                    </div>
                </div>

                <div class="row p-2">
                    <div class="col">
                        <input
                            v-model="counter"
                            type="range"
                            class="form-range"
                            step="1"
                            min="0"
                            :max="len - 1"
                        />
                    </div>

                    <div v-if="len != 0" class="col-auto">
                        {{ +counter + 1 }} / {{ len }}
                    </div>
                    <div v-else class="col-auto">0 / 0</div>
                </div>
            </div>
        </div>
    </div>

    <AddNames v-model="showAddNames" />
</template>

<script setup lang="ts">
import { useTurnStore } from "./stores/turn";
import AddNames from "./components/AddNames.vue";
import { computed, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import ChangeLanguage from "./components/ChangeLanguage.vue";

const { t, locale } = useI18n();

const turn = useTurnStore();
const pair = computed(() => turn.pairs[turn.counter]);
const len = computed(() => turn.len);
const counter = computed({
    get: () => turn.counter,
    set: (value) => turn.setCounter(value),
});

const showAddNames = ref(false);

watchEffect(async () => {
    document.querySelector("html")?.setAttribute("lang", locale.value);
    document.title = t("title");
});
</script>

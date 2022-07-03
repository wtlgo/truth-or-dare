<style>
@import "bootstrap";
</style>

<template>
    <div class="container mt-2">
        <div class="row">
            <div class="col" />
            <div class="col-auto">
                <button class="btn btn-primary" @click="showAddNames = true">
                    Edit Names
                </button>
            </div>
        </div>

        <div class="row" v-if="len">
            <div class="col d-flex justify-content-evenly">
                <div class="h1">
                    {{ pair.from }}
                </div>
                <div class="h2 align-self-center">asks</div>
                <div class="h1">
                    {{ pair.to }}
                </div>
            </div>
        </div>
        <div class="row" v-else>
            <div class="col d-flex justify-content-evenly">
                No names provided
            </div>
        </div>

        <div class="row p-2">
            <div class="col d-flex justify-content-between">
                <button class="btn btn-primary" @click="turn.back">Back</button>
                <button class="btn btn-primary" @click="turn.next">Next</button>
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
                {{ +counter + 1 }}/{{ len }}
            </div>
            <div v-else class="col-auto">{{ 0 }}/{{ 0 }}</div>
        </div>
    </div>

    <AddNames v-model="showAddNames" />
</template>

<script setup lang="ts">
import { useTurnStore } from "./stores/turn";
import AddNames from "./components/AddNames.vue";
import { computed, ref } from "vue";

const turn = useTurnStore();
const pair = computed(() => turn.pairs[turn.counter]);
const len = computed(() => turn.len);
const counter = computed({
    get: () => turn.counter,
    set: (value) => turn.setCounter(value),
});

const showAddNames = ref(false);
</script>

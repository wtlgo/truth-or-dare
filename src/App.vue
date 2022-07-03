<template>
    <div>{{ namesTurn }}</div>
</template>

<script setup lang="ts">
import { useTurnStore } from "./stores/turn";

const turn = useTurnStore();
const namesTurn = turn.turnWithNames;
</script>

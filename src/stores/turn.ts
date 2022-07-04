import { defineStore } from "pinia";
import { build } from "@/utility/build";

export const useTurnStore = defineStore({
    id: "turn",
    persist: true,

    state() {
        return {
            names: ["Jim", "Tim", "Kim"],
            turn: build(3),
            counter: 0,
        };
    },

    getters: {
        turnWithNames(state): string[] {
            if (state.names.length !== new Set(state.turn).size) return [];
            return state.turn.map((v) => state.names[v]);
        },

        pairs(state): { from: string; to: string }[] {
            if (state.turn.length < 2) return [];
            return [...new Array(this.turn.length - 1)].map((_, i) => ({
                from: state.names[state.turn[i]],
                to: state.names[state.turn[i + 1]],
            }));
        },

        len() {
            return this.pairs.length;
        },
    },

    actions: {
        async setNames(names: string[]) {
            this.names = names;
            this.turn = build(names.length);
            this.counter = 0;
        },

        next() {
            if (this.counter < this.len - 1) this.counter++;
        },

        back() {
            if (this.counter != 0) this.counter--;
        },

        setCounter(value: number) {
            if (value >= 0 && value < this.len) this.counter = value;
        },
    },
});

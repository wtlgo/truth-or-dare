import { defineStore } from "pinia";
import { build } from "@/utility/build";

export const useTurnStore = defineStore({
    id: "turn",

    state(): { names: string[]; turn: number[] } {
        return {
            names: [],
            turn: [],
        };
    },

    getters: {
        turnWithNames(state): string[] {
            if (state.names.length !== state.turn.length) return [];
            return state.turn.map((v) => state.names[v]);
        },
    },

    actions: {
        async setNames(names: string[]) {
            if (this.turn.length !== names.length) {
                this.turn = build(names.length);
            }

            this.names = names;
        },
    },

    persist: true,
});

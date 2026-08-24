<template>
    <div v-if="show" class="modal-overlay">
        <div class="modal-backdrop" @click="hide"></div>
        <div class="modal-panel">
            <div class="modal-header">
                <div class="modal-title">
                    {{ t("button.edit-names") }}
                </div>
                <button
                    class="modal-close"
                    aria-label="Close"
                    @click="hide"
                >
                    ×
                </button>
            </div>

            <div class="modal-names">
                <div
                    v-for="(name, idx) in names"
                    :key="idx"
                    class="name-row"
                >
                    <div class="name-text">{{ name }}</div>
                    <button class="name-remove" @click="remove(idx)">
                        {{ t("button.remove") }}
                    </button>
                </div>
            </div>

            <div class="add-row">
                <input
                    v-model="toAdd"
                    class="add-input"
                    :placeholder="t('placeholder')"
                    @keydown.enter="add"
                />
                <button class="btn-add" @click="add">
                    {{ t("button.add") }}
                </button>
            </div>

            <div class="modal-actions">
                <button class="btn-reset" @click="reset">
                    {{ t("button.reset") }}
                </button>
                <button class="btn-save" @click="save">
                    {{ t("button.save-changes") }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useTurnStore } from "@/stores/turn";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const turn = useTurnStore();
const names = ref([...turn.names]);

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
const props = defineProps<{ modelValue?: boolean }>();

const show = computed(() => props.modelValue ?? false);

watch(show, (val) => {
    if (val) {
        names.value = [...turn.names];
        toAdd.value = "";
    }
});

const hide = () => emit("update:modelValue", false);
const reset = () => (names.value = [...turn.names]);
const save = async () => {
    await turn.setNames(names.value);
    hide();
};

const toAdd = ref("");
const add = () => {
    const val = toAdd.value.trim();
    if (!val.length) return;

    names.value = [...names.value, val];
    toAdd.value = "";
};

const remove = (idx: number) => {
    names.value = names.value.filter((_, i) => i != idx);
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: rgba(8, 8, 11, 0.6);
    backdrop-filter: blur(6px);
    font-family: "Space Grotesk", sans-serif;
}

.modal-backdrop {
    position: absolute;
    inset: 0;
}

.modal-panel {
    position: relative;
    width: 100%;
    max-width: 460px;
    background: #1b1a22;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: none;
    border-radius: 24px 24px 0 0;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    animation: tod-in 0.28s ease both;
    max-height: 88vh;
    color: #f4f2ee;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.modal-title {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
}

.modal-close {
    background: rgba(255, 255, 255, 0.06);
    border: none;
    color: rgba(244, 242, 238, 0.6);
    width: 32px;
    height: 32px;
    border-radius: 999px;
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
}

.modal-close:hover {
    background: rgba(255, 255, 255, 0.12);
    color: #f4f2ee;
}

.modal-names {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
}

.name-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 12px 14px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
}

.name-text {
    font-size: 16px;
    font-weight: 400;
}

.name-remove {
    background: transparent;
    border: none;
    color: rgba(244, 242, 238, 0.4);
    font-family: "Space Grotesk", sans-serif;
    font-size: 13px;
    cursor: pointer;
    padding: 6px 8px;
}

.name-remove:hover {
    color: #ff6b6b;
}

.add-row {
    display: flex;
    gap: 8px;
}

.add-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 13px 15px;
    color: #f4f2ee;
    font-family: "Space Grotesk", sans-serif;
    font-size: 15px;
    outline: none;
}

.add-input:focus {
    border-color: rgba(18, 184, 134, 0.6);
}

.btn-add {
    background: rgba(18, 184, 134, 0.14);
    border: 1px solid rgba(18, 184, 134, 0.35);
    color: #3fd6a8;
    font-family: "Space Grotesk", sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 13px 20px;
    border-radius: 14px;
    cursor: pointer;
}

.btn-add:hover {
    background: rgba(18, 184, 134, 0.24);
}

.modal-actions {
    display: flex;
    gap: 8px;
    padding-top: 4px;
}

.btn-reset {
    flex: 1;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.14);
    color: rgba(244, 242, 238, 0.7);
    font-family: "Space Grotesk", sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 15px;
    border-radius: 999px;
    cursor: pointer;
    min-height: 50px;
}

.btn-reset:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #f4f2ee;
}

.btn-save {
    flex: 1.4;
    background: #12b886;
    border: none;
    color: #0c1512;
    font-family: "Space Grotesk", sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 15px;
    border-radius: 999px;
    cursor: pointer;
    min-height: 50px;
}

.btn-save:hover {
    background: #3fd6a8;
}
</style>

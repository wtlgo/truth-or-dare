<template>
    <div
        class="modal fade show"
        :class="showClass"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        role="dialog"
        :style="showStyle"
    >
        <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        {{ t("message.edit-names") }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        aria-label="Close"
                        @click="hide"
                    />
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div
                            class="row p-2"
                            v-for="(name, idx) in names"
                            :key="idx"
                        >
                            <div class="col">
                                {{ name }}
                            </div>
                            <div class="col-auto">
                                <button
                                    class="btn btn-outline-danger"
                                    type="button"
                                    @click="remove(idx)"
                                >
                                    {{ t("button.remove") }}
                                </button>
                            </div>
                        </div>
                        <div class="row p-2">
                            <div class="col">
                                <input v-model="toAdd" />
                            </div>
                            <div class="col-auto">
                                <button
                                    class="btn btn-outline-success"
                                    type="button"
                                    @click="add"
                                >
                                    {{ t("button.add") }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        @click="reset"
                    >
                        {{ t("button.reset") }}
                    </button>
                    <button type="button" class="btn btn-primary" @click="save">
                        {{ t("button.save-changes") }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
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

const showStyle = computed(() => (show.value ? { display: "block" } : {}));
const showClass = computed(() => (show.value ? ["show"] : []));

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

import { defineStore } from 'pinia';

const getters = {
    getModalType() {
        return this.modalType;
    },
    getSelectedCarForEditing() {
        return this.selectedCarForEditing;
    },
};

const useModalFormStore = defineStore('modalForm', {
    state: () => {
        return {
            modalType: 'add',
            selectedCarForEditing: {},
        };
    },
    getters,
});

export default useModalFormStore;

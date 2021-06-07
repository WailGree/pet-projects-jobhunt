import { createStore, action } from 'easy-peasy';


const context = createStore({
    elementModalIsOpen: false,
    toggleElementModalIsOpen: action((state) => {
        state.elementModalIsOpen = !state.elementModalIsOpen;
    }),
    elementModalData: [],
    setElementModalData: action((state, data) => {
        state.elementModalData = data;
    })
});

export default context;
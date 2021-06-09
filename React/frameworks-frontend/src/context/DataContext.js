import { createStore, action } from 'easy-peasy';


const context = createStore({
    elements: [],
    setElements: action((state, elements) => {
        state.elements = elements;
    }),
    addElement: action((state, element) => {
        state.elements.push(element);
    }),
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
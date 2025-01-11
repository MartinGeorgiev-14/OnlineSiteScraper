import { useState } from "react";

const useStore = (initialState) => {
    const [state, setState] = useState(initialState);

    const getState = () => state;

    const onChange = (value) => {
        setState(value);
    }

    const clearState = (clear) => {
        setState(clear)
    }

    return {
        getState,
        onChange,
        clearState
    }

}

export default useStore;
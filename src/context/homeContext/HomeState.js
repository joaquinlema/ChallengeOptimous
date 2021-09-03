import { useReducer } from "react-transition-group/node_modules/@types/react";
import HomeContext from "./HomeContext";
import HomeReducer from "./HomeReducer";

const HomeState = (props) => {
    const initialState = {
        loading: false,
        error:false,
        errorMsj:'',
        dataSourceList:[],
        dialogStatus:false,
        save:false,

    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, dispatch] = useReducer(HomeReducer, initialState);

    const setLoading = (status) => dispatch => {
        dispatch({
            type:'',
            payload: status
        });
    };

    const setError = (error) => dispatch => {
        dispatch({
            type:'',
            payload: error
        })
    }

    return (
        <HomeContext.Provider value={{
            loading :state.loading
        }}>
            {props.children}
        </HomeContext.Provider>

    );
};
export default HomeState;
import { useReducer } from 'react';
import { GET_CONNECTION, INIT_FORM, SAVE_DATASOURCE, SET_ERROR, SET_LOADING } from "../../constants/Types";
import ConnectionsService from "../../api/service/Connections.service";
import FormContext from "./FormContext";
import FormReducer from "./FormReducer";
import DataSourceService from '../../api/service/DataSource.service';

const FormState = (props) => {
    const initialState = {
        loading: false,
        error: false,
        connectionList: [],
        save: false,
    };

    // eslint-disable-next-line no-unused-vars
    const [state, dispatch] = useReducer(FormReducer, initialState);

    const getConnections = async () => {
        try {
            const { data } = await ConnectionsService.getAll('total=false');

            dispatch({
                type: GET_CONNECTION,
                payload: data.data
            });
        } catch (error) {
            setError(error);
        }
    }

    const initForm = () => {
        dispatch({
            type: INIT_FORM,
        });
    }

    const saveDataSource = async (newDataSource) => {

        try {
            const { data } = await DataSourceService.create(newDataSource);

            dispatch({
                type: SAVE_DATASOURCE,
                payload: data.data
            });
        } catch (error) {
            setError(error);
        }

    }

    const setLoading = (status) => {
        dispatch({
            type: SET_LOADING,
            payload: status
        });
    };

    const setError = (error) => {
        dispatch({
            type: SET_ERROR,
            payload: 'ups Error'
        });
    }

    return (
        <FormContext.Provider value={{
            loading: state.loading,
            connectionList: state.connectionList,
            error: state.error,
            save:state.save,
            setError,
            setLoading,
            getConnections,
            saveDataSource,
            initForm
        }}>
            {props.children}
        </FormContext.Provider>

    );
};
export default FormState;
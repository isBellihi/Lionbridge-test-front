import Axios, {AxiosResponse} from "axios";

export function getAllTodos(): Promise<AxiosResponse<any>> {
        return Axios.get('https://lionbridge-test-api.herokuapp.com/api/todos');
    }

export function getOneTodo(id: string) {
        return Axios.get('https://lionbridge-test-api.herokuapp.com/api/todos/'+ id);
    }
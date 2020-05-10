import Axios, {AxiosResponse} from "axios";
import { Todo } from "../models/todo.model";

export function getAllTodos(): Promise<AxiosResponse<any>> {
        return Axios.get('https://lionbridge-test-api.herokuapp.com/api/todos');
    }

export function getOneTodo(id: string) {
        return Axios.get('https://lionbridge-test-api.herokuapp.com/api/todos/'+ id);
    }

export function addItem(todo: Todo) {
    return Axios.post('https://lionbridge-test-api.herokuapp.com/api/todos/', todo);
}

export function updateItem(todo: Todo) {
    return Axios.put('https://lionbridge-test-api.herokuapp.com/api/todos/' + todo._id, todo);
}
import { Subject } from 'rxjs';
import { Todo } from '../models/todo.model';

const subject = new Subject();

export const communicationService = {
    sendMessage: (item : Todo) => subject.next(item),
    clearMessages: () => subject.next(),
    onMessage: () => subject.asObservable()
};
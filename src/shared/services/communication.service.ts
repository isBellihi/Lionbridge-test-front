import { Subject } from 'rxjs';
import { Todo } from '../models/todo.model';

const subjectSend = new Subject();
const itemUpdated = new Subject();

export const communicationService = {
    sendEditClick: (item : Todo) => subjectSend.next(item),
    onEditClick: () => subjectSend.asObservable(),
    sendItemUpdatedEvent: (item : Todo) => itemUpdated.next(item),
    onItemUpdated: () => itemUpdated.asObservable()
};
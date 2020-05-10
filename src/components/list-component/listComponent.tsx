import React, { useState, useEffect } from 'react'
import { Todo } from '../../shared/models/todo.model';
import { getAllTodos } from '../../shared/services/todo.service';
import './list.component.css';
import { communicationService } from '../../shared/services/communication.service';


export default function ListComponent() {
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
        let todosList : any = [];
        getAllTodos().then(res => {
            todosList = res.data.map((item: any) => {
                item._id = item._id.$oid;
                return item;
            });
            setTodos(todosList);
        });
        const subscription =  communicationService.onItemUpdated().subscribe((updatedItem: any) => {
            todosList = todosList.map((item: Todo) => {
                if(item._id === updatedItem._id) item = {...updatedItem};
                return item;
            });
            setTodos(todosList);
        });
        return subscription.unsubscribe;
    }, []);

    const sendEditEvent = (todo: Todo) => {
        communicationService.sendEditClick(todo);
    }
    
    return (
        <div className="listContainer">
            {
            todos.map(todo => (
                <div key={todo._id} className='todo'>
                        <div className="title"><p><strong>{todo.title}</strong> ({todo.status})</p> </div>
                        <div>
                            {todo.description} ( {todo.dueDate})
                        </div>
                        <div>
                            <button className="editButton" onClick={() => sendEditEvent(todo)}>Edit</button>
                        </div>
                    </div>
              ))
            }
        </div>
    )
}

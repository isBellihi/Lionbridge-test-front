import React, { useState, useEffect } from 'react'
import { Todo } from '../../shared/models/todo.model';
import { getAllTodos } from '../../shared/services/todo.service';
import './list.component.css';
import { communicationService } from '../../shared/services/communication.service';


export default function ListComponent() {
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
        getAllTodos().then(res => {
            setTodos(res.data.map((item: any) => {
                item._id = item._id.$oid;
                item.dueDate = new Date(item.dueDate.$date);
                item.createdAt = new Date(item.createdAt.$date)
                return item;
            }));
        });
        return () => {
        }
    }, []);

    const sendEditEvent = (todo: Todo) => {
        communicationService.sendMessage(todo);
    }
    
    return (
        <div className="listContainer">
            {
            todos.map(todo => (
                <div key={todo._id} className='todo'>
                        <div className="title"><h4>{todo.title}</h4> </div>
                        <div>
                            {todo.description} 
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

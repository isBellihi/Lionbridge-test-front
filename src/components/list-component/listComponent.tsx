import React, { useState, useEffect } from 'react'
import { Todo } from '../../shared/models/todo.model';
import { getAllTodos } from '../../shared/services/todo.service';
import './list.component.css'


export default function ListComponent() {
    const [todos, setTodos] = useState<Todo[]>([]);
    useEffect(() => {
        getAllTodos().then(res => {
            setTodos(res.data.map((item: any) => {
                item._id = item._id.$oid;
                return item;
            }));
        });
        return () => {
        }
    }, []);
    
    return (
        <div className="listContainer">
            {
            todos.map(todo => (
                <div key={todo._id} className='todo'>
                    <h4>{todo.title}</h4> 
                    {todo.description}   
                </div>
              ))
            }
        </div>
    )
}

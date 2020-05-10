import React, { useState } from 'react'
import { Formik } from 'formik';
import { Todo } from '../../shared/models/todo.model';
import './editor.component.css'

function EditorComponent() {
    const [selectedItem, selectITem] = useState<Todo | undefined>(undefined);
    return (
        <div>
            <Formik
                initialValues={{ title: '', description: '', status: 'todo', dueDate: new Date() }}
                validate={validator}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="title"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                                placeholder='title'
                            />
                            <input
                                type="text"
                                name="description"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.description}
                                className = {errors.description && 'borderError'}
                                placeholder='description'
                            />
                            <select name="status" id="staus" value={values.status} onChange={handleChange} onBlur={handleBlur}> 
                                <option value="todo">todo</option>
                                <option value="doing">doing</option>
                                <option value="done">done</option>
                            </select>
                            <input type="date" name="dueDate" id="dueDate" value={''} onChange={handleChange} onBlur={handleBlur}/>
                            <button type="submit" disabled={isSubmitting}>Submit</button>
                        </form>
                    )}
            </Formik>
        </div>
    )
}

function validator(values: Todo): Todo {
    let errors: any = {};
    if (!values.title) {
        errors.title = 'Required';
    }
    if(!values.description){
        errors.description = 'Required';
    }
    if(!values.status){
        errors.status = 'Required';
    }
    if(!values.dueDate){
        errors.dueDate = 'Required';
    }
    return errors;
}

export default EditorComponent;

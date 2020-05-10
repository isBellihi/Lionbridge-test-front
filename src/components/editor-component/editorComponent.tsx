import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Todo } from '../../shared/models/todo.model';
import './editor.component.css';
import { updateItem } from '../../shared/services/todo.service';
import { communicationService } from '../../shared/services/communication.service';
import * as moment from "moment";



function EditorComponent() {

    const [selectedItem, setSelectedITem] = useState<Todo>({});

    useEffect(() => {
        const subscription = communicationService.onEditClick().subscribe((item: any) => {
            if (item) {
                setSelectedITem(item);
            } else {
                setSelectedITem({});
            }
        });
        return subscription.unsubscribe;
    }, []);

    function onSubmit(values: Todo, setSubmitting: Function ){
        setSelectedITem({
            title: values.title,
            description: values.description,
            status: values.status,
            dueDate: values.dueDate,
            createdAt: new Date()
        });
        updateItem(values).then(res => {
            if(res.data.id) {
                communicationService.sendItemUpdatedEvent({...values, _id: res.data.id});
            }
            setSelectedITem({});
            setSubmitting(false);
        });
    }

    return (
        <div className="form">
            <Formik
                initialValues={selectedItem}
                validate={validator}
                onSubmit={(values, { setSubmitting }) => { onSubmit(values, setSubmitting) }}
                enableReinitialize={true}>
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <form onSubmit={handleSubmit}>
                        <div className='formGroup'>
                        <input type="text" name="title" className={'input-field ' + (errors.title && 'borderError')} onChange={handleChange} onBlur={handleBlur} value={values.title || ''} placeholder='title'/>
                        {errors.title ? <span className = "error">{errors.title}</span> : ''}
                        </div>
                        <div className='formGroup'>
                        <textarea name="description" onChange={handleChange} onBlur={handleBlur} value={values.description || ''} className = {'input-description ' + (errors.description && 'borderError')} placeholder='description'/>
                        {errors.description ? <span className = "error">{errors.description}</span> : ''}
                        </div>
                        <div className='formGroup'>
                        <select name="status" className={'input-field ' + (errors.status && 'borderError')} id="status" value={values.status || ''} onChange={handleChange} onBlur={handleBlur}> 
                            <option value="todo">todo</option>
                            <option value="doing">doing</option>
                            <option value="done">done</option>
                        </select>
                        {errors.status ? <span className = "error">{errors.status}</span> : ''}
                        </div>
                        <div className='formGroup'>
                        <input type="date" className={'input-field ' + (errors.dueDate && 'borderError')} name="dueDate" 
                        value={moment.utc(values.dueDate).format('YYYY-MM-DD')} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.dueDate ? <span className = "error">{errors.dueDate}</span> : ''}
                        </div>
                        <button className='buttonSubmit' type="submit" disabled={isSubmitting}>Submit</button>
                    </form>
                )}
            </Formik>
        </div>
    )
}

function validator(values: Todo): Todo {
    let errors: any = {};
    if (!values.title) {
        errors.title = 'Title required';
    }
    if(!values.description){
        errors.description = 'Description required';
    }
    if(!values.status){
        errors.status = 'Status required';
    }
    if(!values.dueDate){
        errors.dueDate = 'Please select due date';
    }
    return errors;
}


export default EditorComponent;

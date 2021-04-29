import React, { useState } from 'react';
import { Activity } from '../../../app/models/activity'
import { Button, Form, Segment } from 'semantic-ui-react';
interface Props {
    activity: Activity | undefined
    closeForm: () => void
    createOrEdit:(activity:Activity)=>void
}
export default function ActivityForm({ activity: selectedActivity, closeForm, createOrEdit }: Props) {
    const intialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(intialState)

    function handleSubmit() {
        createOrEdit(activity)
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { value, name } = event.target;
        setActivity({ ...activity, [name]: value })
    }
    return (
        <Segment>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChange} />
                <Form.Input placeholder='Date' value={activity.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
            </Form>
        </Segment>
    )
}
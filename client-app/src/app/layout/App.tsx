import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity'
import NavBar from '../layout/NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';
import agent from '../api/agent'
import LoadingComponent from '../layout/LoadingComponent'
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(res => {
      let activities: Activity[] = [];
      res.map(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(activities);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(activity => activity.id === id))
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true)
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(res => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity])
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(res => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(res=>{
      setActivities([...activities.filter(a => a.id !== id)]);
      setSubmitting(false);
    })
  }


  if (loading) return <LoadingComponent content='Loading app' />
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;

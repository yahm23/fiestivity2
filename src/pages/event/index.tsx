import { useUser } from '@clerk/nextjs';
import * as React from 'react';
import EventForm from '~/components/functional/EventForm';
import LayoutGeneral from '~/components/ui/layout-general';
import { api } from "~/utils/api";

export default function Event () {
  const {user, isLoaded} = useUser();
  if (!isLoaded) return (<div>Loading...</div>)
  if (!user) return (<div>Something went wrong!</div>)

  const {data, isLoading} = api.event.getUserEventsFromUserId.useQuery({userId: user.id});

  if (isLoading) return (<div>Loading....</div>)
  if (!data) return (<div>Something went wrong!</div>)
  return (
    <LayoutGeneral>
        <div>
          Your events:
          <div>
            {data.events.map((event)=>(
              <div key={event.id}>
                {event.name}
                {event.content}
              </div>
            ))}
          </div>
          <EventForm/>
        </div>
    </LayoutGeneral>
  );
}

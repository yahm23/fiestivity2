import { SignIn, SignOutButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import { Button } from "~/components/ui/button";
import LayoutGeneral from "~/components/ui/layout-general";
import ProfileImage from "~/components/ui/profileImage";

// import Link from "next/link";

import { api } from "~/utils/api";

interface UseUserType {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: { id: string };
}

const CreatePosts = () => {
  return (
    <div>index</div>
  )
}

export default function Home() {
  const { isSignedIn, user } = useUser() as UseUserType;
  const {data, isLoading} = api.event.getAll.useQuery();

  if (isLoading) return (<div>Loading....</div>)
  if (!data) return (<div>Something went wrong!</div>)
  return (
    <>
      <LayoutGeneral title={!!isSignedIn ? 'Home' : undefined }>
        {!isSignedIn && <SignIn/>}
        {!!isSignedIn && <ProfileImage/>}
        {!!isSignedIn && <Button variant="secondary"><SignOutButton/></Button>}
      </LayoutGeneral>
    
    {/* <div>
      {data?.map((e)=>(
        <div key={e.id}>
          {e.content}
        </div>
      ))}
    </div> */}
    </>
  );
}

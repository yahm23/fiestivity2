import { useUser } from "@clerk/nextjs";
import { PersonIcon } from '@radix-ui/react-icons'

export default function ProfileImage() {
    const {user} = useUser();
    return (
      <div className="flex gap-3">
        <div className="rounded-full overflow-hidden h-12 w-12 border-2 border-gray-500 flex justify-center" >
            {user ?
                <img src={user.imageUrl} alt="Profile Image"/>
            :
                <PersonIcon className="h-12 w-12"/>
            }
        </div>
      </div>
    )
}
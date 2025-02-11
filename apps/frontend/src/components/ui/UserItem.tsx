import { Button } from "./Button"

export const UserItem = ({username} : {username: string}) => {
  return (
    <div className="w-full rounded-md px-4 py-2 flex items-center justify-between bg-gray-400/5">
        <div className="flex gap-2 items-center">
        <div className="aspect-square h-8 rounded-full bg-amber-300">

        </div>
        <h1>
            {username}
        </h1>
        </div>

        <div className="w-36 ">
            <Button>
                Send
            </Button>
        </div>

        
    </div>
  )
}

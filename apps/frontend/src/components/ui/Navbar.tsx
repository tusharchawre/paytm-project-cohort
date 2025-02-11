interface NavbarProps{
    username: string
}

export const Navbar = ({username}: NavbarProps) => {
  return (
    <div className="w-full h-16 border-b-[0.5px] border-black/20 flex justify-between items-center px-8">
        <h1>Payments App</h1>
        
        <div className="flex gap-4 items-center">
            <p>Hi, {username}</p>
        <div className="h-10 aspect-square rounded-full bg-gray-400">
            
        </div>

        </div>
        

    </div>
  )
}

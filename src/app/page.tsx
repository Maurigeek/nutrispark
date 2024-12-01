"use client"

import { useRouter } from "next/navigation"
 
import { useState, useEffect } from "react"

import { Check, ChevronsUpDown } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { IFood, IFoodReduced } from "@/types"
 


export default function Home() {

  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [foods, setFoods] = useState<IFoodReduced[]>([])
  const [isLoading, setIsloading] = useState<boolean>(true)

  const fetchFoods = async () => {
    try {
      const response = await fetch('/api/foods/all/');
      const data = await response.json();
      const foodReduce: IFoodReduced[] = data.map((food: IFood) => (
        {
          value: food.name.toLowerCase().replace(/ /g, '-'),
          label: food.name
        }
      ))
      setFoods(foodReduce)

      
    } 
    catch(error) {
      console.log(error)
    }

  }

  useEffect(() => {
    const initialise = async() => {
      await fetchFoods();
      setIsloading(false);
    };
    initialise();
  }, [])

  useEffect(() => {
    if(value.length > 0){
      router.push(`/food/${value}`)
    }
  }, [value, router])

  return (
   <>
    {!isLoading ? (
      <div className="min-h-screen  text-white flex flex-col justify-center items-center p-6">
        <h1 className="text-5xl font-extrabold mb-4">Welcom to <span className="title_colored">Nutrispark</span></h1>
        <p className="text-lg text-center max-w-2xl">Discover the nutritional values of your favorites foods. Use the search to get the started</p>
         <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? foods.find((food) => food.value === value)?.label
            : "Select food..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search food..." />
          <CommandList>
            <CommandEmpty>No food found.</CommandEmpty>
            <CommandGroup>
              {foods.map((food) => (
                <CommandItem
                  key={food.value}
                  value={food.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === food.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {food.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
        </Popover>
      </div>
     
    ) : (
      <div className="flex justify-center text-center items-center h-screen text-white">En cours de Chargememt </div>
    )

    }
    
   </>
  );
}

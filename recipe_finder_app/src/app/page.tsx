"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
};

type MealDetail = {
  category: string,
  area: string,
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [meal, setMeal] = useState<Meal[] | null>(null);
  const [enableDiv, setEnableDiv] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<MealDetail[]>([]);
  const [id, setId] = useState("")

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=" + search)
      .then((res) => res.json())
      .then((res) => {
        setMeal(res.meals);
        console.log(res.meals);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.message);
      });
  }, [search]);

  function showDetails(e: string) {
    console.log(e);
    setId(e)
    setEnableDiv(true)
    if(meal){
      const matched = meal.find((item) => item.idMeal === e)
      if(matched){
        setSelectedMeal([{category: matched.strCategory, area: matched.strArea}])
      }
    }
  }

  function hideDetails(e: string) {
    console.log(e);
    setId(e)
    setEnableDiv(true)
    if(meal){
      const matched = meal.find((item) => item.idMeal === e)
      if(matched){
        setSelectedMeal([{category: matched.strCategory, area: matched.strArea}])
      }
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Recipe Finder</h1>
      <div className="relative w-72">
        <input
          placeholder="search meal here by first letter"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-col">
         
          <ul className="absolute left-0 right-0 top-full mt-1 bg-white border rounded shadow z-10 max-h-60 overflow-y-auto">
            {Array.isArray(meal) &&
              meal.map((item, index) => (
                <div key={index}  >
                <div key={index} >
                  <Link href={"/recipe/" + item.idMeal}>
                    <li onMouseEnter={() => showDetails(item.idMeal)}
                        onMouseLeave={() => hideDetails(item.idMeal)}
                      >
                      <p>{item.strMeal}</p>
                    </li>
                  </Link>

                </div>
                
                </div>

                
              ))}
          </ul>
          
          <div >
                  {
                    enableDiv  ? <div><ul>
                      <li>{selectedMeal[0].category}</li>
                      <li>{selectedMeal[0].area}</li>
                      </ul></div>
                  : <p></p>}

                </div>
        </div>
      </div>
    </div>
  );
}

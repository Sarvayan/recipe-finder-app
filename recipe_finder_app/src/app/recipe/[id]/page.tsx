import RecipeDetails from "../../../../pages/RecipeDetails";

type Props = {
  params: { id: string }
};

export async function generateMetadata({params}: Props){
    const { id } = await params;
    console.log(id)
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    
    const data = await res.json()
    console.log(data)

       
      
     
      return {
        title: data.meals[0].strMeal
      }
}

async function Page({params}: Props) {
  const resolvedParams = await params
  return (
    <RecipeDetails params={resolvedParams}/>
  );
}

export default Page;

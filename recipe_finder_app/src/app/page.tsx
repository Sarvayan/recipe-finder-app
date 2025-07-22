import Home from "../../pages/Home"

export async function generateMetadata(){
  return {
    title: "Find Recipe"
  }
}

export default function Page(){
  return (
    <Home/>
  )
}
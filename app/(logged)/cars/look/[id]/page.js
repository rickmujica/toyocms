import CarLook from "@/app/components/CarLook";

export default async function CarLookPage({ params }) {
    
  return (
    <>
        <CarLook id={params.id}/>             
    </>

  )
}
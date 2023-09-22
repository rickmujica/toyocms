import CarEdit from "@/app/components/CarEdit";

export default async function CarEditPage({ params }) {
    

  return (
    <>
        <CarEdit id={params.id}/>             
    </>

  )
}
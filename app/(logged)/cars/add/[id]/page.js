import CarAdd from "@/app/components/CarAdd";
export const dynamic = 'force-dynamic'
export default async function CarAddPage({ params }) {
  return (
    <>
      <CarAdd />
    </>
  );
}

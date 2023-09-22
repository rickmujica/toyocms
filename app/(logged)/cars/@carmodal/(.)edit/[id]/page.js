import CarEdit from "@/app/components/CarEdit";
import Modal from "@/app/components/Modal";
export const dynamic = 'force-dynamic'
export default async function CarEditModal({ params }) {
  return (
    <Modal titulo="Editando datos del vehículo">
      <CarEdit id={params.id} />
    </Modal>
  );
}

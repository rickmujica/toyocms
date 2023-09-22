import CarAdd from "@/app/components/CarAdd";
import Modal from "@/app/components/Modal";
export const dynamic = 'force-dynamic'
export default async function CarAddModal({ params }) {
  return (
    <Modal titulo="Datos del nuevo vehículo">
      <CarAdd />
    </Modal>
  );
}

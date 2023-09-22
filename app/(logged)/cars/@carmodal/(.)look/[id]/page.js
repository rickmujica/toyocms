import Modal from '@/app/components/Modal'
import CarLook from '@/app/components/CarLook'

export default function CarLookModal({params}) {
  return (
    
    <Modal titulo="Datos del vehículo">
        <CarLook id={params.id} />
    </Modal>
    
  )
}

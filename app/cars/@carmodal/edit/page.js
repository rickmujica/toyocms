import React from 'react'
import BasicModal from '@/app/components/Modal'
import CarEdit from './[id]/page'

export default function Edit(props) {
  return (
    
    <BasicModal>
        <CarEdit searchParams={JSON.stringify(props.searchParams.id)} />
    </BasicModal>
    
  )
}

import React from 'react'
import BasicModal from '@/app/components/Modal'
import CarView from './[id]/page'

export default function Look(props) {
  return (
    
    <BasicModal>
        <CarView searchParams={JSON.stringify(props.searchParams.id)} />
    </BasicModal>
    
  )
}

import TaskCard from '@/components/TaskCard'
import React from 'react'

const Slug: React.FC<{ params: any }> = ({ params }) => {
  const dataArray = params.slug.split('*')
  

  const task = dataArray[0]
  const state = dataArray[2]
  const priority = dataArray[1]
  return (
    <div>
      <TaskCard task={task} state={state} priority={priority} />
    </div>
  )
}

export default Slug

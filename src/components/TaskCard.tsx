'use client'
import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
interface Props {
  task: string
  state: string
  priority: string
}

const ContactCard: React.FC<Props> = (props) => {
  const task = props.task
  const state = props.state
  const priority = props.priority

  const taskState = {
    true: 'Acabada',
    false:'Pendiente'
  }

  const aaa = (state==='true')


  const priorityDictionary = {
    low:'Baja',
    medium:'Media',
    high:'Alta'
  }
  return (
      <div className="mt-3">
      <Card
        className="mx-auto"
        style={{ width: '18rem' }}
        border="info"
        bg="info"
      >
        <Card.Img
          variant="top"
          src={aaa ? "https://th.bing.com/th/id/OIP.mzeL8VlgFbh8X1q53Ky3dwHaJz?rs=1&pid=ImgDetMain":
          "https://th.bing.com/th/id/OIP.8eQ7-6WwZyoN90x-1aVDHQAAAA?rs=1&pid=ImgDetMain"
        }
        />
        <Card.Body>
          <Card.Title>Tarea</Card.Title>
          <Card.Text>Datos Registrados...</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item variant="primary">Estatus: {taskState[state]}</ListGroup.Item>
          <ListGroup.Item variant="primary">Prioridad: {priorityDictionary[priority]}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="/tasks">Atrás</Card.Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ContactCard

import React from 'react'
import Nav from 'react-bootstrap/Nav';

export const Cours = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/curso/iniCurso">Curso</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" href="/curso/editCurso">Editar Curso</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" href="/curso/listEstud">Estudiantes</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

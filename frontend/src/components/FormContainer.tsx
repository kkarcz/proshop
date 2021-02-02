import React, { memo } from 'react';
import { Container, Row, Col } from "react-bootstrap";

interface IFormContainerProps {
    children: React.ReactNode;
}

const FormContainer = ({ children }: IFormContainerProps) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
};

export default memo(FormContainer);
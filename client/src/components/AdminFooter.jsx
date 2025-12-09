import { Container, Row, Col } from 'react-bootstrap';

const AdminFooter = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col md={12} className="text-center">
                        <p>© 2024 Petshop Online Website. All Rights Reserved</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default AdminFooter;


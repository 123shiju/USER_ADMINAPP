import { Container, Card, Button } from "react-bootstrap";
const HeroAdmin = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">MERN Authentication APP</h1>
          <h2 className="text-center mb-4">Admin</h2>
          <p className="text-center mb-4">
            Welcome back Admin
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default HeroAdmin;
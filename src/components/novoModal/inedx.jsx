import "./style.scss";
import * as yup from "yup";
import { Form, Col, Button, Row, InputGroup, Container } from "react-bootstrap";
import { Formik } from "formik";

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  email: yup.string().email("Email inválido").required(),
  cpf: yup.string().min(11, "erro 1").max(11, "erro 2").required(),
  phone: yup.string().required("O campo telefone é obrigatório"),
  address: yup.string(),
  complement: yup.string(),
  zipcode: yup.string(),
  district: yup.string(),
  city: yup.string(),
  uf: yup.string(),
});

function FormExample({ handleClose }) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log()}
      initialValues={{
        name: "",
        email: "",
        cpf: "",
        phone: "",
        address: "",
        complement: "",
        zipcode: "",
        district: "",
        city: "",
        state: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Container>
            <Row className="mb-3 ">
              <Form.Group as={Col} controlId="validationFormikName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu nome"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                  isValid={touched.name && !errors.name}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="validationFormikEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite o seu e-mail"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && !!errors.email}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback> {errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} md="6" controlId="validationFormikCPF">
                <Form.Label>CPF</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="Digite o seu CPF"
                    aria-describedby="inputGroupPrepend"
                    name="cpf"
                    value={values.cpf}
                    onChange={handleChange}
                    isInvalid={touched.cpf && !!errors.cpf}
                    isValid={touched.cpf && !errors.cpf}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormikN">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu telefone"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={touched.phone && !!errors.phone}
                  isValid={touched.phone && !errors.phone}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} controlId="validationFormik04">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu endereço"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isInvalid={touched.address && !!errors.address}
                  isValid={touched.address && !errors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="validationFormik05">
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu complemento"
                  name="complement"
                  value={values.complement}
                  onChange={handleChange}
                  isInvalid={touched.complement && !!errors.complement}
                  isValid={touched.complement && !errors.complement}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.complement}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} md="5" controlId="validationFormik06">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu CEP"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  isInvalid={touched.zipcode && !!errors.zipcode}
                  isValid={touched.zipcode && !errors.zipcode}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.zipcode}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="7" controlId="validationFormik07">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu bairro"
                  name="district"
                  value={values.district}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.district}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} md="6" controlId="validationFormik08">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a sua cidade"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationFormik09">
                <Form.Label>UF</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu estado"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="modal-footer-buttons mt-5">
              <Button as="Col" onClick={handleClose} className="cancel-btn">
                Cancelar
              </Button>
              <Button as="Col" type="submit">
                Aplicar
              </Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}
export default FormExample;

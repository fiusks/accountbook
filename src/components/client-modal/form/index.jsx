import "./style.scss";
import * as yup from "yup";
import { Form, Col, Button, Row, InputGroup, Container } from "react-bootstrap";
import { Formik } from "formik";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("Inserir um e-mail válido")
    .required("O email é obrigatório"),
  cpf: yup
    .string()
    .min(11, "O CPF deve conter 11 dígitos")
    .max(11, "O CPF deve conter 11 dígitos")
    .required("O CPF é obrigatório"),
  phone: yup
    .string()
    .min(10, "Telefone inválido")
    .max(11, "Telefone inválido")
    .required("O telefone é obrigatório"),
  address: yup.string(),
  complement: yup.string(),
  zipcode: yup
    .string()
    .min(8, "O CEP deve conter 8 dígitos")
    .max(8, "O CEP deve conter 8 dígitos"),
  district: yup.string(),
  city: yup.string(),
  uf: yup.string(),
});

function ClientForm({ handleClose }) {
  const { token } = useAuth();
  const { setClientToast, clientForm } = useUser();
  const {
    name,
    email,
    cpf,
    phone,
    address,
    complement,
    zipcode,
    district,
    city,
  } = clientForm;

  const registerHandler = async (values, { setSubmitting, setErrors }) => {
    setErrors({
      name: "",
      email: "",
      cpf: "",
      phone: "",
      address: "",
      complement: "",
      zipcode: "",
      district: "",
      city: "",
    });
    const {
      name,
      email,
      cpf,
      phone,
      address,
      complement,
      zipcode,
      district,
      city,
      state,
    } = values;

    const payload = {
      client: {
        name,
        email,
        cpf,
        phone,
        address,
        complement,
        zipcode,
        district,
        city,
        state,
      },
    };
    console.log(payload, "envio cliente");
    try {
      const response = await fetch(
        "https://api-teste-equipe-6.herokuapp.com/registerClient",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data);
      if (!data.success) {
        if (data.client.email) {
          setErrors({ email: data.client.email });
        }
        if (data.client.cpf) {
          setErrors({ cpf: data.client.cpf });
        }
        if (data.client.zipcode) {
          setErrors({ zipcode: data.client.zipcode });
        }
        return;
      }
      setTimeout(() => {
        handleClose();
        setTimeout(() => {
          setClientToast(true);
          setTimeout(() => {
            setClientToast(false);
          }, 4000);
        }, 1000);
      }, 1000);
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={registerHandler}
      initialValues={{
        name,
        email,
        cpf,
        phone,
        address,
        complement,
        zipcode,
        district,
        city,
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
              <Form.Group as={Col} controlId="clientInputName">
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
                  {" "}
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="clientInputEmail">
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
                <Form.Control.Feedback type="invalid">
                  {" "}
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} md="6" controlId="clientInputCPF">
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
                    {console.log(errors)}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="clientInputPhone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="number"
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
              <Form.Group as={Col} controlId="clientInputAddress">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu endereço"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isInvalid={touched.address && !!errors.address}
                  isValid={
                    values.address ? touched.address && !errors.address : false
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="clientInputComplement">
                <Form.Label>Complemento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu complemento"
                  name="complement"
                  value={values.complement}
                  onChange={handleChange}
                  isValid={
                    values.complement
                      ? touched.complement && !errors.complement
                      : false
                  }
                />

                <Form.Control.Feedback type="invalid">
                  {errors.complement}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} md="5" controlId="clientInputCEP">
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu CEP"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  isValid={
                    values.complement
                      ? touched.complement && !errors.complement
                      : false
                  }
                />

                <Form.Control.Feedback type="invalid">
                  {errors.zipcode}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="7" controlId="clientInputDistrict">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu bairro"
                  name="district"
                  value={values.district}
                  onChange={handleChange}
                  isValid={
                    values.district
                      ? touched.district && !errors.district
                      : false
                  }
                />

                <Form.Control.Feedback type="invalid">
                  {errors.district}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} md="6" controlId="clientInputCity">
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a sua cidade"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isValid={values.city ? touched.city && !errors.city : false}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="clientInputState">
                <Form.Label>UF</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o seu estado"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isValid={
                    values.state ? touched.state && !errors.state : false
                  }
                />

                <Form.Control.Feedback type="valid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="modal-footer-buttons mt-5">
              <Button onClick={handleClose} className="cancel-btn">
                Cancelar
              </Button>
              <Button type="submit">Aplicar</Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default ClientForm;

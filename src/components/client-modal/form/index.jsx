import "./style.scss";
import * as yup from "yup";
import { Form, Col, Button, Row, InputGroup, Container } from "react-bootstrap";
import { Formik } from "formik";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import InputMask from "react-input-mask";

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
    .transform((value) => value.replace(/[^\d]/g, ""))
    .required("O CPF é obrigatório"),
  phone: yup
    .string()
    .transform((value) => value.replace(/[^\d]/g, ""))
    .min(10, "Telefone inválido")
    .max(11, "Telefone inválido")
    .required("O telefone é obrigatório"),
  address: yup.string().nullable(),
  complement: yup.string().nullable(),
  zipcode: yup
    .string()
    .transform((value) => value.replace(/[^\d]/g, ""))
    .min(8, "O CEP deve conter 8 dígitos")
    .max(8, "O CEP deve conter 8 dígitos")
    .nullable(),
  district: yup.string().nullable(),
  city: yup.string().nullable(),
  uf: yup.string().nullable(),
});

function ClientForm({ handleClose, type, loadClient }) {
  const token = document.cookie.split("=")[1];
  const {
    setClientToast,
    clientForm,
    setClientForm,
    setSubmitClientForm,
    submitClientForm,
    clientDetail,
  } = useUser();
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
    console.log(values, "values");
    const payload = {
      client: {
        name,
        email,
        cpf: cpf.replace(/[^\d]/g, ""),
        phone: phone.replace(/[^\d]/g, ""),
        address,
        complement,
        zipcode: zipcode.replace(/[^\d]/g, ""),
        district,
        city,
        state,
      },
    };
    console.log(payload, "payload");
    try {
      const response = await fetch(
        `https://api-testes-equipe-06.herokuapp.com/${
          type !== "Editar" ? "registerClient" : `editClient/${clientDetail.id}`
        }`,
        {
          method: type !== "Editar" ? "POST" : "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data, "data");
      if (!data.success) {
        const error = {};

        if (data.client.email) {
          error.email = data.client.email;
        }
        if (data.client.cpf) {
          error.cpf = data.client.cpf;
        }

        setErrors(error);
        return;
      }

      setSubmitClientForm(!submitClientForm);
      setClientForm({});
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
                  placeholder="Digite o nome do cliente"
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
                  placeholder="Digite o e-mail do cliente"
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
                  <InputMask
                    mask="999.999.999-99"
                    onChange={handleChange}
                    value={values.cpf}
                  >
                    {(inputProps) => (
                      <Form.Control
                        type="text"
                        placeholder="Digite o CPF do cliente"
                        aria-describedby="inputGroupPrepend"
                        name="cpf"
                        isInvalid={touched.cpf && !!errors.cpf}
                        isValid={touched.cpf && !errors.cpf}
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
                    {console.log(errors, "erros")}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="clientInputPhone">
                <Form.Label>Telefone</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.phone}
                  onChange={handleChange}
                >
                  {(inputProps) => (
                    <Form.Control
                      type="text"
                      placeholder="Digite o telefone do cliente"
                      name="phone"
                      isInvalid={touched.phone && !!errors.phone}
                      isValid={touched.phone && !errors.phone}
                    />
                  )}
                </InputMask>
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
                  placeholder="Digite o endereço do cliente"
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
                  placeholder="Digite o complemento"
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
                <InputMask
                  mask="99999-999"
                  value={values.zipcode}
                  onChange={handleChange}
                >
                  {(inputProps) => (
                    <Form.Control
                      type="text"
                      placeholder="Digite o CEP do cliente"
                      name="zipcode"
                      isInvalid={touched.zipcode && !!errors.zipcode}
                      isValid={
                        values.complement
                          ? touched.complement && !errors.complement
                          : false
                      }
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.zipcode}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="7" controlId="clientInputDistrict">
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o bairro do cliente"
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
                  placeholder="Digite a cidade do cliente"
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
                  placeholder="Digite o estado do cliente"
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

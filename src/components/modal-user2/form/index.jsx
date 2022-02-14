import "./style.scss";
import * as yup from "yup";
import { Form, Col, Button, Row, InputGroup, Container } from "react-bootstrap";
import { Formik } from "formik";
import useAuth from "../../../hooks/useAuth";

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  email: yup.string().email("Email inválido").required(),
  cpf: yup
    .string()
    .nullable()
    .min(11, "O CPF deve conter 11 dígitos")
    .max(11, "O CPF deve conter 11 dígitos"),
  phone: yup.string(),
  password: yup.string(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem"),
});

function UserForm() {
  const { token, userData, setUserData } = useAuth();

  const registerHandler = async (values, { setSubmitting, setErrors }) => {
    const { name, email, cpf, phone, password } = values;

    const payload = {
      nome: name,
      email,
      cpf,
      telefone: phone,
      novaSenha: password,
    };

    try {
      const response = await fetch(
        "https://api-teste-equipe-6.herokuapp.com/editUser",
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (!data.sucess) {
        if (data.email) {
          setErrors({ email: data.email });
        }
        if (data.cpf) {
          setErrors({ cpf: data.cpf });
        }
        return;
      }
      console.log(payload);
      console.log(data);
    } catch (e) {
    } finally {
      setSubmitting(false);
      const newUserData = {
        name: values.name,
        email: values.email,
        cpf: values.cpf,
        phone: values.phone,
      };
      setUserData(newUserData);
    }
  };
  const { name, email, cpf, phone } = userData;
  return (
    <Formik
      validationSchema={schema}
      onSubmit={registerHandler}
      initialValues={{
        name,
        email,
        cpf,
        phone,
        password: "",
        passwordConfirmation: "",
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
        <Form
          noValidate
          onKeyPress={(e) => {
            e.which === 13 && e.preventDefault();
          }}
          onSubmit={handleSubmit}
        >
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
                    isValid={values.cpf ? touched.cpf && !errors.cpf : false}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
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
                  isValid={
                    values.phone ? touched.phone && !errors.phone : false
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} controlId="clientInputPassword">
                <Form.Label>Nova senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite a sua nova senha"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={
                    touched.passwordConfirmation &&
                    !!errors.passwordConfirmation
                  }
                  isValid={
                    values.passwordConfirmation
                      ? touched.passwordConfirmation &&
                        !errors.passwordConfirmation
                      : false
                  }
                />

                <Form.Control.Feedback type="invalid">
                  {""}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="clientInputPasswordValidation">
                <Form.Label>Repetir nova senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repita a sua nova senha"
                  name="passwordConfirmation"
                  value={values.passwordConfirmation}
                  onChange={handleChange}
                  isInvalid={
                    touched.passwordConfirmation &&
                    !!errors.passwordConfirmation
                  }
                  isValid={
                    values.passwordConfirmation
                      ? touched.passwordConfirmation &&
                        !errors.passwordConfirmation
                      : false
                  }
                />

                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirmation}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="modal-footer-buttons mt-5">
              <Button type="submit">Aplicar</Button>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;

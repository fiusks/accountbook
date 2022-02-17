import "./style.scss";
import * as yup from "yup";
import { Form, Col, Button, Row, InputGroup, Container } from "react-bootstrap";
import { Formik } from "formik";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import InputMask from "react-input-mask";

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  email: yup.string().email("Email inválido").required(),
  cpf: yup
    .string()
    .nullable()
    .transform((value) => value.replace(/[^\d]/g, ""))
    .min(11, "O CPF deve conter 11 dígitos")
    .max(11, "O CPF deve conter 11 dígitos"),
  phone: yup
    .string()
    .nullable()
    .transform((value) => value.replace(/[^\d]/g, "")),
  password: yup.string(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas não coincidem"),
});

function UserForm() {
  const { token, userData, setUserData } = useAuth();
  const { setOpenModal, setClientToast } = useUser();
  const { name, email, cpf, phone } = userData;

  const registerHandler = async (values, { setSubmitting, setErrors }) => {
    const { name, email, cpf, phone, password } = values;
    const { id } = userData;

    const payload = {
      user: {
        id,
        name,
        email,
        cpf,
        phone,
        password,
      },
    };
    console.log(payload);
    try {
      const response = await fetch(
        "https://api-testes-equipe-06.herokuapp.com/editUser",
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
      console.log(data);
      if (!data.user.success) {
        if (data.user.email) {
          setErrors({ email: data.user.email });
        }
        if (data.user.cpf) {
          setErrors({ cpf: data.user.cpf });
        }
        if (data.user.password) {
          setErrors({ passwordConfirmation: data.user.password });
        }
        return;
      }
      const newUserData = {
        name: values.name,
        email: values.email,
        cpf: values.cpf,
        phone: values.phone,
      };

      setUserData((previousState) => ({ ...previousState, ...newUserData }));
      setTimeout(() => {
        setOpenModal(false);
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
                  <InputMask
                    mask="999.999.999-99"
                    value={values.cpf}
                    onChange={handleChange}
                  >
                    {(inputProps) => (
                      <Form.Control
                        type="text"
                        placeholder="Digite o seu CPF"
                        aria-describedby="inputGroupPrepend"
                        name="cpf"
                        isInvalid={touched.cpf && !!errors.cpf}
                        isValid={
                          values.cpf ? touched.cpf && !errors.cpf : false
                        }
                      />
                    )}
                  </InputMask>
                  <Form.Control.Feedback type="invalid">
                    {errors.cpf}
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
                      placeholder="Digite o seu telefone"
                      name="phone"
                      isInvalid={touched.phone && !!errors.phone}
                      isValid={
                        values.phone ? touched.phone && !errors.phone : false
                      }
                    />
                  )}
                </InputMask>
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

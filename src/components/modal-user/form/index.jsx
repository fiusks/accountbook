import "./style.scss";
import * as yup from "yup";
import { Form, Col, Button, Row, Container } from "react-bootstrap";
import { Formik } from "formik";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import { MaskedCPF, MaskedPhone } from "../../inputs-with-mask";
import { toastModalHandler } from "../../../services/toastModalTimer";
import showpassword from "../../../assets/showPass.svg";
import hidepassword from "../../../assets/hidePass.svg";
import { useState } from "react";

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
  const token = document.cookie.split("=")[1];
  const { userData, setUserData } = useAuth();
  const { setShowEditModal, setShowToast, setToastMessage, setToastType } =
    useUser();
  const { name, email, cpf, phone } = userData;
  const [showPassword, setShowPassword] = useState();

  const registerHandler = async (values, { setSubmitting, setErrors }) => {
    const { id, ...rawUserData } = userData;
    const formatedUserData = {
      ...rawUserData,
      password: "",
      passwordConfirmation: "",
    };

    const { name, email, password } = values;

    const payload = {
      user: {
        id,
        name,
        email,
        cpf: values.cpf?.replace(/[^\d]/g, ""),
        phone: values.phone?.replace(/[^\d]/g, ""),
        password,
      },
    };

    try {
      if (JSON.stringify(formatedUserData) !== JSON.stringify(values)) {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}editUser`,
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );
        const { user } = await response.json();
        console.log(user);
        if (user?.error) {
          const error = {};
          if (user.error.email) {
            error.email = user.error.email;
          }
          if (user.error.cpf) {
            error.cpf = user.error.cpf;
          }
          if (user.error.password) {
            error.passwordConfirmation = user.error.password;
          }
          setErrors(error);
          return;
        }

        setUserData({ ...userData, ...user });
      }
      setToastType("success");
      setToastMessage("Cadastro efetuado com sucesso!");
      toastModalHandler(setShowEditModal, setShowToast);
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
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form
          className="edit-user-form"
          noValidate
          onKeyPress={(e) => {
            e.which === 13 && e.preventDefault();
          }}
          onSubmit={handleSubmit}
        >
          <Container>
            <Row>
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
                <MaskedCPF
                  value={values}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cpf}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="clientInputPhone">
                <Form.Label>Telefone</Form.Label>
                <MaskedPhone
                  value={values}
                  onChange={handleChange}
                  errors={errors}
                  touched={touched}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                controlId="clientInputPassword"
                className="edit-user-password"
              >
                <Form.Label>Nova senha</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
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
                <img
                  src={showPassword ? showpassword : hidepassword}
                  alt="show/hide password icon"
                  onClick={() => setShowPassword(!showPassword)}
                />

                <Form.Control.Feedback type="invalid">
                  {""}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                controlId="clientInputPasswordValidation"
                className="edit-user-password"
              >
                <Form.Label>Repetir nova senha</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
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
                <img
                  src={showPassword ? showpassword : hidepassword}
                  alt="show/hide password icon"
                  onClick={() => setShowPassword(!showPassword)}
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

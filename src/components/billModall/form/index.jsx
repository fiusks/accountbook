import "./style.scss";
import * as yup from "yup";
import { Form, Col, Button, Row, InputGroup, Container } from "react-bootstrap";
import { Formik, setNestedObjectValues } from "formik";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import Cobrancas from "../../../pages/cobrancas";

const schema = yup.object().shape({
  name: yup.string().required("O campo nome é obrigatório"),
  desc: yup.string().required("O campo descrição é obrigatório"),
  dueDate: yup.date().required("O campo vencimento é obrigatiório"),
  value: yup.string().required("O campo valor é obrigatório"),
});

function BillForm({ handleClose }) {
  const { token } = useAuth();
  const {
    setClientToast,
    clientDetail,
    submitBillForm,
    setSubmitBillForm
  } = useUser();

  const registerHandler = async (
    values,
    { setSubmitting, setValues, setErrors }
  ) => {
    const { name, desc, dueDate, value, status } = values;

    const payload = {
      bill: { clientId: clientDetail.id, desc, dueDate, value, status },
    };
    try {
      const response = await fetch("https://api-testes-equipe-06.herokuapp.com/registerBill", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      setSubmitBillForm(!submitBillForm);
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
        name: clientDetail.name,
        desc: "",
        value: "",
        dueDate: "",
        status: "pending",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        setValues,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Container>
            <Row className="mb-3 ">
              <Form.Group as={Col} controlId="billInputName">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  placeholder="Digite o seu nome"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={touched.name && !!errors.name}
                  isValid={touched.name && !errors.name}
                />

                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "1.2rem" }}
                >
                  {" "}
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="billInputDesc">
                <Form.Label>descrição*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Digite a descrição"
                  name="desc"
                  value={values.desc}
                  onChange={handleChange}
                  isInvalid={touched.desc && !!errors.desc}
                  isValid={touched.desc && !errors.desc}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "1.2rem" }}
                >
                  {" "}
                  {errors.desc}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="justify-content-between">
              <Form.Group as={Col} md="6" controlId="billInputDueDate">
                <Form.Label>Vencimento*</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="date"
                    aria-describedby="inputGroupPrepend"
                    name="dueDate"
                    value={values.dueDate}
                    onChange={handleChange}
                    isInvalid={touched.dueDate && !!errors.dueDate}
                    isValid={touched.dueDate && !errors.dueDate}
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {errors.dueDate}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="billInputValue">
                <Form.Label>Valor*</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Digite o valor"
                  name="value"
                  value={values.value}
                  onChange={handleChange}
                  isInvalid={touched.value && !!errors.value}
                  isValid={touched.value && !errors.value}
                />
                <Form.Control.Feedback
                  type="invalid"
                  style={{ fontSize: "1.2rem" }}
                >
                  {errors.value}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <div key={`default-radio`} className="mb-3">
              <Form.Group>
                <Form.Check
                  name={"group1"}
                  type={"radio"}
                  id={`radio2`}
                  label={`Cobrança Paga`}
                  value={"paid"}
                  onChange={(e) =>
                    setValues({ ...values, status: e.target.value })
                  }
                />

                <Form.Check
                  defaultChecked
                  value={"pending"}
                  name={"group1"}
                  type={"radio"}
                  label={`Cobrança Pedendente`}
                  id={`default-radio`}
                  onChange={(e) =>
                    setValues({ ...values, status: e.target.value })
                  }
                />
              </Form.Group>
            </div>
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

export default BillForm;

import { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import "./style.scss";

function BillForm({ handleClose }) {
  const token = document.cookie.split("=")[1];

  const {
    setClientToast,
    clientDetail,
    submitBillForm,
    setSubmitBillForm,
    setUpdate,
    update,
    inputForms,
    setInputForms,
    type,
    setType,
  } = useUser();
  console.log(inputForms);
  const [isInvalid, setIsInvalid] = useState({
    desc: false,
    amount: false,
    dueDate: false,
  });
  const [isValid, setIsValid] = useState({
    desc: false,
    amount: false,
    dueDate: false,
  });
  const [amountMessage, setAmountMessage] = useState(false);
  const [showErro, setShowErro] = useState(false);
  const [toggle, setToggle] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowErro(true);
    if (!(isValid.desc && isValid.amount && isValid.dueDate)) return;

    const { desc, clientId, dueDate, amount, status, id } = inputForms;
    const payload = {
      bill: { id, clientId, desc, dueDate, amount, status },
    };
    console.log(payload);
    try {
      const response = await fetch(
        `https://api-testes-equipe-06.herokuapp.com${type}`,

        {
          method: `${type === "/registerBill" ? "POST" : "PUT"}`,
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      console.log(data);
      setTimeout(() => {
        handleClose();
        setShowErro(false);
        setClientToast(true);
        setTimeout(() => {
          setClientToast(false);
        }, 4000);
      }, 1000);
      setSubmitBillForm(!submitBillForm);
      setUpdate(!update);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(async () => {
    await formValidation();
  }, [toggle]);
  useEffect(async () => {
    if (type === "/registerBill") {
      setInputForms({
        ...inputForms,
        desc: "",
        amount: "",
        dueDate: "",
        status: "pending",
      });
    } else {
      return;
    }
  }, []);

  async function formValidation() {
    let countErro = 0;
    const objInvalid = isInvalid;
    const objValid = isValid;
    console.log(isInvalid);
    console.log(isValid);

    if (!inputForms.desc) {
      objInvalid.desc = true;
      objValid.desc = false;
      countErro++;
    } else {
      objInvalid.desc = false;
      objValid.desc = true;
      countErro--;
    }
    if (!inputForms.dueDate) {
      objInvalid.dueDate = true;
      objValid.dueDate = false;
      countErro++;
    } else {
      objInvalid.dueDate = false;
      objValid.dueDate = true;
      countErro--;
    }
    if (!inputForms.amount) {
      setAmountMessage("O campo deve ser preenchido!");
      objInvalid.amount = true;
      objValid.amount = false;
      countErro++;
    } else if (Number(inputForms.amount) < 0) {
      setAmountMessage("O valor deve ser maior que zero!");
      objInvalid.amount = true;
      objValid.amount = false;
      countErro++;
    } else {
      objInvalid.amount = false;
      objValid.amount = true;
      countErro--;
    }
    setIsValid(function (anterior) {
      return { ...anterior, ...objValid };
    });
    setIsInvalid(function (anterior) {
      return { ...anterior, ...objInvalid };
    });
  }
  return (
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
              value={inputForms.name}
            />

            <Form.Control.Feedback
              type="invalid"
              style={{ fontSize: "1.2rem" }}
            ></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="billInputDesc">
            <Form.Label>descrição*</Form.Label>
            <Form.Control
              required
              as="textarea"
              isInvalid={showErro && isInvalid.desc}
              isValid={showErro && isValid.desc}
              rows={4}
              placeholder="Digite a descrição"
              name="desc"
              value={inputForms.desc}
              onChange={(e) => {
                setInputForms({ ...inputForms, desc: e.target.value });
                setToggle(!toggle);
              }}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ fontSize: "1.2rem" }}
            >
              {"O campo deve ser preenchido!"}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="justify-content-between">
          <Form.Group as={Col} md="6" controlId="billInputDueDate">
            <Form.Label>Vencimento*</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                isInvalid={showErro && isInvalid.dueDate}
                isValid={showErro && isValid.dueDate}
                type="date"
                aria-describedby="inputGroupPrepend"
                name="dueDate"
                value={inputForms.dueDate}
                onChange={(e) => {
                  setInputForms({ ...inputForms, dueDate: e.target.value });
                  setToggle(!toggle);
                }}
              />
              <Form.Control.Feedback
                type="invalid"
                style={{ fontSize: "1.2rem" }}
              >
                {"O campo deve ser preenchido!"}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="billInputValue">
            <Form.Label>Valor*</Form.Label>
            <Form.Control
              required
              isInvalid={showErro && isInvalid.amount}
              isValid={showErro && isValid.amount}
              type="number"
              placeholder="Digite o valor"
              name="amount"
              value={inputForms.amount}
              onChange={(e) => {
                setInputForms({ ...inputForms, amount: e.target.value });
                setToggle(!toggle);
              }}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{ fontSize: "1.2rem" }}
            >
              {amountMessage}
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
                setInputForms({ ...inputForms, status: e.target.value })
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
                setInputForms({ ...inputForms, status: e.target.value })
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
  );
}

export default BillForm;

import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { Form } from "react-bootstrap";

export function ViaCep(props) {
  const [cepLength, setCepLength] = useState(0);

  useEffect(() => {
    if (props.errors.zipcode !== "CEP inválido") {
      onCepChange();
    }
  }, [props.errors.zipcode]);

  async function onCepChange() {
    try {
      const formatedZipcode = props.value.zipcode?.replace(/[^\d]/g, "");

      if (formatedZipcode?.length === 8) {
        const initialValues = {
          address: "",
          complement: "",
          district: "",
          city: "",
          state: "",
        };
        props.setValues({ ...props.value, ...initialValues });
        setCepLength(formatedZipcode.length);
        const response = await fetch(
          `https://viacep.com.br/ws/${formatedZipcode}/json/`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.erro) {
          const erro = { zipcode: "CEP inválido" };
          props.setErrors({ ...props.errors, ...erro });

          return;
        }

        const fullAddress = {
          address: data.logradouro,
          complement: data.complemento,
          district: data.bairro,
          city: data.localidade,
          state: data.uf,
        };
        props.setValues({ ...props.value, ...fullAddress });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <InputMask
      mask="99999-999"
      value={props.value.zipcode}
      onChange={props.onChange}
    >
      {(inputProps) => (
        <Form.Control
          type="text"
          placeholder="Digite o CEP do cliente"
          name="zipcode"
          isInvalid={cepLength === 8 && props.errors.zipcode}
          isValid={cepLength === 8 && !props.errors?.zipcode}
        ></Form.Control>
      )}
    </InputMask>
  );
}

export function MaskedPhone(props) {
  return (
    <InputMask
      mask="(99) 99999-9999"
      value={props.value.phone}
      onChange={props.onChange}
    >
      {(inputProps) => (
        <Form.Control
          type="text"
          placeholder="Digite o telefone"
          name="phone"
          isInvalid={props.touched.phone && !!props.errors.phone}
          isValid={props.touched.phone && !props.errors.phone}
        />
      )}
    </InputMask>
  );
}

export function MaskedCPF(props) {
  return (
    <InputMask
      mask="999.999.999-99"
      value={props.value.cpf}
      onChange={props.onChange}
    >
      {(inputProps) => (
        <Form.Control
          type="text"
          placeholder="Digite o CPF"
          name="cpf"
          isInvalid={props.touched.cpf && !!props.errors.cpf}
          isValid={props.touched.cpf && !props.errors.cpf}
        />
      )}
    </InputMask>
  );
}

import React, { useState, useCallback } from "react";
import { Container, Form, SubmitButton } from "./styles";
import { FaGithub, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";

export default function Home() {
  const [newRepo, setNewRepo] = useState("facebook/react");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        try {
          const response = await api.get(`repos/${newRepo}`);

          const data = {
            name: response.data.full_name,
          };

          setRepositories([...repositories, data]);
          setNewRepo("");
        } catch (err) {
          alert(err.message + " Repositorio Invalido");
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

  function handleOnChange(e) {
    setNewRepo(e.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleOnChange}
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}

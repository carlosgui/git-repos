import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import api from "../../services/api";

export default function Home() {
  const [newRepo, setNewRepo] = useState("facebook/react");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Get my repos at storage
  useEffect(() => {
    const reposStoraged = localStorage.getItem("repos");
    if (reposStoraged) {
      setRepositories(JSON.parse(reposStoraged));
    }
  }, []);

  // Save my repos at storage
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositories));
  }, [repositories]);

  const handleOnSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setError(false);

        try {
          if (newRepo === "")
            throw new Error("O Campo de busca não pode estar vazio");

          const duplicatedRepo = repositories.find((r) => r.name === newRepo);
          if (duplicatedRepo)
            throw new Error("O Repositório já foi adicionado na lista");

          // const response = await api.get(`repos/${newRepo}`);
          // const data = {
          //   name: response.data.full_name,
          // };
          const data = {
            name: newRepo,
          };

          setRepositories([...repositories, data]);
          setNewRepo("");
        } catch ({ message, request }) {
          let status = "";
          if (request) status = request.status;
          setError(true);

          if (status === 404) setErrorMessage("Repositório não encontrado");
          else setErrorMessage(message);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositories]
  );

  const onDeleteClicked = useCallback(
    (repoName) => {
      const result = repositories.filter((r) => r.name !== repoName);
      setRepositories(result);
    },
    [repositories]
  );

  function handleOnChange(e) {
    setNewRepo(e.target.value);
    setError(false);
    setErrorMessage("");
  }

  return (
    <Container error={error}>
      <h1>
        <FaGithub size={25} />
        Meus Repositorios
      </h1>

      <Form onSubmit={handleOnSubmit} error={error}>
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
      <span>{errorMessage}</span>

      <List>
        {repositories.map((value, index) => (
          <li key={index}>
            <span>
              <DeleteButton onClick={() => onDeleteClicked(value.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {value.name}
            </span>
            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  );
}

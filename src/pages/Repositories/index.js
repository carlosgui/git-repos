import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BackButton,
  Container,
  Loading,
  Owner,
  IssuesList,
  PaginationContainer,
} from "./styles";

import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositories() {
  const { repo } = useParams();
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [disableBack, setDisableBack] = useState(true);
  const loadingText = ["C", "A", "R", "R", "E", "G", "A", "N", "D", "O"];

  useEffect(() => {
    async function load() {
      // await setTimeout(async () => {
      const [repositorieData, issuesData] = await Promise.all([
        api.get(`/repos/${repo}`),
        api.get(`/repos/${repo}/issues`, {
          params: { state: "open", per_page: 5 },
        }),
      ]);
      setRepository(repositorieData.data);
      setIssues(issuesData.data);
      setLoading(false);
      // }, 1200);
    }

    load();
  }, [repo]);

  useEffect(() => {
    async function loadPageContent() {
      const { data } = await api.get(`/repos/${repo}/issues`, {
        params: {
          state: "open",
          per_page: 5,
          page,
          "User-Agent": "git-repos",
        },
      });
      setIssues(data);
    }

    loadPageContent();
  }, [page]);

  const handlePaginationButtons = (isBack) => {
    page >= 2 ? setDisableBack(false) : setDisableBack(true);
    if (isBack && page >= 2) {
      setPage(page - 1);
    }

    setPage(page + 1);
  };

  if (loading) {
    return (
      <>
        <Loading>
          <div className="text">
            {loadingText.map((l, index) => (
              <span key={index} style={{ "--i": index }}>
                {l}
              </span>
            ))}
          </div>
        </Loading>
      </>
    );
  }

  return (
    <div>
      <Container>
        <BackButton to="/">
          <FaArrowLeft color="#0d2636" size={20} />
        </BackButton>
        <Owner>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssuesList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                </strong>
                <div>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </div>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
        <PaginationContainer>
          <button
            onClick={() => handlePaginationButtons(true)}
            disabled={disableBack}
          >
            Anterior
          </button>
          <button onClick={() => handlePaginationButtons(false)}>
            Proxima
          </button>
        </PaginationContainer>
      </Container>
    </div>
  );
}

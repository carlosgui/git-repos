import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BackButton,
  Container,
  Loading,
  Owner,
  IssuesList,
  PaginationContainer,
  FilterButtons,
} from "./styles";

import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositories() {
  const { repo } = useParams();
  const [filters] = useState([
    { state: "all", label: "Todas", active: true },
    { state: "open", label: "Abertas", active: false },
    { state: "closed", label: "Fechadas", active: false },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loadingText = ["C", "A", "R", "R", "E", "G", "A", "N", "D", "O"];

  useEffect(() => {
    async function load() {
      const [repositorieData, issuesData] = await Promise.all([
        api.get(`/repos/${repo}`),
        api.get(`/repos/${repo}/issues`, {
          params: { state: "all", per_page: 5 },
        }),
      ]);
      setRepository(repositorieData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, [repo]);

  useEffect(() => {
    async function loadPageContent() {
      const { data } = await api.get(`/repos/${repo}/issues`, {
        params: {
          state: filters[filterIndex].state,
          per_page: 5,
          page,
          "User-Agent": "git-repos",
        },
      });
      setIssues(data);
    }

    loadPageContent();
  }, [page, repo, filters, filterIndex]);

  const handlePaginationButtons = (isBack) => {
    if (isBack && page >= 2) {
      setPage(page - 1);
    }

    setPage(page + 1);
  };

  const handleFilter = (index) => {
    setFilterIndex(index);
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

        <FilterButtons active={filterIndex}>
          {filters.map((filter, index) => (
            <button key={index} onClick={() => handleFilter(index)}>
              {filter.label}
            </button>
          ))}
        </FilterButtons>

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
            disabled={page < 2}
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

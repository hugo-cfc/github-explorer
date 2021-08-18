import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  /* eslint-disable-next-line camelcase */
  full_name: string;
  description: string;
  /* eslint-disable-next-line camelcase */
  stargazers_count: number;
  /* eslint-disable-next-line camelcase */
  forks_count: number;
  /* eslint-disable-next-line camelcase */
  open_issues_count: number;
  owner: {
    login: string;
    /* eslint-disable-next-line camelcase */
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  /* eslint-disable-next-line camelcase */
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then((res) => {
      setRepository(res.data);
    });

    api.get(`repos/${params.repository}/issues`).then((res) => {
      setIssues(res.data);
    });

    // async function loadData(): Promise<void> {
    //   const repository = await api.get(`repos/${params.repository}`);
    //   const issues = await api.get(`repos/${params.repository}/issues`);

    //   console.log(repository);
    //   console.log(issues);
    // }

    // async function loadData(): Promise<void> {
    //   const [repository, issues] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`),
    //   ]);

    //   console.log(repository);
    //   console.log(issues);
    // }
  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} /> Voltar
        </Link>
      </Header>

      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map((item) => (
          <a key={item.id} href={item.html_url}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPopularNews,
  loadNextPage,
  selectLanguage,
  selectNews,
} from "./newsSlice";
import { News } from "./news";
import { Search } from "./searchBar";

import { Container, Row, Alert } from "react-bootstrap";

export function NewsList() {
  const news = useAppSelector(selectNews);
  const language = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPopularNews({ language: language, page: 1 }));
  }, [dispatch, language]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    dispatch(loadNextPage());
  }

//   if failed to load news, show error message in Alert

  if (news.status === "failed") {
    return (
      <Container>
        <Search />
        <Row>
          <Alert variant="danger">
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>{news.error}</p>
          </Alert>
        </Row>
      </Container>
    );
  }

//   if news is loaded and there is no error, show news list

  return (
    <Container>
      <Search />
      <Row>
        {news.articles.map((article, index) => (
          <News
            key={index}
            source={article.source}
            author={article.author}
            title={article.title}
            description={article.description}
            url={article.url}
            urlToImage={article.urlToImage}
            publishedAt={article.publishedAt}
          />
        ))}
      </Row>
    </Container>
  );
}

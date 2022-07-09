import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchPopularNews,
  loadNextPage,
  selectLanguage,
  selectNews,
} from "./newsSlice";
import { News } from "./news";
import { Container, Row, Alert, Col } from "react-bootstrap";

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

  if (news.status === "failed") {
    return (
      <Row>
        <Alert variant="danger">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{news.error}</p>
        </Alert>
      </Row>
    );
  }

  return (
    <Container>
      <Row>
          {news.articles.map((article, index) => (
              <News
                source={article.source}
                author={article.author}
                title={article.title}
                description={article.description}
                url={article.url}
                urlToImage={article.urlToImage}
                publishedAt={article.publishedAt}
              />
          ))}
        {/* {news.status === 'loading' &&
                // CustomLoading('news')
            } */}
      </Row>
    </Container>
  );
}

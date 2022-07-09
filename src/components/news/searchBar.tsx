import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  clearNews,
  clearQuery,
  fetchNewsQuery,
  fetchPopularNews,
  setLanguageState,
  setQueryState,
} from "./newsSlice";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { IoSearchCircle,IoCloseCircle } from "react-icons/io5";

const languages = [
  {
    value: "ar",
    label: "Arabic",
  },
  {
    value: "en",
    label: "English",
  },
];

export function Search() {
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en");

  const dispatch = useAppDispatch();

  function handleSearch() {
    dispatch(clearNews());
    dispatch(
      fetchNewsQuery({
        query: query,
        language: language,
        page: 1,
      })
    );
  }

  function handleTyping(val: string) {
    setQuery(val);
    dispatch(setQueryState(val));
    // handleSearch();
  }

  function handleCancel() {
    setOpenSearch(false);
    dispatch(clearNews());
    dispatch(clearQuery());
    dispatch(fetchPopularNews({ language: language, page: 1 }));
  }

  const handleSelectLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    dispatch(setLanguageState(event.target.value));
    dispatch(clearNews());
    dispatch(fetchPopularNews({ language: event.target.value, page: 1 }));
  };

  return (
    <Container className="my-5">
      <Row>
        <Form.Group as={Col} xl={8} md={8} sm={8} className="mb-3">
          <Form.Control
            type="text"
            id="search"
            placeholder="Type here to Search ..."
            aria-describedby="passwordHelpBlock"
            name="query"
            onChange={(e) => handleTyping(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col} xl={2} md={2} sm={2} className="mb-3">
          <Form.Select
            name="language"
            defaultValue={language}
            aria-label="Default select example"
            onChange={handleSelectLanguage}
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} xl={1} md={1} sm={1}>
          <Button
            variant="outline-primary"
            type="button"
            value="Search"
            onClick={handleSearch}
          >
            <IoSearchCircle style={{ fontSize: 30 }} />
          </Button>
        </Form.Group>

        <Form.Group as={Col} xl={1} md={1} sm={1}>
          <Button
            variant="outline-danger"
            type="button"
            value="Search"
            onClick={handleCancel}
          >
            <IoCloseCircle style={{ fontSize: 30 }} />
          </Button>
        </Form.Group>

      </Row>
    </Container>
  );
}

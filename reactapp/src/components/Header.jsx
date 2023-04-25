import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../_store';

import { useTranslation } from "react-i18next";
import * as React from 'react';

export default function Header() {
    const { t, i18n } = useTranslation();
    const authUser = useSelector(x => x.auth.user);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    // only show nav when logged in
    const _showAdminLinks = () => {
        return <React.Suspense>
            <LinkContainer to="Admin/News">
                <Nav.Link>{t("newsLink")}</Nav.Link>
            </LinkContainer>
        </React.Suspense>
    }
    const _showUserLinks = () => {
        return <React.Suspense>
            <LinkContainer to="/">
                <Nav.Link>{t("homeLink")}</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/News">
                <Nav.Link>{t("newsLink")}</Nav.Link>
            </LinkContainer>
        </React.Suspense>
    }
    const _showAuthLink = () => {
        if (!authUser) {
            return <LinkContainer to="/login">
                <Nav.Link>{t("login")}</Nav.Link>
            </LinkContainer>
        }
        else {
            return <Nav.Link onClick={logout}>
                {t("logout")}
            </Nav.Link>
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <LinkContainer to={authUser ? "/Admin" : "/"}>
                    <Navbar.Brand>Test-Task</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {authUser ? _showAdminLinks() : _showUserLinks()}
                    </Nav>
                    <Nav>
                        <NavDropdown title={t("languageLink")} id="navbarScrollingDropdown">
                            <NavDropdown.Item onClick={() => changeLanguage("en")}>
                                English
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => changeLanguage("ru")}>
                                Русский
                            </NavDropdown.Item>
                        </NavDropdown>
                        {_showAuthLink()}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
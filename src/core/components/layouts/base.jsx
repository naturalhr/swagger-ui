import React from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/styles/prism";
import { php } from "react-syntax-highlighter/languages/prism";
import classNames from "classnames";

export default class BaseLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      examplesOpen: false,
      getExampleOpen: false,
      putExampleOpen: false,
      postExampleOpen: false,
      deleteExampleOpen: false,
      getExampleLanguage: "php",
      putExampleLanguage: "php",
      postExampleLanguage: "php",
      deleteExampleLanguage: "php"
    };
    this.toggleExamples = this.toggleExamples.bind(this);
    this.toggleExampleRoute = this.toggleExampleRoute.bind(this);
    this.handleNavBarItemClick = this.handleNavBarItemClick.bind(this);
  }

  static propTypes = {
    errSelectors: PropTypes.object.isRequired,
    errActions: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired,
    oas3Selectors: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired
  };

  toggleExamples() {
    this.setState({
      examplesOpen: !this.state.examplesOpen
    });
  }

  toggleExampleRoute(method) {
    this.setState({
      [`${method}ExampleOpen`]: !this.state[`${method}ExampleOpen`]
    });
  }

  handleNavBarItemClick(method, language) {
    this.setState({
      [`${method}ExampleLanguage`]: language
    });
  }

  renderExamples() {
    let arrow = this.state.examplesOpen ? "#large-arrow-down" : "#large-arrow";
    return (
      <div
        className={`route_block${
          this.state.examplesOpen ? " route_block--open" : ""
        }`}
      >
        <h4 className="route_block_header" onClick={this.toggleExamples}>
          <div>Code Examples</div>
          <svg class="arrow" width="20" height="20">
            <use href={arrow} href={arrow} />
          </svg>
        </h4>
        {this.state.examplesOpen && (
          <div className="routes">
            {this.renderRoute("get")}
            {this.renderRoute("put")}
            {this.renderRoute("post")}
            {this.renderRoute("delete")}
          </div>
        )}
      </div>
    );
  }

  renderRoute(method) {
    let arrow = this.state[`${method}ExampleOpen`]
      ? "#large-arrow-down"
      : "#large-arrow";

    let routeItemPhpClasses = classNames({
      route_navbar_item: true,
      [`route_navbar_item--${method}`]: true,
      ["route_navbar_item--open"]:
        this.state[`${method}ExampleLanguage`] == "php"
    });

    let routeItemJsClasses = classNames({
      route_navbar_item: true,
      [`route_navbar_item--${method}`]: true,
      ["route_navbar_item--open"]:
        this.state[`${method}ExampleLanguage`] == "js"
    });

    return (
      <div className="route">
        <div
          className={`route_info route_info--${method}${
            this.state[`${method}ExampleOpen`] ? " route_info--open" : ""
          }`}
          onClick={() => {
            this.toggleExampleRoute(method);
          }}
        >
          <div className={`route_info_method route_info_method--${method}`}>
            {method.toUpperCase()}
          </div>
          <svg class="arrow" width="10" height="10">
            <use href={arrow} href={arrow} />
          </svg>
        </div>
        {this.state[`${method}ExampleOpen`] && (
          <div className={`route_body route_body--${method}`}>
            <div className="route_navbar">
              <div
                className={routeItemPhpClasses}
                onClick={() => {
                  this.handleNavBarItemClick(method, "php");
                }}
              >
                Php
              </div>
              <div
                className={routeItemJsClasses}
                onClick={() => {
                  this.handleNavBarItemClick(method, "js");
                }}
              >
                JavaScript
              </div>
            </div>
            <SyntaxHighlighter
              language={php}
              style={darcula}
              showLineNumbers
              wrapLines
            >
              {`<?php echo 'test';
                    echo 'test2';
                ?>`}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    );
  }

  render() {
    let { specSelectors, getComponent } = this.props;

    let SvgAssets = getComponent("SvgAssets");
    let InfoContainer = getComponent("InfoContainer", true);
    let VersionPragmaFilter = getComponent("VersionPragmaFilter");
    let Operations = getComponent("operations", true);
    let Models = getComponent("Models", true);
    let Row = getComponent("Row");
    let Col = getComponent("Col");
    let Errors = getComponent("errors", true);

    const ServersContainer = getComponent("ServersContainer", true);
    const SchemesContainer = getComponent("SchemesContainer", true);
    const AuthorizeBtnContainer = getComponent("AuthorizeBtnContainer", true);
    const FilterContainer = getComponent("FilterContainer", true);
    let isSwagger2 = specSelectors.isSwagger2();
    let isOAS3 = specSelectors.isOAS3();

    const isSpecEmpty = !specSelectors.specStr();

    if (isSpecEmpty) {
      let loadingMessage;
      let isLoading = specSelectors.loadingStatus() === "loading";
      if (isLoading) {
        loadingMessage = <div className="loading" />;
      } else {
        loadingMessage = <h4>No API definition provided.</h4>;
      }

      return (
        <div className="swagger-ui">
          <div className="loading-container">{loadingMessage}</div>
        </div>
      );
    }

    const servers = specSelectors.servers();
    const schemes = specSelectors.schemes();

    const hasServers = servers && servers.size;
    const hasSchemes = schemes && schemes.size;
    const hasSecurityDefinitions = !!specSelectors.securityDefinitions();

    return (
      <div className="swagger-ui">
        <SvgAssets />
        <VersionPragmaFilter
          isSwagger2={isSwagger2}
          isOAS3={isOAS3}
          alsoShow={<Errors />}
        >
          <Errors />
          <Row className="information-container">
            <Col mobile={12}>
              <InfoContainer />
            </Col>
            <Col mobile={12}>{this.renderExamples()}</Col>
          </Row>
          {hasServers || hasSchemes || hasSecurityDefinitions ? (
            <div className="scheme-container">
              <Col className="schemes wrapper" mobile={12}>
                {hasServers ? <ServersContainer /> : null}
                {hasSchemes ? <SchemesContainer /> : null}
                {hasSecurityDefinitions ? <AuthorizeBtnContainer /> : null}
              </Col>
            </div>
          ) : null}

          <FilterContainer />

          <Row>
            <Col mobile={12} desktop={12}>
              <Operations />
            </Col>
          </Row>
          <Row>
            <Col mobile={12} desktop={12}>
              <Models />
            </Col>
          </Row>
        </VersionPragmaFilter>
      </div>
    );
  }
}

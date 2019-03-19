import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/styles/prism";
import classNames from "classnames";

import Expand from "./expand.svg";
import Retract from "./retract.svg";

export default class BaseLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      examplesOpen: true,
      filtersOpen: true,
      getExampleOpen: false,
      putExampleOpen: false,
      postExampleOpen: false,
      deleteExampleOpen: false,
      getExampleLanguage: "php",
      putExampleLanguage: "php",
      postExampleLanguage: "php",
      deleteExampleLanguage: "php",
      getExampleCodeExpanded: false,
      putExampleCodeExpanded: false,
      postExampleCodeExpanded: false,
      deleteExampleCodeExpanded: false,
      activeInfoTab: "operations"
    };
    this.toggleExamples = this.toggleExamples.bind(this);
    this.toggleFilters = this.toggleFilters.bind(this);
    this.toggleExampleRoute = this.toggleExampleRoute.bind(this);
    this.handleNavBarItemClick = this.handleNavBarItemClick.bind(this);
    this.handleInfoNavBarItemClick = this.handleInfoNavBarItemClick.bind(this);
    this.handleExpandClick = this.handleExpandClick.bind(this);

    this.getCodephp =
`<?php
    // initialise curl and set it to a variable
    $curl = curl_init();

    // set the curl URL
    curl_setopt($curl, CURLOPT_URL, https://api02.naturalhr.net/employee/{employee_id});

    // set the curl headers
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: 111111111111111111111',
        'Content-Type: application/json',
    ));

    // if the curl request fails then it will return FALSE, however it will not return TRUE on success
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    // set the authentication method
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    // execute the curl request
    $result = curl_exec($curl);

    // if the curl request fails then die with a message
    if(!$result) {
        die("Connection Failure");
    }

    // close the curl instance
    curl_close($curl);

    // return the result
    return $result;
?>`
this.getCodejs = `this.doItLater`;

this.putCodephp =
`<?php
    // data to be sent in the curl request
    $data = array(
        "comments" => "Update the timeoff comments"
    );

    // initialise curl and set it to a variable
    $curl = curl_init();

    // set the curl method to PUT
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");

    // set the curl data
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

    // set the curl URL
    curl_setopt($curl, CURLOPT_URL, https://api02.naturalhr.net/timeoff/{timeoff_id}/update);

    // set the curl headers
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: 111111111111111111111',
        'Content-Type: application/json',
    ));

    // if the curl request fails then it will return FALSE, however it will not return TRUE on success
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    // set the authentication method
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    // execute the curl request
    $result = curl_exec($curl);

    // if the curl request fails then die with a message
    if(!$result) {
        die("Connection Failure");
    }

    // close the curl instance
    curl_close($curl);

    // return the result
    return $result;
?>`

this.putCodejs = `this.doItLater`;

this.postCodephp =
`<?php
    // data to be sent in the curl request
    $data = array(
        "id" => 24,
        "employee_id" => 3,
        "manager_id" => 1,
        "emp_fname" => "Luke",
        "emp_lname" => "Skywalker",
        "time_off_type" => "???",
        "time_off_type_id" => "???",
        "start_date" => "2018-10-05",
        "end_date" => "2018-10-08",
        "days" => 2.5,
        "balance" => "12.5",
        "datestamp" => "2018-10-01",
        "comments" => "time off for a short holiday",
        "approved" => "??? is this 1 or 0 ?"
        "mgr_comments" => "Going on a trip away to Prague",
        "rtw" => "???"
    );

    // initialise curl and set it to a variable
    $curl = curl_init();

    // set the curl method to POST
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");

    // set the curl data
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

    // set the curl URL
    curl_setopt($curl, CURLOPT_URL, https://api02.naturalhr.net/timeoff);

    // set the curl headers
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: 111111111111111111111',
        'Content-Type: application/json',
    ));

    // if the curl request fails then it will return FALSE, however it will not return TRUE on success
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    // set the authentication method
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    // execute the curl request
    $result = curl_exec($curl);

    // if the curl request fails then die with a message
    if(!$result) {
        die("Connection Failure");
    }

    // close the curl instance
    curl_close($curl);

    // return the result
    return $result;
?>`
this.postCodejs = `this.doItLater`;

this.deleteCodephp =
`<?php
    // initialise curl and set it to a variable
    $curl = curl_init();

    // set the curl method to POST
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");

    // set the curl URL
    curl_setopt($curl, CURLOPT_URL, https://api02.naturalhr.net/timeoff/{timeoff_id}/delete);

    // set the curl headers
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Authorization: 111111111111111111111',
        'Content-Type: application/json',
    ));

    // if the curl request fails then it will return FALSE, however it will not return TRUE on success
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

    // set the authentication method
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    // execute the curl request
    $result = curl_exec($curl);

    // if the curl request fails then die with a message
    if(!$result) {
        die("Connection Failure");
    }

    // close the curl instance
    curl_close($curl);

    // return the result
    return $result;
?>`
this.deleteCodejs = `this.doItLater`;
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

  toggleFilters() {
    this.setState({
      filtersOpen: !this.state.filtersOpen
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

  handleExpandClick(method) {
      this.setState({
          [`${method}ExampleCodeExpanded`]: !this.state[`${method}ExampleCodeExpanded`]
      })
  }

  renderCodeExamples() {
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


    let codeWrapperClasses = classNames({
        code_wrapper: true,
        ["code_wrapper--retracted"]: this.state[`${method}ExampleCodeExpanded`] === false,
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
              <img
                className="toggle_expand"
                src={this.state[`${method}ExampleCodeExpanded`] === false ? Expand : Retract}
                onClick={() => {this.handleExpandClick(method)}}
              />
            </div>
            <div className={codeWrapperClasses}>
                <SyntaxHighlighter
                  language="php"
                  style={darcula}
                  showLineNumbers
                  wrapLines
                >
                  {this[`${method}Code${this.state[`${method}ExampleLanguage`]}`]}
                </SyntaxHighlighter>
            </div>
          </div>
        )}
      </div>
    );
  }

  handleInfoNavBarItemClick(tab) {
    this.setState({
      activeInfoTab: tab
    });
  }

  renderFiltersInfo() {
    let arrow = this.state.filtersOpen ? "#large-arrow-down" : "#large-arrow";
    return (
      <div
        className={`route_block${
          this.state.filtersOpen ? " route_block--open" : ""
        }`}
      >
        <h4 className="route_block_header" onClick={this.toggleFilters}>
          <div>How to use filters</div>
          <svg class="arrow" width="20" height="20">
            <use href={arrow} href={arrow} />
          </svg>
        </h4>
        {this.state.filtersOpen && (
          <div className="filters_body">
            <div className="info_header">Available query parameters</div>
            <div className="info_section">
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Includes</td>
                    <td>array</td>
                    <td>
                      Array of related resources to load, e.g. ['employee',
                      'timeoff']
                    </td>
                  </tr>
                  <tr>
                    <td>Sort</td>
                    <td>array</td>
                    <td>Property to sort by, e.g. 'title'</td>
                  </tr>
                  <tr>
                    <td>Limit</td>
                    <td>integer </td>
                    <td>Limit of resources to return</td>
                  </tr>
                  <tr>
                    <td>Page</td>
                    <td>integer </td>
                    <td>For use with limit</td>
                  </tr>
                  <tr>
                    <td>Filter_groups</td>
                    <td>array</td>
                    <td>Array of filter groups. See below for syntax.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="info_header">Pagination</div>
            <div className="info_section">
              Two parameters are available: limit and page. <br /> Limit will determine
              the number of records per page and page will determine the current
              page. <br /><br />
              <SyntaxHighlighter
                language="php"
                style={darcula}
                wrapLines>/employee?limit=10&page=3
              </SyntaxHighlighter>
              <br />
              Will return employees number 30-40.
            </div>
            <div className="info_header">Sorting</div>
            <div className="info_section">
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>key</td>
                    <td>string</td>
                    <td>The property of the model to sort by</td>
                  </tr>
                  <tr>
                    <td>direction</td>
                    <td>ASC or DESC</td>
                    <td>Which direction to sort the property by</td>
                  </tr>
                </tbody>
              </table>
              <div className="info_subheader">Example</div>
              <SyntaxHighlighter
                  language="php"
                  style={darcula}
                  wrapLines
              >
{`[
    {
      "key": "title",
      "direction": "ASC"
    },
    {
      "key": "year",
      "direction": "DESC"
    }
  ]`}
              </SyntaxHighlighter>
              <br />
              Will result in the books being sorted by title in ascending order and then year in descending order.
            </div>
            <div className="info_header">Filters</div>
            <div className="info_section">
              Should be defined as an array of filter groups.

              <div className="info_subheader">Filter Groups</div>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>or</td>
                    <td>boolean</td>
                    <td>
                      Should the filters in this group be grouped by logical OR or AND operator
                    </td>
                  </tr>
                  <tr>
                    <td>filters</td>
                    <td>array</td>
                    <td>Array of filters (see syntax below)</td>
                  </tr>
                </tbody>
              </table>

              <div className="info_subheader">Filters</div>
              <table>
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Value type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>key</td>
                    <td>string</td>
                    <td>
                      The property of the model to filter by (can also be custom filter)
                    </td>
                  </tr>
                  <tr>
                    <td>value</td>
                    <td>mixed</td>
                    <td>The value to search for</td>
                  </tr>
                  <tr>
                    <td>operator</td>
                    <td>string</td>
                    <td>The filter operator to use (see different types below)</td>
                  </tr>
                  <tr>
                    <td>not</td>
                    <td>boolean</td>
                    <td>Negate the filter</td>
                  </tr>
                </tbody>
              </table>

              <div className="info_subheader">Operators</div>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ct</td>
                    <td>String contains</td>
                    <td>
                      ior matches Giordano Bruno and Giovanni
                    </td>
                  </tr>
                  <tr>
                    <td>sw</td>
                    <td>Starts with</td>
                    <td>Gior matches Giordano Bruno but not Giovanni</td>
                  </tr>
                  <tr>
                    <td>ew</td>
                    <td>Ends with</td>
                    <td>uno matches Giordano Bruno but not Giovanni</td>
                  </tr>
                  <tr>
                    <td>eq</td>
                    <td>Equals</td>
                    <td>Giordano Bruno matches Giordano Bruno but not Bruno</td>
                  </tr>
                  <tr>
                    <td>gt</td>
                    <td>Greater than</td>
                    <td>1548 matches 1600 but not 1400</td>
                  </tr>
                  <tr>
                    <td>gte</td>
                    <td>Greater than or equalTo	</td>
                    <td>1548 matches 1548 and above</td>
                  </tr>
                  <tr>
                    <td>lte</td>
                    <td>Lesser than or equalTo</td>
                    <td>1600 matches 1600 and below</td>
                  </tr>
                  <tr>
                    <td>lt</td>
                    <td>Lesser than</td>
                    <td>1600 matches 1548 but not 1700</td>
                  </tr>
                  <tr>
                    <td>in</td>
                    <td>In array</td>
                    <td>['Giordano', 'Bruno'] matches Giordano and Bruno but not Giovanni</td>
                  </tr>
                  <tr>
                    <td>bt</td>
                    <td>Between</td>
                    <td>[1, 10] matches 5 and 7 but not 11</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }

  renderOperations() {
      let { getComponent } = this.props;
      let Operations = getComponent("operations", true);
      let Row = getComponent("Row");
      let Col = getComponent("Col");

      return (
          <Row className="information-container">
            <Col mobile={12}>
              <Operations />
            </Col>
          </Row>
      )
  }

  renderInfoBody() {
    let jsx = [];
    switch (this.state.activeInfoTab) {
      case "codeExamples":
        jsx = this.renderCodeExamples();
        break;
      // case "filters":
      //   jsx = this.renderFiltersInfo();
      //   break;
      case "models":
        let { getComponent } = this.props;
        let Models = getComponent("Models", true);
        jsx = <Models />;
        break;
      default:
        jsx = this.renderOperations();
    }
    return <div className="info_body">{jsx}</div>;
  }

  renderInfo() {
    return (
      <div className="info">
        <div className="info_nav">
          <div
            className={`info_nav_item${
              this.state.activeInfoTab == "operations"
                ? " info_nav_item--active"
                : ""
            }`}
            onClick={() => this.handleInfoNavBarItemClick("operations")}
          >
            Operations
          </div>
          <div
            className={`info_nav_item${
              this.state.activeInfoTab == "codeExamples"
                ? " info_nav_item--active"
                : ""
            }`}
            onClick={() => this.handleInfoNavBarItemClick("codeExamples")}
          >
            Code Examples
          </div>
          <div
            className={`info_nav_item${
              this.state.activeInfoTab == "models"
                ? " info_nav_item--active"
                : ""
            }`}
            onClick={() => this.handleInfoNavBarItemClick("models")}
          >
            Models
          </div>
        </div>
        {this.renderInfoBody()}
      </div>
    );
  }


  // <div
  //   className={`info_nav_item${
  //     this.state.activeInfoTab == "filters"
  //       ? " info_nav_item--active"
  //       : ""
  //   }`}
  //   onClick={() => this.handleInfoNavBarItemClick("filters")}
  // >
  //   How to use filters
  // </div>

  render() {
    let { specSelectors, getComponent } = this.props;

    let SvgAssets = getComponent("SvgAssets");
    let InfoContainer = getComponent("InfoContainer", true);
    let VersionPragmaFilter = getComponent("VersionPragmaFilter");
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
    let Operations = getComponent("operations", true);

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
            <Col mobile={12}>
                {hasServers || hasSchemes || hasSecurityDefinitions ? (
                    <div className="scheme-container">
                    <Col className="schemes wrapper" mobile={12}>
                    {hasServers ? <ServersContainer /> : null}
                    {hasSchemes ? <SchemesContainer /> : null}
                    {hasSecurityDefinitions ? <AuthorizeBtnContainer /> : null}
                    </Col>
                    </div>
                ) : null}
            </Col>
            <Col mobile={12}>{this.renderInfo()}</Col>
          </Row>
          <FilterContainer />
        </VersionPragmaFilter>
      </div>
    );
  }
}

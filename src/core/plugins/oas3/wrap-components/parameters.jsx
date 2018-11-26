import React, { Component } from "react";
import PropTypes from "prop-types";
import Im, { Map, List } from "immutable";
import ImPropTypes from "react-immutable-proptypes";
import { OAS3ComponentWrapFactory } from "../helpers";

// More readable, just iterate over maps, only
const eachMap = (iterable, fn) =>
  iterable
    .valueSeq()
    .filter(Im.Map.isMap)
    .map(fn);

class Parameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersVisible: false,
      callbackVisible: false,
      parametersVisible: true
    };
  }

  static propTypes = {
    parameters: ImPropTypes.list.isRequired,
    specActions: PropTypes.object.isRequired,
    operation: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    getConfigs: PropTypes.func.isRequired,
    specSelectors: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    oas3Selectors: PropTypes.object.isRequired,
    fn: PropTypes.object.isRequired,
    tryItOutEnabled: PropTypes.bool,
    allowTryItOut: PropTypes.bool,
    specPath: ImPropTypes.list.isRequired,
    onTryoutClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onChangeKey: PropTypes.array,
    pathMethod: PropTypes.array.isRequired
  };

  static defaultProps = {
    onTryoutClick: Function.prototype,
    onCancelClick: Function.prototype,
    tryItOutEnabled: false,
    allowTryItOut: true,
    onChangeKey: []
  };

  onChange = (param, value, isXml) => {
    let {
      specActions: { changeParamByIdentity },
      onChangeKey
    } = this.props;

    changeParamByIdentity(onChangeKey, param, value, isXml);
  };

  onChangeConsumesWrapper = val => {
    let {
      specActions: { changeConsumesValue },
      onChangeKey
    } = this.props;

    changeConsumesValue(onChangeKey, val);
  };

  toggleTab = tab => {
    if (tab === "parameters") {
      return this.setState({
        parametersVisible: true,
        callbackVisible: false,
        filtersVisible: false
      });
    } else if (tab === "filters") {
      return this.setState({
        callbackVisible: false,
        parametersVisible: false,
        filtersVisible: true
      });
    } else if (tab === "callbacks") {
      return this.setState({
        callbackVisible: true,
        parametersVisible: false,
        filtersVisible: false
      });
    }
  };

  renderFilters() {
    if (this.state.filtersVisible) {
      let filtersId = `${this.props.pathMethod[0]}${
        this.props.pathMethod[1]
      }Filters`;

      let filtersElement = document.getElementById(filtersId);
      let filters = filtersElement
        ? JSON.parse(filtersElement.getAttribute("data-filters"))
        : false;

      return (
        <div className="parameters-container">
          {!filters ? (
            <div className="opblock-description-wrapper">
              <p>No Filters</p>
            </div>
          ) : (
            <div className="table-container">
              {filters.map(filter => {
                return <div>{filter.name}</div>;
              })}
            </div>
          )}
        </div>
      );
    }
  }

  render() {
    let {
      onTryoutClick,
      onCancelClick,
      parameters,
      allowTryItOut,
      tryItOutEnabled,

      fn,
      getComponent,
      getConfigs,
      specSelectors,
      specActions,
      oas3Actions,
      oas3Selectors,
      pathMethod,
      specPath,
      operation
    } = this.props;

    const ParameterRow = getComponent("parameterRow");
    const TryItOutButton = getComponent("TryItOutButton");
    const ContentType = getComponent("contentType");
    const Callbacks = getComponent("Callbacks", true);
    const RequestBody = getComponent("RequestBody", true);

    const isExecute = tryItOutEnabled && allowTryItOut;
    const { isOAS3 } = specSelectors;

    const requestBody = operation.get("requestBody");
    const requestBodySpecPath = specPath.slice(0, -1).push("requestBody"); // remove the "parameters" part

    let pairedParams = [];

    let i = 0;
    let lastKey = 0;
    parameters.forEach(parameter => {
      if (i % 2 === 0) {
        pairedParams.push([parameter]);
        if (pairedParams.length > 1) lastKey++;
      } else {
        pairedParams[lastKey].push(parameter);
      }
      i++;
    });

    let paramsJsx = pairedParams.map(p => {
      let paramsInnerJsx = p.map(par => {
        return (
          <ParameterRow
            fn={fn}
            getComponent={getComponent}
            specPath={specPath.push(i)}
            getConfigs={getConfigs}
            rawParam={par}
            param={specSelectors.parameterWithMetaByIdentity(pathMethod, par)}
            key={par.get("name")}
            onChange={this.onChange}
            onChangeConsumes={this.onChangeConsumesWrapper}
            specSelectors={specSelectors}
            specActions={specActions}
            pathMethod={pathMethod}
            isExecute={isExecute}
          />
        );
      });
      return <tr className="table_row">{paramsInnerJsx}</tr>;
    });

    return (
      <div className="opblock-section">
        <div className="opblock-section-header">
          <div className="tab-header">
            <div
              onClick={() => this.toggleTab("parameters")}
              className={`tab-item ${this.state.parametersVisible && "active"}`}
            >
              <h4 className="opblock-title">
                <span>Parameters</span>
              </h4>
            </div>
            <div
              onClick={() => this.toggleTab("filters")}
              className={`tab-item ${this.state.filtersVisible && "active"}`}
            >
              <h4 className="opblock-title">
                <span>Filters</span>
              </h4>
            </div>
            {operation.get("callbacks") ? (
              <div
                onClick={() => this.toggleTab("callbacks")}
                className={`tab-item ${this.state.callbackVisible && "active"}`}
              >
                <h4 className="opblock-title">
                  <span>Callbacks</span>
                </h4>
              </div>
            ) : null}
          </div>
          {allowTryItOut ? (
            <TryItOutButton
              enabled={tryItOutEnabled}
              onCancelClick={onCancelClick}
              onTryoutClick={onTryoutClick}
            />
          ) : null}
        </div>
        {this.state.parametersVisible ? (
          <div className="parameters-container">
            {!parameters.count() ? (
              <div className="opblock-description-wrapper">
                <p>No parameters</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="parameters">
                  <thead>
                    <tr />
                  </thead>
                  <tbody>{paramsJsx}</tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          ""
        )}

        {this.renderFilters()}

        {this.state.callbackVisible ? (
          <div className="callbacks-container opblock-description-wrapper">
            <Callbacks
              callbacks={Map(operation.get("callbacks"))}
              specPath={specPath.slice(0, -1).push("callbacks")}
            />
          </div>
        ) : (
          ""
        )}
        {isOAS3() && requestBody && this.state.parametersVisible && (
          <div className="opblock-section">
            <div className="opblock-section-header">
              <h4
                className={`opblock-title parameter__name ${requestBody.get(
                  "required"
                ) && "required"}`}
              >
                Request body
              </h4>
              <label>
                <ContentType
                  value={oas3Selectors.requestContentType(...pathMethod)}
                  contentTypes={requestBody.get("content", List()).keySeq()}
                  onChange={value => {
                    oas3Actions.setRequestContentType({ value, pathMethod });
                  }}
                  className="body-param-content-type"
                />
              </label>
            </div>
            <div className="opblock-description-wrapper">
              <RequestBody
                specPath={requestBodySpecPath}
                requestBody={requestBody}
                requestBodyValue={
                  oas3Selectors.requestBodyValue(...pathMethod) || Map()
                }
                isExecute={isExecute}
                onChange={(value, path) => {
                  if (path) {
                    const lastValue = oas3Selectors.requestBodyValue(
                      ...pathMethod
                    );
                    const usableValue = Map.isMap(lastValue)
                      ? lastValue
                      : Map();
                    return oas3Actions.setRequestBodyValue({
                      pathMethod,
                      value: usableValue.setIn(path, value)
                    });
                  }
                  oas3Actions.setRequestBodyValue({ value, pathMethod });
                }}
                contentType={oas3Selectors.requestContentType(...pathMethod)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OAS3ComponentWrapFactory(Parameters);

import React, { cloneElement } from "react";
import PropTypes from "prop-types";

//import "./topbar.less"
import Logo from "./naturalhr.png";
import Logo2 from "./logo_small.png";
import { parseSearch, serializeSearch } from "../../core/utils";

export default class Topbar extends React.Component {
  static propTypes = {
    layoutActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = { url: props.specSelectors.url(), selectedIndex: 0 };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ url: nextProps.specSelectors.url() });
  }

  onUrlChange = e => {
    let {
      target: { value }
    } = e;
    this.setState({ url: value });
  };

  loadSpec = url => {
    this.props.specActions.updateUrl(url);
    this.props.specActions.download(url);
  };

  onUrlSelect = e => {
    let url = e.target.value || e.target.href;
    this.loadSpec(url);
    this.setSelectedUrl(url);
    e.preventDefault();
  };

  downloadUrl = e => {
    this.loadSpec(this.state.url);
    e.preventDefault();
  };

  setSearch = spec => {
    let search = parseSearch();
    search["urls.primaryName"] = spec.name;
    const newUrl = `${window.location.protocol}//${window.location.host}${
      window.location.pathname
    }`;
    if (window && window.history && window.history.pushState) {
      window.history.replaceState(
        null,
        "",
        `${newUrl}?${serializeSearch(search)}`
      );
    }
  };

  setSelectedUrl = selectedUrl => {
    const configs = this.props.getConfigs();
    const urls = configs.urls || [];

    if (urls && urls.length) {
      if (selectedUrl) {
        urls.forEach((spec, i) => {
          if (spec.url === selectedUrl) {
            this.setState({ selectedIndex: i });
            this.setSearch(spec);
          }
        });
      }
    }
  };

  componentDidMount() {
    const configs = this.props.getConfigs();
    const urls = configs.urls || [];

    if (urls && urls.length) {
      this.loadSpec(urls[this.state.selectedIndex].url);
      let primaryName = configs["urls.primaryName"];
      if (primaryName) {
        urls.forEach((spec, i) => {
          if (spec.name === primaryName) {
            this.setState({ selectedIndex: i });
          }
        });
      }
    }
  }

  onFilterChange = e => {
    let {
      target: { value }
    } = e;
    this.props.layoutActions.updateFilter(value);
  };

  render() {
    let { getComponent, specSelectors, getConfigs } = this.props;
    const Button = getComponent("Button");
    const Link = getComponent("Link");

    let isLoading = specSelectors.loadingStatus() === "loading";
    let isFailed = specSelectors.loadingStatus() === "failed";

    let inputStyle = {};
    if (isFailed) inputStyle.color = "red";
    if (isLoading) inputStyle.color = "#aaa";

    const { urls } = getConfigs();
    let control = [];
    let formOnSubmit = null;

    if (urls) {
      let rows = [];
      urls.forEach((link, i) => {
        rows.push(
          <option key={i} value={link.url}>
            {link.name}
          </option>
        );
      });

      control.push(
        <label className="select-label" htmlFor="select">
          <span>Select a spec</span>
          <select
            id="select"
            disabled={isLoading}
            onChange={this.onUrlSelect}
            value={urls[this.state.selectedIndex].url}
          >
            {rows}
          </select>
        </label>
      );
    }

    return (
      <div className="topbar">
        <div className="wrapper">
          <div className="topbar-wrapper">
            <Link>
              <img
                height="40"
                width="155"
                src="https://www.naturalhr.com/wp-content/uploads/2018/04/Natural-HR-logo-Aug-16-Transparent-background-LARGE.png"
              />
            </Link>
            <form className="download-url-wrapper" onSubmit={formOnSubmit}>
              {control.map((el, i) => cloneElement(el, { key: i }))}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  getConfigs: PropTypes.func.isRequired
};

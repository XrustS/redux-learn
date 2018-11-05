import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";

import { fetchUser } from "../actions";

class App extends Component {
  state = {
    text: ""
  };
  hendlerChange = e =>
    this.setState({
      text: e.target.value
    });
  render() {
    const { user, fetching, login, fetchUser } = this.props;
    const { text } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {login}
        </header>
        <section style={{ padding: "20px" }}>
          <input onChange={this.hendlerChange} placeholder="Введите логин" />
          <button onClick={() => fetchUser(text)}>Послать запрос</button>
        </section>

        <p>Здесь будет выводится информация о пользователях GitHub!</p>
        {fetching ? (
          <h4>Loading...</h4>
        ) : (
          <>
            <p>Пользователь: {user.name}</p>
            <img src={user.avatar_url} />
            <ul>
              {user.repos &&
                user.repos.map(item => {
                  return (
                    <li key={item.id}>
                      <a href={item.html_url}> {item.name}</a>
                      <span>{item.stargazers_count}</span>
                    </li>
                  );
                })}
            </ul>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = store => {
  return {
    fetching: store.fetching,
    user: store.user,
    login: store.login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchUser: login => dispatch(fetchUser(login))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

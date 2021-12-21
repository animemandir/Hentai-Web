import ons from "onsenui";
import React from "react";
import { hot } from "react-hot-loader/root";
import { Toolbar, Page, Input, Button } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import android from "./d/android";

class Login extends React.Component<{}, { username: string; password: string }> {
  private android = new android();

  public constructor(props: any) {
    super(props);
    this.state = { username: "", password: "" };
  }

  private renderToolbar() {
    return (
      <Toolbar>
        <div className="center">
          <Translate text="sign-in" />
        </div>
      </Toolbar>
    );
  }

  private handleClick = () => {
    if (
      this.state.username === android.getBuildMANUFACTURER() &&
      this.state.password === android.getBuildMODEL()
    ) {
      localStorage.setItem("loggedIn", "true");
      android.reload();
    } else {
      ons.notification.alert("Username or password incorrect!");
    }
  };

  private handleUsernameChange = (e: any) => {
    this.setState({ username: e.target.value.toUpperCase() });
  };

  private handlePasswordChange = (e: any) => {
    this.setState({ password: e.target.value.toUpperCase() });
  };

  private placeholderIF(IFdata: any, return_: any, else_: any) {
    if (IFdata) {
      return return_;
    } else {
      return else_;
    }
  }

  public render() {
    return (
      <Translator>
        {({ translate }: any) => (
          <Page renderToolbar={this.renderToolbar}>
            <section
              style={{
                textAlign: "center",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>
                <Input
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  modifier="underbar"
                  float
                  placeholder={this.placeholderIF(
                    window.navigator.userAgent === "HENTAI_WEB_AGENT",
                    "MANUFACTURER",
                    "appCodeName"
                  )}
                />
              </p>
              <p>
                <Input
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  modifier="underbar"
                  float
                  placeholder={this.placeholderIF(
                    window.navigator.userAgent === "HENTAI_WEB_AGENT",
                    "MODEL",
                    "platform"
                  )}
                />
              </p>
              <p>
                <Button onClick={this.handleClick}>
                  <Translate text="sign-in" />
                </Button>
              </p>
              <p>
                <a
                  style={{ textDecoration: "none" }}
                  href={translate({
                    text: "how-to-login-link",
                  })}
                >
                  <Translate text="how-to-login" />
                </a>
              </p>
            </section>
          </Page>
        )}
      </Translator>
    );
  }
}

export default hot(Login);

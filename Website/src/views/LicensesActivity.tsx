import React from "react";
import { Page, Toolbar } from "react-onsenui";
import native from "@Native/index";
import axios from "axios";
import Markdown from "markdown-to-jsx";
import ToolbarBuilder from "@Builders/ToolbarBuilder";
import ContentBody from "@Builders/ContentBody";
import "@Styles/github/markdown-dark.scss";
import "@Styles/github/markdown-light.scss";
import tools from "@Misc/tools";

class LicensesActivity extends React.Component<{ popPage: any }, { data: string }> {
  public constructor(props: any) {
    super(props);
    this.state = { data: "" };
  }

  public componentDidMount = () => {
    native.electron.discordRPC("Viewing Licenses");
    axios.get("https://cdn.dergoogler.com/others/hentai-web/bundle.js.LICENSE.txt").then((res) => {
      const data = res.data;
      this.setState({ data: data });
    });
  };

  private renderToolbar = () => {
    return (
      <Toolbar>
        <ToolbarBuilder
          title={"Licenses"}
          onBackButton={this.props.popPage}
          hasWindowsButtons={true}
          hasDarkMode={true}
        />
      </Toolbar>
    );
  };

  public render() {
    const { data } = this.state;
    return (
      <Page modifier={native.checkPlatformForBorderStyle} renderToolbar={this.renderToolbar}>
        <ContentBody className={"markdown-body-" + tools.typeIF(native.getPref("enableDarkmode"), "dark", "light")}>
          <div
            style={{
              padding: "16px",
            }}
          >
            <Markdown>{data}</Markdown>
          </div>
        </ContentBody>
      </Page>
    );
  }
}

export default LicensesActivity;

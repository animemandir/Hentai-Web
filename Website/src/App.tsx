import AnimeTab from "./builders/AnimeTab";
import SFW from "./views/SFW";
import NSFW from "./views/NSFW";
import * as ons from "onsenui";
import * as React from "react";
import { isIE } from "react-device-detect";
import { hot } from "react-hot-loader/root";
import config from "./misc/config";
import { Provider, Translate, Translator } from "react-translated";
import pkg from "./../package.json";
import {
  Page,
  Toolbar,
  Tab,
  Tabbar,
  Fab,
  SpeedDial,
  SpeedDialItem,
  ToolbarButton,
  Icon,
} from "react-onsenui";

class App extends React.Component {
  private element!: HTMLElement | null;

  public componentDidMount() {
    // To remvoe the button if is in app opened
    if (window.navigator.userAgent === config.options.userAgent) {
      if ((this.element = document.getElementById("download-app"))) {
        this.element.style.display = "none";
        this.element.setAttribute("title", `Download the last ${pkg.version} Hentai Web version!`);
      }
    }
  }

  private renderToolbar() {
    return (
      <Toolbar>
        <div className="center">{config.base.title}</div>
        <div className="right">
          <ToolbarButton
            onClick={() => {
              location.reload();
            }}
          >
            <Icon icon="md-refresh"></Icon>
          </ToolbarButton>
        </div>
      </Toolbar>
    );
  }

  private renderTabs() {
    return [
      {
        content: <AnimeTab content={<SFW />} />,
        tab: <Tab label="SFW" />,
      },
      {
        content: <AnimeTab content={<NSFW />} />,
        tab: <Tab label="NSFW" />,
      },
    ];
  }

  private renderFixed() {
    return (
      <Translator>
        {({ translate }: any) => (
          <SpeedDial position="bottom right">
            <Fab>
              <Icon icon="md-more" />
            </Fab>
            <SpeedDialItem
              onClick={() => {
                ons.notification.confirm({
                  message: translate({
                    text: "dialog-message",
                  }),
                  title: translate({
                    text: "dialog-title",
                  }),
                  buttonLabels: [
                    translate({
                      text: "ok",
                    }),
                  ],
                  animation: "default",
                  primaryButtonIndex: 0,
                  cancelable: false,
                });
              }}
            >
              <Icon icon="md-info" />
            </SpeedDialItem>
            <SpeedDialItem
              onClick={() => {
                window.open(
                  translate({
                    text: "repo-link",
                  })
                );
              }}
            >
              <Icon icon="md-github" />
            </SpeedDialItem>
            <SpeedDialItem
              id="download-app"
              onClick={() => {
                window.open(
                  // If the relase code/name is not the package version, it'll not finded
                  `https://github.com/DerGoogler/Hentai-Web/releases/download/${pkg.version}/app-release.apk`
                );
              }}
            >
              <Icon icon="md-download" />
            </SpeedDialItem>
          </SpeedDial>
        )}
      </Translator>
    );
  }

  public render() {
    if (isIE)
      return (
        <div>
          <Translate text="ie-text" />
        </div>
      );
    return (
      <Page renderToolbar={this.renderToolbar} renderFixed={this.renderFixed}>
        <Tabbar
          swipeable={config.base.swipeable}
          position="top"
          index={0}
          renderTabs={this.renderTabs}
        />
      </Page>
    );
  }
}

export default hot(App);

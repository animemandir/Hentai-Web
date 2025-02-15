import * as React from "react";
import { Icon, ListItem, ListTitle, Select, Switch } from "react-onsenui";
import { Provider, Translate, Translator } from "react-translated";
import { SelectValue, SettingsInterface, SettingsOptions } from "@Types/SettingsBuilder";
import tools from "@Misc/tools";
import native from "@Native/index";
import MDIcon from "./MDIcon";
import HWPlugin from "@Native/hwplugin";

class SettingsBuilder extends React.Component<{
  isPlugin: boolean;
  pluginName: string;
  data: SettingsInterface[];
}> {
  /**
   * Check if an key is there
   * @param key
   * @returns {Boolean}
   */
  private getSettingSwitch(key: string): boolean {
    var get = this.getPref(key);
    if (get === undefined || get === null || get === "" || get === "false") {
      return false;
    } else {
      return true;
    }
  }

  private getSettingSelect(key: string): string | String {
    var get = this.getPref(key);
    if (get === undefined || get === null || get === "") {
      return "en";
    } else {
      return get;
    }
  }

  private getPref(key: string): string {
    if (this.props.isPlugin) {
      return new HWPlugin(this.props.pluginName).getPluginPref(key);
    } else {
      return native.getPref(key);
    }
  }

  private setPref(key: string, content: string): void {
    if (this.props.isPlugin) {
      new HWPlugin(this.props.pluginName).setPluginPref(key, content);
    } else {
      native.setPref(key, content);
    }
  }

  private setSetting(key: string, data: any): void {
    this.setPref(key, data);
  }

  private default(_: any, __: any, ___: any) {
    if (_ === undefined || _ === null) {
      return __;
    } else if (_ === undefined || _ === null) {
      return ___;
    }
  }

  public render() {
    const { data } = this.props;

    const settings = data.map((header: SettingsInterface) => (
      <Translator>
        {({ translate }: any) => (
          <>
            <section id={header.id} className={header.className} style={header.style}>
              <ListTitle>
                <Translate text={header.title} />
              </ListTitle>
              {header.content.map((setting: SettingsOptions) => (
                <>
                  <ListItem
                    expandable={tools.typeCheck(setting.expandable, false)}
                    modifier={tools.typeCheck(setting.modifier, "")}
                    tappable={tools.typeCheck(setting.tappable, false)}
                    id={setting.id}
                    style={setting.style}
                    onClick={() => {
                      if (typeof setting.onClick == "function") {
                        setting.onClick();
                      }
                    }}
                  >
                    {(() => {
                      if (setting.icon === null || setting.icon === undefined) {
                        return;
                      } else {
                        return (
                          <div className="left">
                            <MDIcon icon={setting.icon} size="24" isInList={true}></MDIcon>
                          </div>
                        );
                      }
                    })()}
                    <div className="center">
                      <Translate text={setting.text} />
                    </div>
                    <div className="right">
                      {(() => {
                        switch (setting.type) {
                          case "switch":
                            return (
                              <Switch
                                checked={this.default(
                                  setting.switchDefaultValue,
                                  this.getSettingSwitch(setting.key!),
                                  false
                                )}
                                disabled={Boolean(setting.disabled)}
                                onChange={(e: any) => {
                                  const keepDefaultFuntion = () => this.setSetting(setting.key!, e.target.checked);
                                  if (typeof setting.callback == "function") {
                                    setting.callback(e, setting.key, translate, keepDefaultFuntion());
                                  } else {
                                    keepDefaultFuntion();
                                  }
                                }}
                              ></Switch>
                            );
                          case "select":
                            return (
                              <Select
                                id="choose-sel"
                                disabled={Boolean(setting.disabled)}
                                value={tools.typeCheck(
                                  this.getSettingSelect(setting.key!),
                                  tools.typeCheck(setting.selectDefaultValue, "")
                                )}
                                onChange={(e: any) => {
                                  const keepDefaultFuntion = () => this.setSetting(setting.key!, e.target.value);
                                  if (typeof setting.callback == "function") {
                                    setting.callback(e, setting.key, translate, keepDefaultFuntion());
                                  } else {
                                    keepDefaultFuntion();
                                  }
                                }}
                              >
                                <option value="" selected disabled hidden>
                                  Choose
                                </option>
                                {setting.selectValue?.map((select: SelectValue) => (
                                  <>
                                    <option value={select.value} disabled={select.disabled}>
                                      {select.text}
                                    </option>
                                  </>
                                ))}
                              </Select>
                            );
                          default:
                            return;
                        }
                      })()}
                    </div>
                    {(() => {
                      if (setting.expandable) {
                        return <div className="expandable-content">{setting.expandableContent}</div>;
                      } else {
                        return;
                      }
                    })()}
                  </ListItem>
                </>
              ))}
            </section>
          </>
        )}
      </Translator>
    ));

    return settings;
  }
}

export default SettingsBuilder;

import React from "react";
import { NavPageContainer } from "react-windows-ui";
import { hot } from "react-hot-loader/root";
import AnimePicture from "../maker/AniemePicture";
import { Col, Row } from "react-onsenui";
import hmtai from "hmtai";

class SFW extends React.Component {
  render() {
    return (
      <NavPageContainer>
        <Row>
          <Col>
            <AnimePicture source={hmtai.wallpaper()} note="wallpaper" />
          </Col>
          <Col>
            <AnimePicture
              source={hmtai.mobileWallpaper()}
              note="mobileWallpaper"
            />
          </Col>
          <Col>
            <AnimePicture source={hmtai.neko()} note="neko" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.jahy()} note="jahy" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.lick()} note="lick" />
          </Col>
          <Col>
            <AnimePicture source={hmtai.slap()} note="slap" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AnimePicture source={hmtai.depression()} note="depression" />
          </Col>
        </Row>
      </NavPageContainer>
    );
  }
}

export default hot(SFW);

<Row>
  <Col></Col>
  <Col></Col>
  <Col></Col>
</Row>;

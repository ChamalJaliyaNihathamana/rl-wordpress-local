import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../shared/components/Button/CustomButton";
import Title from "../../../shared/components/Title/Title";
import { AdvertisementModel } from "../../../shared/model/Advertisement";


interface BannerCardProps {
  advertisementData?: AdvertisementModel;
}

const BannerCard: React.FunctionComponent<BannerCardProps> = ({
  advertisementData,
}) => {
  const navigate = useNavigate();
  return (
    <Row className="banner">
      {advertisementData ? (
        <>
          <Col md={7} className="banner__text-box">
            <div className="card shadow-sm">
              <Title className="banner__text-box--title">
                {advertisementData.description}
              </Title>
              <p className="banner__text-box--description rl-banner-text">
                Office hours for <span className="bold-text">Thursday, December 23<sup>nd</sup></span>,and 
                <span className="bold-text"> Thursday, December 30<sup>th</sup></span> 
                &nbsp; will be from <span className="bold-text">8 am - 12 pm</span>.
                We will be closed on <span className="bold-text">December 24<sup>th</sup> - 25<sup>th</sup></span> &nbsp; for &nbsp;
                <span className="bold-text">Christmas</span> &nbsp;
                as well as <span className="bold-text"> &nbsp; December 31<sup>st</sup> - January 1<sup>st</sup></span>
                &nbsp; for <span className="bold-text">New Year's Day</span>.
                <br></br>
                Thank you and happy holidays! 
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.{advertisementData.startDate} Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book.
                {advertisementData.endDate} */}
              </p>
            </div>
          </Col>
          <Col md={5} className="banner__image-box rl-banner-img-box">
            <div className="card shadow-sm">
              <Card>
                <Row>
                  <Col>
                    <Card.Img
                      variant="top"
                      className="offer-image"
                      src={advertisementData.image}
                    />
                    <Card.Body>
                      <Card.Title> {advertisementData.title}</Card.Title>

                      <CustomButton
                        onClick={() => navigate("/pricing")}
                        className="mt-2 mb-0"
                      >
                        Order Now
                      </CustomButton>
                      {/* <div className="offer-value d-flex">
                        <p className="actual-price">
                          <span>$</span>115
                        </p>
                        <p className="duplicate-price">
                          <span>$ </span>12
                        </p>
                      </div> */}
                    </Card.Body>

                    <div className="overlay-img"></div>
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>
        </>
      ) : null}
    </Row>
  );
};

export default BannerCard;

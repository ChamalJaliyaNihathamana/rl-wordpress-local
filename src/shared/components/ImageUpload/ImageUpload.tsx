import React, { useState, useRef } from "react";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { Col, Form, Row } from "react-bootstrap";
import CustomButton from "../Button/CustomButton";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageUpload() {

  const [selectedImage, setSelectedImage] = React.useState({});
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [isToggled, setIsToggled] = React.useState(true);

  // handle switch button
  const toggle = React.useCallback(
    () => setIsToggled(!isToggled),
    [isToggled, setIsToggled]
  );

  // handle resize before upload

  // const onSelectFile = async (event: any) =>  {
  //   const file = event.target.files[0];
  //   const image = await resizeFile(file, 100, 100, "JPEG", 100, 0);
  //   console.log(image);
  //   const newFile = dataURIToBlob(image);
  //   const srcheadshot = URL.createObjectURL(newFile);
  //   setImgSrc(srcheadshot);
  // }

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result!.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setSelectedImage(e.target.files[0]);
    }
  }

  const handleUpload = () => {

  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(16 / 9);
      setCrop(centerAspectCrop(width, height, 16 / 9));
    }
  }

  return (
    <>
      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={onSelectFile}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Row className="upl-image-row justify-content-center">
          <Col md={3}>
            <Form.Label htmlFor="scale-input">Scale:</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              id="scale-input"
              type="number"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
            {}
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Row className="upl-image-row justify-content-center">
          <Col md={3}>
            <Form.Label htmlFor="rotate-input">Rotate:</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              id="rotate-input"
              type="number"
              value={rotate}
              disabled={!imgSrc}
              onChange={(e) =>
                setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
              }
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="form-check form-switch mb-3">
        <Row className="upl-image-row justify-content-center">
          <Col md={6}>
            <Form.Label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Aspect Ratio
            </Form.Label>
          </Col>
          <Col md={5}>
            <Form.Control
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
              checked={isToggled}
              onClick={handleToggleAspectClick}
              onChange={toggle}
            />
          </Col>
        </Row>

        {/* <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? "off" : "on"}
          </button> */}
      </Form.Group>
      <Form.Group className="upl-image-crop mt-5 d-flex">
        <Row>
          <Col md={6}>
            {Boolean(imgSrc) && (
              <Row>
                <Col className="crop-box">
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                  >
                    <img
                      ref={imgRef}
                      alt="Crop me"
                      src={imgSrc}
                      style={{
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                      }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </Col>
              </Row>
            )}
          </Col>

          <Col md={6}>
            {Boolean(completedCrop) && (
              <Row>
                <Col className="prev-box">
                  <span
                    className="prev-title mb-1"
                    style={{ display: "block" }}
                  >
                    Preview
                  </span>
                  <canvas
                    ref={previewCanvasRef}
                    style={{
                      border: "1px solid black",
                      objectFit: "contain",
                      width: completedCrop!.width,
                      height: completedCrop!.height,
                    }}
                  />
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Form.Group>
      <Row className="mb-3">
        <CustomButton onClick={handleUpload} disabled={!imgSrc}>Upload</CustomButton>
      </Row>
    </>
  );
}

import * as React from "react";
// hook-forms
import { useForm } from "react-hook-form";
import { AdvertisementSchema, FormAdvertisement } from "./AdvertisementsSchema";
import { yupResolver } from "@hookform/resolvers/yup";
// ui
import ModalPortal from "../../../shared/components/Modal";
import ImageUpload from "../../../shared/components/ImageUpload/ImageUpload";
import { FormInputDate } from "../../../shared/components/FormComponents/FormInputDate";
import { FormInputText } from "../../../shared/components/FormComponents/FormInputText";
import { FormInputTextArea } from "../../../shared/components/FormComponents/FormInputTextArea";
import CustomButton from "../../../shared/components/Button/CustomButton";
import { ButtonGroup, Col, Form, Row } from "react-bootstrap";
import { ChevronBarDown, PlusCircleFill } from "react-bootstrap-icons";
interface AdvertisementProps {}

const Advertisement: React.FunctionComponent<AdvertisementProps> = () => {
  const methods = useForm<FormAdvertisement>({
    resolver: yupResolver(AdvertisementSchema),
  });
  const { handleSubmit, control } = methods;

  const onSubmit = (data: FormAdvertisement) => {
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="form mt-5">
      <Row>
        <Col md={4} className="mb-3">
          <ModalPortal
            ariaLabel="Add Photo"
            btnClassName="btn btn-secondary reg-upload-btn"
            btnContent="ADD PHOTO"
            btnIcon={<PlusCircleFill className="mx-0" />}
            center
            size="md"
            title="Upload Image"
            modalIcon={<ChevronBarDown className="modal-icon" />}
          >
            <>
              <ImageUpload />
            </>
          </ModalPortal>
        </Col>
        <Col md={6}>
          <FormInputText
            name="title"
            control={control}
            label="Advertisement Title"
          />
          <FormInputText
            name="url"
            control={control}
            label="Advertisement URL"
            type="url"
          />
          <Row>
            <Col className="mb-4">
              <FormInputDate
                type="date"
                name="startDate"
                label="Desired Publish Start Date "
                control={control}
              />
            </Col>
            <Col className="mb-4">
              <FormInputDate
                type="date"
                name="endDate"
                label="Desired Publish End Date "
                control={control}
              />
            </Col>
          </Row>
          <FormInputTextArea
            name="description"
            control={control}
            label="Advertisemnet Description"
            maxRows={3}
            placeholder="Add Addition Information About Advertisement Here..."
          />
        </Col>
      </Row>

      <Row className="text-end mt-4">
        <Col md={10}>
          <ButtonGroup>
            <CustomButton type="submit" className="btn btn-primary me-2">
              Save
            </CustomButton>
            <CustomButton type="submit" className="btn btn-cancel ms-2">
              Delete
            </CustomButton>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default Advertisement;

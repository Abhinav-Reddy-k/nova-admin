import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import { useSelector } from "react-redux";
import { selectClasses } from "../Profile/profileSlice";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const classes = useSelector(selectClasses);
  return (
    <Modal
      visible={visible}
      title="Create a new class"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="url"
          label="Url"
          rules={[
            {
              required: true,
              message: "Please input the invitation link",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="subject">
          <Radio.Group>
            {classes.map((cls) => {
              return <Radio value={cls.subject}>{cls.subject}</Radio>;
            })}
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const OnlineClasses = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Start New Class
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default OnlineClasses;

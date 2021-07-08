import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Radio, Checkbox, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectClasses, selectProfileData } from "../Profile/profileSlice";
import {
  myClassesListener,
  startOnlineClass,
} from "../../app/firebase/firestore/classesCollection";
import { myClassesLoaded, selectCurrentClasses } from "./classesSclice";
import ClassCardGrid from "./ClassesCardGrid";
import { GrAdd } from "react-icons/gr";
import "./OnlineClasses.css";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  let currentClasses = useSelector(selectCurrentClasses);
  currentClasses = currentClasses.map((cls) => {
    let { subject, branch, section, year } = cls;
    return `${subject}${branch}${section}${year}`;
  });
  const classes = useSelector(selectClasses);
  let options = classes.map((cls, index) => {
    return {
      label: `${cls.subject} (${cls.section})`,
      value: cls,
      key: index,
      disabled: currentClasses.includes(
        `${cls.subject}${cls.branch}${cls.section}${cls.year}`
      ),
    };
  });
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
          name="classUrl"
          label="Class Room Url Invitation Link"
          rules={[
            {
              required: true,
              message: "Please input the invitation link",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Class Description"
          rules={[
            {
              required: true,
              message: "Please input the description",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="classData"
          rules={[{ required: true, message: "Select atleast one class" }]}
        >
          <Checkbox.Group options={options} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const OnlineClasses = () => {
  const [visible, setVisible] = useState(false);
  const teacherProfile = useSelector(selectProfileData);
  const dispatch = useDispatch();
  const onCreate = (values) => {
    startOnlineClass(values, teacherProfile);
    setVisible(false);
  };

  useEffect(() => {
    const unsubscribe = myClassesListener(teacherProfile.uid).onSnapshot(
      (querySnapshot) => {
        let myClasses = [];
        querySnapshot.forEach((doc) => {
          let docData = doc.data();
          myClasses.push({
            ...docData,
            startTime: docData.startTime.toDate().toString(),
          });
        });
        dispatch(myClassesLoaded(myClasses));
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <ClassCardGrid />

      <Tooltip title="Start New Class" className="floatingbutton">
        <p></p>
        <a onClick={() => setVisible(true)} href="#"></a>
      </Tooltip>
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

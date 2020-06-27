import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Select,
  Form,
  Input,
  Table,
  Popconfirm,
  Spin,
  message,
} from "antd";
import axios from "axios";
import { QUESTION_SERVER } from "../../../Config";
import "./AdminSection.css";

const { Option } = Select;
const { TextArea } = Input;

function QuestionSection() {
  message.config({
    top: 100,
  });
  const [form] = Form.useForm();
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [
    individualQuestionModalVisible,
    setIndividualQuestionModalVisible,
  ] = useState(false);
  const [subject, setSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [individual, setIndividual] = useState(null);
  const [keywords, setKeywords] = useState({
    subject: null,
    category: null,
    grade: null,
    difficulty: null,
    mark: null,
  });

  const loadQuestions = (keywords) => {
    axios
      .get(
        `${QUESTION_SERVER}?subject=${keywords.subject}&category=${keywords.category}&grade=${keywords.grade}&difficulty=${keywords.difficulty}&mark=${keywords.mark}`
      )
      .then((response) => {
        setQuestions(
          response.data.map((v) => {
            return {
              key: v._id,
              subject: v.subject,
              category: v.category,
              grade: v.grade,
              difficulty: v.difficulty,
              question: v.question,
              optionOne: v.optionOne,
              optionTwo: v.optionTwo,
              optionThree: v.optionThree,
              optionFour: v.optionFour,
              answer: v.answer,
              mark: v.mark,
              explanation: v.explanation,
            };
          })
        );
      });
  };

  useEffect(() => {
    loadQuestions(keywords);
  }, [keywords]);

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text, record) => (
        <span
          className="open-user-modal"
          onClick={() => showIndividualQuestionModal(record.key)}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.subject.localeCompare(b.subject),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      sorter: (a, b) => a.grade - b.grade,
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      sorter: (a, b) => a.difficulty - b.difficulty,
    },
    {
      title: "Mark",
      dataIndex: "mark",
      key: "mark",
      sorter: (a, b) => a.mark - b.mark,
    },
  ];

  const closeQuestionModal = () => {
    setSubject(null);
    setQuestionModalVisible(false);
  };

  const showQuestionModal = () => {
    setQuestionModalVisible(true);
  };

  const loadIndividual = (questionId) => {
    axios.get(`${QUESTION_SERVER}?_id=${questionId}`).then((response) => {
      setIndividual(response.data[0]);
      setSubject(response.data[0].subject);
    });
  };

  const showIndividualQuestionModal = (questionId) => {
    loadIndividual(questionId);
    setIndividualQuestionModalVisible(true);
  };

  const closeIndividualQuestionModal = () => {
    setIndividual(null);
    setSubject(null);
    setIndividualQuestionModalVisible(false);
  };

  const updateQuestion = (values) => {
    const variables = { ...values, _id: individual._id };
    axios
      .put(`${QUESTION_SERVER}/update`, variables)
      .then(loadQuestions(keywords));
    setIndividual(null);
    setSubject(null);
    setIndividualQuestionModalVisible(false);
  };

  function popConfirm(e) {
    axios
      .delete(`${QUESTION_SERVER}/delete`, {
        data: { _id: individual._id },
      })
      .then(loadQuestions(keywords));
    setIndividual(null);
    setSubject(null);
    setIndividualQuestionModalVisible(false);
    message.success("The user has been successfully removed");
  }

  function popCancel(e) {
    message.error("Removing the user has been canceled");
  }

  const addQuestion = (values) => {
    axios.post(`${QUESTION_SERVER}/add`, values).then(loadQuestions(keywords));
    setSubject(null);
    setQuestionModalVisible(false);
  };

  const selectCategory = (value) => {
    setSubject(value);
  };

  const showSubject = (kind) => {
    return (
      <Select placeholder="Select Subject" onChange={selectCategory}>
        {kind === "search" && <Option value={null}>-----</Option>}
        <Option value="math">Math</Option>
        <Option value="english">English</Option>
        <Option value="ga">GA</Option>
        <Option value="writing">Writing</Option>
      </Select>
    );
  };

  const showCategory = (kind) => {
    switch (subject) {
      case "english":
        return (
          <Select placeholder="Select English Category">
            {kind === "search" && <Option value={null}>-----</Option>}
            <Option value="1">Category1</Option>
            <Option value="2">Category2</Option>
            <Option value="3">Category3</Option>
            <Option value="4">Category4</Option>
          </Select>
        );
      case "math":
        return (
          <Select placeholder="Select Math Category">
            {kind === "search" && <Option value={null}>-----</Option>}
            <Option value="1">Category1</Option>
            <Option value="2">Category2</Option>
            <Option value="3">Category3</Option>
            <Option value="4">Category4</Option>
          </Select>
        );
      case "writing":
        return (
          <Select placeholder="Select Writing Category">
            {kind === "search" && <Option value={null}>-----</Option>}
            <Option value="1">Category1</Option>
            <Option value="2">Category2</Option>
            <Option value="3">Category3</Option>
            <Option value="4">Category4</Option>
          </Select>
        );
      case "ga":
        return (
          <Select placeholder="Select GA Category">
            {kind === "search" && <Option value={null}>-----</Option>}
            <Option value="1">Category1</Option>
            <Option value="2">Category2</Option>
            <Option value="3">Category3</Option>
            <Option value="4">Category4</Option>
          </Select>
        );
      default:
        return <Select disabled={true}></Select>;
    }
  };

  const showGrade = (kind) => {
    return (
      <Select placeholder="Select Grade">
        {kind === "search" && <Option value={null}>-----</Option>}
        <Option value="k">Kindy</Option>
        <Option value="1">Year 1</Option>
        <Option value="2">Year 2</Option>
        <Option value="3">Year 3</Option>
        <Option value="4">Year 4</Option>
        <Option value="5">Year 5</Option>
        <Option value="6">Year 6</Option>
        <Option value="7">Year 7</Option>
        <Option value="8">Year 8</Option>
        <Option value="9">Year 9</Option>
        <Option value="10">Year 10</Option>
        <Option value="11">Year 11</Option>
        <Option value="12">Year 12</Option>
      </Select>
    );
  };

  const showDifficulty = (kind) => {
    return (
      <Select placeholder="Select Difficulty">
        {kind === "search" && <Option value={null}>-----</Option>}
        <Option value="1">Easy</Option>
        <Option value="2">Medium</Option>
        <Option value="3">Hard</Option>
      </Select>
    );
  };

  const showAnswer = () => {
    return (
      <Select placeholder="Select Answer">
        <Option value="1">Option 1</Option>
        <Option value="2">Option 2</Option>
        <Option value="3">Option 3</Option>
        <Option value="4">Option 4</Option>
      </Select>
    );
  };

  const showMark = (kind) => {
    return (
      <Select placeholder="Select Mark">
        {kind === "search" && <Option value={null}>-----</Option>}
        <Option value="1">1</Option>
        <Option value="2">2</Option>
        <Option value="3">3</Option>
        <Option value="4">4</Option>
        <Option value="5">5</Option>
      </Select>
    );
  };

  const findQuestions = (values) => {
    setKeywords({ ...values });
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 10, offset: 14 },
  };

  return (
    <div>
      <div className="users-section-search">
        <Button type="primary" onClick={showQuestionModal}>
          ADD QUESTION
        </Button>
      </div>
      <div>
        <div className="users-section-search">
          <Form form={form} layout="inline" onFinish={findQuestions}>
            <Form.Item name="subject">{showSubject("search")}</Form.Item>
            <Form.Item name="category">{showCategory("search")}</Form.Item>
            <Form.Item name="grade">{showGrade("search")}</Form.Item>
            <Form.Item name="difficulty">{showDifficulty("search")}</Form.Item>
            <Form.Item name="mark">{showMark("search")}</Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                FIND
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Table
          dataSource={questions}
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          className="content-center width-80"
        />
      </div>
      <Modal
        title="Add Question"
        visible={questionModalVisible}
        closable={false}
        destroyOnClose={true}
        footer={[
          <Button key="close" type="primary" onClick={closeQuestionModal}>
            CLOSE
          </Button>,
        ]}
      >
        <Form onFinish={addQuestion}>
          <Form.Item
            name="subject"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            {showSubject("add")}
          </Form.Item>
          <Form.Item
            name="category"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            {showCategory("add")}
          </Form.Item>
          <Form.Item
            name="grade"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            {showGrade("add")}
          </Form.Item>
          <Form.Item
            name="difficulty"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            {showDifficulty("add")}
          </Form.Item>
          <Form.Item
            name="question"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter Question" />
          </Form.Item>
          <Form.Item
            name="optionOne"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Enter Option 1" />
          </Form.Item>
          <Form.Item
            name="optionTwo"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Enter Option 2" />
          </Form.Item>
          <Form.Item
            name="optionThree"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Enter Option 3" />
          </Form.Item>
          <Form.Item
            name="optionFour"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <Input placeholder="Enter Option 4" />
          </Form.Item>
          <Form.Item
            name="answer"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            {showAnswer()}
          </Form.Item>
          <Form.Item
            name="mark"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            {showMark("add")}
          </Form.Item>
          <Form.Item
            name="explanation"
            rules={[
              {
                required: true,
                message: "This field is required!",
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter Explanation" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              ADD
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Question Details"
        visible={individualQuestionModalVisible}
        closable={false}
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={closeIndividualQuestionModal}
          >
            CLOSE
          </Button>,
        ]}
      >
        {individual === null ? (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        ) : (
          <Form
            {...layout}
            onFinish={updateQuestion}
            initialValues={{
              subject: individual.subject,
              category: individual.category,
              grade: individual.grade,
              difficulty: individual.difficulty,
              question: individual.question,
              optionOne: individual.optionOne,
              optionTwo: individual.optionTwo,
              optionThree: individual.optionThree,
              optionFour: individual.optionFour,
              answer: individual.answer,
              mark: individual.mark,
              explanation: individual.explanation,
            }}
          >
            <Form.Item
              name="subject"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Subject: "
            >
              {showSubject("add")}
            </Form.Item>
            <Form.Item
              name="category"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Category: "
            >
              {showCategory("add")}
            </Form.Item>
            <Form.Item
              name="grade"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Grade: "
            >
              {showGrade("add")}
            </Form.Item>
            <Form.Item
              name="difficulty"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Difficulty: "
            >
              {showDifficulty("add")}
            </Form.Item>
            <Form.Item
              name="question"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Question: "
            >
              <TextArea rows={4} placeholder="Enter Question" />
            </Form.Item>
            <Form.Item
              name="optionOne"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Option one: "
            >
              <Input placeholder="Enter Option 1" />
            </Form.Item>
            <Form.Item
              name="optionTwo"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Option two: "
            >
              <Input placeholder="Enter Option 2" />
            </Form.Item>
            <Form.Item
              name="optionThree"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Option three: "
            >
              <Input placeholder="Enter Option 3" />
            </Form.Item>
            <Form.Item
              name="optionFour"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Option four: "
            >
              <Input placeholder="Enter Option 4" />
            </Form.Item>
            <Form.Item
              name="answer"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Option answer: "
            >
              {showAnswer()}
            </Form.Item>
            <Form.Item
              name="mark"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Mark: "
            >
              {showMark("add")}
            </Form.Item>
            <Form.Item
              name="explanation"
              rules={[
                {
                  required: true,
                  message: "This field is required!",
                },
              ]}
              label="Explanation: "
            >
              <TextArea rows={4} placeholder="Enter Explanation" />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
              <Popconfirm
                title="Are you sure to delete this question?"
                onConfirm={popConfirm}
                onCancel={popCancel}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger className="margin-right-p5">
                  DELETE
                </Button>
              </Popconfirm>
              <Button type="primary" htmlType="submit">
                UPDATE
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
}

export default QuestionSection;

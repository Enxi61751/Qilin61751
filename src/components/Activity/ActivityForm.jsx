import { Form, Input, Button, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ActivityForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        time: [dayjs(initialValues.startTime), dayjs(initialValues.endTime)]
      });
    }
  }, [initialValues, form]);

  const onFinish = (values) => {
    const [startTime, endTime] = values.time;
    onSubmit({
      ...values,
      startTime: startTime.format('YYYY-MM-DDTHH:mm:ss'),
      endTime: endTime.format('YYYY-MM-DDTHH:mm:ss')
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="活动标题"
        rules={[{ required: true, message: '请输入活动标题' }]}
      >
        <Input placeholder="例如：夏日音乐节" />
      </Form.Item>
      
      <Form.Item
        name="description"
        label="活动描述"
        rules={[{ required: true, message: '请输入活动描述' }]}
      >
        <TextArea rows={4} placeholder="详细描述活动内容..." />
      </Form.Item>
      
      <Form.Item
        name="time"
        label="活动时间"
        rules={[{ required: true, message: '请选择活动时间' }]}
      >
        <RangePicker showTime format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      
      <Form.Item
        name="location"
        label="活动地点"
        rules={[{ required: true, message: '请输入活动地点' }]}
      >
        <Input placeholder="例如：中央公园" />
      </Form.Item>
      
      <Form.Item
        name="status"
        label="状态"
        initialValue="draft"
      >
        <Select>
          <Select.Option value="draft">草稿</Select.Option>
          <Select.Option value="published">已发布</Select.Option>
          <Select.Option value="archived">已归档</Select.Option>
        </Select>
      </Form.Item>
      
      <Form.Item
        name="coverImage"
        label="封面图片"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList}
      >
        <Upload listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>上传图片</Button>
        </Upload>
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? '更新活动' : '创建活动'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ActivityForm;
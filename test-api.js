const axios = require('axios');

const BASE_URL = 'http://localhost:7001';

// 测试数据
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  phone: '13800138000',
  password: '123456',
  nickname: '测试用户',
  avatar: 'https://example.com/avatar.jpg',
  isActive: true,
  isAdmin: false,
  profile: {
    age: 25,
    gender: '男',
    address: '北京市朝阳区',
    bio: '热爱运动'
  }
};

const testActivity = {
  title: '周末篮球赛',
  description: '欢迎所有篮球爱好者参加，我们将组织一场精彩的篮球比赛',
  type: '篮球',
  location: '体育馆A',
  maxParticipants: 20,
  price: 50.00,
  startTime: '2024-01-20T14:00:00Z',
  endTime: '2024-01-20T16:00:00Z',
  requirements: {
    ageRange: '18-50',
    skillLevel: '初级',
    equipment: ['篮球', '运动鞋']
  },
  images: ['https://example.com/image1.jpg'],
  organizerId: 1
};

async function testAPI() {
  console.log('开始测试API...\n');

  try {
    // 1. 创建用户
    console.log('1. 测试创建用户...');
    const createUserResponse = await axios.post(`${BASE_URL}/api/users`, testUser);
    console.log('创建用户成功:', createUserResponse.data);
    const userId = createUserResponse.data.data.id;

    // 2. 获取用户列表
    console.log('\n2. 测试获取用户列表...');
    const usersResponse = await axios.get(`${BASE_URL}/api/users`);
    console.log('获取用户列表成功:', usersResponse.data);

    // 3. 获取用户详情
    console.log('\n3. 测试获取用户详情...');
    const userDetailResponse = await axios.get(`${BASE_URL}/api/users/${userId}`);
    console.log('获取用户详情成功:', userDetailResponse.data);

    // 4. 创建活动
    console.log('\n4. 测试创建活动...');
    const createActivityResponse = await axios.post(`${BASE_URL}/api/activities`, testActivity);
    console.log('创建活动成功:', createActivityResponse.data);
    const activityId = createActivityResponse.data.data.id;

    // 5. 获取活动列表
    console.log('\n5. 测试获取活动列表...');
    const activitiesResponse = await axios.get(`${BASE_URL}/api/activities`);
    console.log('获取活动列表成功:', activitiesResponse.data);

    // 6. 获取活动详情
    console.log('\n6. 测试获取活动详情...');
    const activityDetailResponse = await axios.get(`${BASE_URL}/api/activities/${activityId}`);
    console.log('获取活动详情成功:', activityDetailResponse.data);

    // 7. 活动报名
    console.log('\n7. 测试活动报名...');
    const registrationData = {
      userId: userId,
      additionalInfo: {
        emergencyContact: '13800138001',
        specialRequirements: '无',
        teamPreference: '随机分配'
      }
    };
    const registerResponse = await axios.post(`${BASE_URL}/api/activities/${activityId}/register`, registrationData);
    console.log('活动报名成功:', registerResponse.data);

    // 8. 获取活动报名列表
    console.log('\n8. 测试获取活动报名列表...');
    const registrationsResponse = await axios.get(`${BASE_URL}/api/activities/${activityId}/registrations`);
    console.log('获取活动报名列表成功:', registrationsResponse.data);

    // 9. 获取用户报名列表
    console.log('\n9. 测试获取用户报名列表...');
    const userRegistrationsResponse = await axios.get(`${BASE_URL}/api/activities/user/${userId}/registrations`);
    console.log('获取用户报名列表成功:', userRegistrationsResponse.data);

    // 10. 搜索活动
    console.log('\n10. 测试搜索活动...');
    const searchResponse = await axios.get(`${BASE_URL}/api/activities?keyword=篮球&type=篮球`);
    console.log('搜索活动成功:', searchResponse.data);

    console.log('\n所有API测试完成！');

  } catch (error) {
    console.error('API测试失败:', error.response?.data || error.message);
  }
}

// 运行测试
testAPI(); 
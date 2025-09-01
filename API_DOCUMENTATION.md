# 体育活动室系统 API 文档

## 基础信息
- 基础URL: `http://localhost:7001`
- 所有请求和响应均使用JSON格式
- 响应格式统一为: `{ code: number, message: string, data: any }`

## 用户管理 API

### 1. 创建用户
- **POST** `/api/users`
- **请求体**:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "phone": "13800138000",
  "password": "123456",
  "nickname": "测试用户",
  "avatar": "https://example.com/avatar.jpg",
  "isActive": true,
  "isAdmin": false,
  "profile": {
    "age": 25,
    "gender": "男",
    "address": "北京市朝阳区",
    "bio": "热爱运动"
  }
}
```

### 2. 获取用户列表
- **GET** `/api/users?page=1&limit=10`

### 3. 获取用户详情
- **GET** `/api/users/:id`

### 4. 更新用户
- **PATCH** `/api/users/:id`
- **请求体**: 同创建用户，但所有字段都是可选的

### 5. 删除用户
- **DELETE** `/api/users/:id`

## 活动管理 API

### 1. 创建活动
- **POST** `/api/activities`
- **请求体**:
```json
{
  "title": "周末篮球赛",
  "description": "欢迎所有篮球爱好者参加",
  "type": "篮球",
  "location": "体育馆A",
  "maxParticipants": 20,
  "price": 50.00,
  "startTime": "2024-01-20T14:00:00Z",
  "endTime": "2024-01-20T16:00:00Z",
  "requirements": {
    "ageRange": "18-50",
    "skillLevel": "初级",
    "equipment": ["篮球", "运动鞋"]
  },
  "images": ["https://example.com/image1.jpg"],
  "organizerId": 1
}
```

### 2. 获取活动列表（支持搜索和筛选）
- **GET** `/api/activities`
- **查询参数**:
  - `keyword`: 搜索关键词
  - `type`: 活动类型
  - `location`: 活动地点
  - `status`: 活动状态
  - `startDate`: 开始日期
  - `endDate`: 结束日期
  - `minPrice`: 最低价格
  - `maxPrice`: 最高价格
  - `page`: 页码
  - `limit`: 每页数量
  - `sortBy`: 排序字段
  - `sortOrder`: 排序方向 (ASC/DESC)

### 3. 获取活动详情
- **GET** `/api/activities/:id`

### 4. 更新活动
- **PATCH** `/api/activities/:id`
- **请求体**: 同创建活动，但所有字段都是可选的

### 5. 删除活动
- **DELETE** `/api/activities/:id`

## 活动报名 API

### 1. 活动报名
- **POST** `/api/activities/:id/register`
- **请求体**:
```json
{
  "userId": 1,
  "additionalInfo": {
    "emergencyContact": "13800138001",
    "specialRequirements": "无",
    "teamPreference": "随机分配"
  }
}
```

### 2. 取消报名
- **POST** `/api/activities/:id/cancel-registration`
- **请求体**:
```json
{
  "userId": 1,
  "reason": "临时有事"
}
```

### 3. 获取用户报名列表
- **GET** `/api/activities/user/:userId/registrations`

### 4. 获取活动报名列表
- **GET** `/api/activities/:id/registrations`

## 活动评论 API

### 1. 创建评论
- **POST** `/api/activities/:id/comments`
- **请求体**:
```json
{
  "userId": 1,
  "content": "活动很棒，下次还会参加！",
  "rating": 5,
  "images": ["https://example.com/comment1.jpg"]
}
```

### 2. 获取活动评论列表
- **GET** `/api/activities/:id/comments?page=1&limit=10`

### 3. 删除评论
- **DELETE** `/api/activities/comments/:commentId`
- **请求体**:
```json
{
  "userId": 1
}
```

## 数据模型

### User (用户)
- `id`: 用户ID
- `username`: 用户名（唯一）
- `email`: 邮箱（唯一）
- `phone`: 手机号（唯一）
- `password`: 密码（加密存储）
- `nickname`: 昵称
- `avatar`: 头像URL
- `isActive`: 是否激活
- `isAdmin`: 是否管理员
- `profile`: 用户资料（JSON）
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### Activity (活动)
- `id`: 活动ID
- `title`: 活动标题
- `description`: 活动描述
- `type`: 活动类型
- `location`: 活动地点
- `maxParticipants`: 最大参与人数
- `currentParticipants`: 当前参与人数
- `price`: 活动费用
- `startTime`: 开始时间
- `endTime`: 结束时间
- `status`: 活动状态
- `isActive`: 是否激活
- `requirements`: 参与要求（JSON）
- `images`: 活动图片（JSON数组）
- `organizerId`: 组织者ID
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### ActivityRegistration (活动报名)
- `id`: 报名ID
- `activityId`: 活动ID
- `userId`: 用户ID
- `status`: 报名状态
- `paidAmount`: 支付金额
- `isPaid`: 是否已支付
- `paymentTime`: 支付时间
- `cancelReason`: 取消原因
- `additionalInfo`: 额外信息（JSON）
- `createdAt`: 报名时间
- `updatedAt`: 更新时间

### ActivityComment (活动评论)
- `id`: 评论ID
- `activityId`: 活动ID
- `userId`: 用户ID
- `content`: 评论内容
- `rating`: 评分（1-5星）
- `isVisible`: 是否可见
- `replyTo`: 回复的评论ID
- `images`: 评论图片（JSON数组）
- `createdAt`: 评论时间
- `updatedAt`: 更新时间

## 状态码说明
- `200`: 成功
- `400`: 请求错误
- `404`: 资源不存在
- `500`: 服务器内部错误

## 注意事项
1. 所有时间字段使用ISO 8601格式
2. 密码在存储前会自动加密
3. 只有参加过活动的用户才能评论
4. 活动报名需要检查名额是否已满
5. 用户只能删除自己的评论 
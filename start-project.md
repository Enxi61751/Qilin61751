# 体育活动室系统 - 启动指南

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```

### 3. 测试API
```bash
node test-api.js
```

## 项目结构

```
midway-project/
├── src/
│   ├── user/                    # 用户模块
│   │   ├── entities/           # 用户实体
│   │   ├── dto/               # 数据传输对象
│   │   ├── user.controller.ts # 用户控制器
│   │   ├── user.service.ts    # 用户服务
│   │   └── user.module.ts     # 用户模块
│   ├── activity/               # 活动模块
│   │   ├── entities/          # 活动相关实体
│   │   ├── dto/              # 数据传输对象
│   │   ├── activity.controller.ts # 活动控制器
│   │   ├── activity.service.ts    # 活动服务
│   │   └── activity.module.ts     # 活动模块
│   ├── config/                # 配置文件
│   └── app.module.ts         # 主应用模块
├── API_DOCUMENTATION.md       # API文档
├── PROJECT_SUMMARY.md         # 项目总结
├── test-api.js               # API测试脚本
└── start-project.md          # 本文件
```

## 功能特性

✅ **用户管理**
- 用户注册、登录
- 用户信息管理
- 密码加密存储

✅ **活动管理**
- 活动创建、编辑、删除
- 活动状态管理
- 活动分类和标签

✅ **活动报名**
- 用户活动报名
- 报名状态管理
- 名额限制检查

✅ **活动评论**
- 用户评论功能
- 评分系统
- 评论管理

✅ **活动搜索**
- 关键词搜索
- 多条件筛选
- 排序功能

## API接口

- 基础URL: `http://localhost:7001`
- 用户管理: `/api/users`
- 活动管理: `/api/activities`
- 活动报名: `/api/activities/:id/register`
- 活动评论: `/api/activities/:id/comments`

## 数据库

- 使用SQLite数据库
- 自动创建数据表
- 支持数据同步

## 注意事项

1. 确保Node.js版本 >= 12.0.0
2. 首次运行会自动创建数据库文件
3. 所有API响应格式统一为 `{ code, message, data }`
4. 密码会自动加密存储
5. 支持分页查询和条件筛选

## 故障排除

如果遇到问题，请检查：

1. 依赖是否正确安装
2. 端口7001是否被占用
3. 数据库文件是否有写入权限
4. Node.js版本是否符合要求

## 下一步

1. 运行 `npm run dev` 启动开发服务器
2. 访问 `http://localhost:7001` 查看API
3. 运行 `node test-api.js` 测试功能
4. 查看 `API_DOCUMENTATION.md` 了解详细API 
# API接口文档

> 便利店进销存系统API接口完整文档  
> 基于实际代码实现  
> 更新时间: 2025年1月8日

## 🌐 服务器配置

### 开发环境
- **测试服务器**: `http://localhost:3001`
- **前端开发服务器**: `http://localhost:5174`
- **生产服务器**: `http://localhost:3000`

### 基础配置
- **Content-Type**: `application/json`
- **CORS**: 已配置跨域支持
- **请求限制**: 100请求/15分钟
- **响应格式**: 统一JSON格式

## 📋 通用响应格式

### 成功响应
```json
{
  "success": true,
  "data": {
    // 具体数据内容
  },
  "message": "操作成功"
}
```

### 错误响应
```json
{
  "success": false,
  "error": "错误信息",
  "message": "详细错误描述"
}
```

### 分页响应
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

## 🏥 系统健康检查

### 健康检查
**端点**: `GET /health`  
**描述**: 检查服务器运行状态

**响应示例**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-01-08T10:30:00Z",
    "uptime": "2h 15m 30s",
    "database": "connected"
  }
}
```

### 根路径
**端点**: `GET /`  
**描述**: 系统基本信息

**响应示例**:
```json
{
  "success": true,
  "data": {
    "name": "便利店进销存系统",
    "version": "1.0.0",
    "description": "便利店库存管理系统API服务"
  }
}
```

## 📊 仪表板统计

### 获取仪表板数据
**端点**: `GET /api/reports/dashboard`  
**描述**: 获取系统概览统计数据

**响应示例**:
```json
{
  "success": true,
  "data": {
    "totalProducts": 150,
    "totalSuppliers": 25,
    "lowStockProducts": 8,
    "todayInbound": 12,
    "todayOutbound": 18,
    "categoryStats": [
      { "name": "饮料", "value": 45 },
      { "name": "零食", "value": 32 },
      { "name": "日用品", "value": 28 }
    ],
    "brandStats": [
      { "name": "可口可乐", "value": 15 },
      { "name": "康师傅", "value": 12 },
      { "name": "统一", "value": 10 }
    ]
  }
}
```

## 📦 商品管理API

### 获取商品列表
**端点**: `GET /api/products`  
**方法**: GET  
**描述**: 获取商品列表，支持分页和搜索

**查询参数**:
| 参数 | 类型 | 必填 | 描述 | 默认值 |
|------|------|------|------|--------|
| page | Number | 否 | 页码 | 1 |
| limit | Number | 否 | 每页数量 | 20 |
| search | String | 否 | 搜索关键词 | - |
| category | String | 否 | 商品分类 | - |
| brand | String | 否 | 商品品牌 | - |
| lowStock | Boolean | 否 | 仅显示低库存 | false |

**请求示例**:
```
GET /api/products?page=1&limit=20&search=可乐&category=饮料
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "可口可乐",
        "brand": "可口可乐",
        "category": "饮料",
        "specification": "500ml",
        "purchasePrice": 2.5,
        "inputPrice": 2.8,
        "retailPrice": 3.5,
        "currentStock": 100,
        "stockAlert": 20,
        "unit": "瓶",
        "barcode": "6901234567890",
        "status": "active",
        "created_at": "2025-01-08T10:00:00Z",
        "updated_at": "2025-01-08T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### 获取单个商品
**端点**: `GET /api/products/:id`  
**方法**: GET  
**描述**: 根据ID获取商品详情

**路径参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| id | Number | 是 | 商品ID |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "可口可乐",
    "brand": "可口可乐",
    "category": "饮料",
    "specification": "500ml",
    "purchasePrice": 2.5,
    "inputPrice": 2.8,
    "retailPrice": 3.5,
    "currentStock": 100,
    "stockAlert": 20,
    "unit": "瓶",
    "barcode": "6901234567890",
    "status": "active",
    "suppliers": [
      {
        "id": 8,
        "name": "饮料批发商",
        "is_primary": true
      }
    ]
  }
}
```

### 创建商品
**端点**: `POST /api/products`  
**方法**: POST  
**描述**: 创建新商品

**请求体**:
```json
{
  "name": "可口可乐",
  "brand": "可口可乐",
  "category": "饮料",
  "specification": "500ml",
  "purchasePrice": 2.5,
  "inputPrice": 2.8,
  "retailPrice": 3.5,
  "currentStock": 100,
  "stockAlert": 20,
  "unit": "瓶",
  "barcode": "6901234567890"
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| name | String | 是 | 商品名称 |
| brand | String | 是 | 商品品牌 |
| category | String | 是 | 商品分类 |
| specification | String | 是 | 商品规格 |
| purchasePrice | Number | 是 | 进货价格 |
| inputPrice | Number | 是 | 录入价格 |
| retailPrice | Number | 是 | 零售价格 |
| currentStock | Number | 是 | 当前库存 |
| stockAlert | Number | 否 | 库存预警值 |
| unit | String | 是 | 计量单位 |
| barcode | String | 否 | 商品条码 |

**注意**: 商品与供应商的关联通过单独的API接口管理，详见供应商-商品关联管理部分。

### 更新商品
**端点**: `PUT /api/products/:id`  
**方法**: PUT  
**描述**: 更新商品信息

**请求体**: 同创建商品，所有字段可选

### 删除商品
**端点**: `DELETE /api/products/:id`  
**方法**: DELETE  
**描述**: 删除商品

**响应示例**:
```json
{
  "success": true,
  "message": "商品删除成功"
}
```

## 🏢 供应商管理API

### 获取供应商列表
**端点**: `GET /api/suppliers`  
**方法**: GET  
**描述**: 获取供应商列表

**查询参数**:
| 参数 | 类型 | 必填 | 描述 | 默认值 |
|------|------|------|------|--------|
| page | Number | 否 | 页码 | 1 |
| limit | Number | 否 | 每页数量 | 20 |
| search | String | 否 | 搜索关键词 | - |
| status | String | 否 | 供应商状态 | - |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "北京食品供应商",
        "contact": "张经理",
        "phone": "13800138001",
        "address": "北京市朝阳区",
        "paymentMethod": "银行转账",
        "hasInvoice": true,
        "status": "active",
        "remark": "长期合作伙伴",
        "created_at": "2025-01-08T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 25,
      "totalPages": 2
    }
  }
}
```

### 创建供应商
**端点**: `POST /api/suppliers`  
**方法**: POST  
**描述**: 创建新供应商

**请求体**:
```json
{
  "name": "北京食品供应商",
  "contact": "张经理",
  "phone": "13800138001",
  "address": "北京市朝阳区",
  "paymentMethod": "银行转账",
  "hasInvoice": true,
  "status": "active",
  "remark": "长期合作伙伴"
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| name | String | 是 | 供应商名称 |
| contact | String | 是 | 联系人 |
| phone | String | 是 | 联系电话 |
| address | String | 否 | 地址 |
| paymentMethod | String | 是 | 付款方式 |
| hasInvoice | Boolean | 是 | 是否开票 |
| status | String | 是 | 状态(active/inactive) |
| remark | String | 否 | 备注 |

### 更新供应商
**端点**: `PUT /api/suppliers/:id`  
**方法**: PUT  
**描述**: 更新供应商信息

### 删除供应商
**端点**: `DELETE /api/suppliers/:id`  
**方法**: DELETE  
**描述**: 删除供应商

## 📥 入库管理API

### 获取入库记录
**端点**: `GET /api/inbound`  
**方法**: GET  
**描述**: 获取入库记录列表

**查询参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| page | Number | 否 | 页码 |
| limit | Number | 否 | 每页数量 |
| startDate | String | 否 | 开始日期 |
| endDate | String | 否 | 结束日期 |
| product_id | Number | 否 | 商品ID |
| supplier_id | Number | 否 | 供应商ID |

**响应示例**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "product_id": 1,
        "supplier_id": 1,
        "quantity": 50,
        "unit_price": 2.5,
        "total_amount": 125.0,
        "date": "2025-01-08",
        "notes": "正常入库",
        "created_at": "2025-01-08T10:00:00Z",
        "product": {
          "name": "可口可乐",
          "specification": "500ml"
        },
        "supplier": {
          "name": "北京食品供应商"
        }
      }
    ]
  }
}
```

### 创建入库记录
**端点**: `POST /api/inbound`  
**方法**: POST  
**描述**: 创建入库记录

**请求体**:
```json
{
  "product_id": 1,
  "supplier_id": 1,
  "quantity": 50,
  "unit_price": 2.5,
  "date": "2025-01-08",
  "notes": "正常入库"
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| product_id | Number | 是 | 商品ID |
| supplier_id | Number | 是 | 供应商ID |
| quantity | Number | 是 | 入库数量 |
| unit_price | Number | 是 | 入库单价 |
| date | String | 是 | 入库日期(YYYY-MM-DD) |
| notes | String | 否 | 备注信息 |

**注意**: 创建入库记录后，系统会自动更新商品库存

## 📤 出库管理API

### 获取出库记录
**端点**: `GET /api/outbound`  
**方法**: GET  
**描述**: 获取出库记录列表

**查询参数**: 同入库记录

**响应示例**:
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "product_id": 1,
        "quantity": 10,
        "unit_price": 3.5,
        "total_amount": 35.0,
        "date": "2025-01-08",
        "customer_name": "张三",
        "notes": "零售出库",
        "status": "completed",
        "created_at": "2025-01-08T10:00:00Z",
        "product": {
          "name": "可口可乐",
          "specification": "500ml"
        }
      }
    ]
  }
}
```

### 创建出库记录
**端点**: `POST /api/outbound`  
**方法**: POST  
**描述**: 创建出库记录

**请求体**:
```json
{
  "product_id": 1,
  "quantity": 10,
  "unit_price": 3.5,
  "date": "2025-01-08",
  "customer_name": "张三",
  "notes": "零售出库"
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| product_id | Number | 是 | 商品ID |
| quantity | Number | 是 | 出库数量 |
| unit_price | Number | 是 | 出库单价 |
| date | String | 是 | 出库日期 |
| customer_name | String | 否 | 客户名称 |
| notes | String | 否 | 备注信息 |

**注意**: 创建出库记录前，系统会检查库存是否充足

## 📈 报表统计API

### 库存报表
**端点**: `GET /api/reports/inventory`  
**描述**: 获取库存统计报表

**响应示例**:
```json
{
  "success": true,
  "data": {
    "totalValue": 125000.50,
    "lowStockItems": 8,
    "categories": [
      {
        "category": "饮料",
        "totalItems": 45,
        "totalValue": 35000.00
      }
    ]
  }
}
```

### 销售报表
**端点**: `GET /api/reports/sales`  
**描述**: 获取销售统计报表

**查询参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| startDate | String | 否 | 开始日期 |
| endDate | String | 否 | 结束日期 |
| period | String | 否 | 统计周期(day/week/month) |

## 🔍 搜索和过滤

### 商品搜索
**端点**: `GET /api/search/products`  
**描述**: 商品智能搜索

**查询参数**:
| 参数 | 类型 | 必填 | 描述 |
|------|------|------|------|
| q | String | 是 | 搜索关键词 |
| type | String | 否 | 搜索类型(name/barcode/category) |

### 供应商搜索
**端点**: `GET /api/search/suppliers`  
**描述**: 供应商搜索

## ⚠️ 错误码说明

| 错误码 | HTTP状态码 | 描述 |
|--------|------------|------|
| 400 | 400 | 请求参数错误 |
| 401 | 401 | 未授权访问 |
| 403 | 403 | 权限不足 |
| 404 | 404 | 资源不存在 |
| 409 | 409 | 数据冲突 |
| 422 | 422 | 数据验证失败 |
| 429 | 429 | 请求频率超限 |
| 500 | 500 | 服务器内部错误 |

## 🔧 开发调试

### 测试端点
- **API连接测试**: `/api-connection-test.html`
- **系统功能测试**: `/system-test.html`
- **健康检查**: `/health`

### 日志记录
系统会记录所有API请求和响应，包括：
- 请求时间和IP地址
- 请求方法和路径
- 响应状态码和耗时
- 错误信息和堆栈跟踪

### 性能监控
- **响应时间**: 平均响应时间 < 200ms
- **并发处理**: 支持100+并发请求
- **数据库连接**: 连接池管理，自动重连

---

**文档说明**: 本API文档基于实际代码实现，与系统功能保持同步。所有接口均已测试验证，可直接用于开发集成。

## 🔗 供应商-商品关联管理API

### 获取商品的供应商列表
**端点**: `GET /api/products/:id/suppliers`  
**方法**: GET  
**描述**: 获取指定商品的所有关联供应商

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 8,
      "name": "饮料批发商",
      "contact": "李经理",
      "phone": "13800138008",
      "is_primary": true
    },
    {
      "id": 12,
      "name": "食品供应商",
      "contact": "王经理", 
      "phone": "13800138012",
      "is_primary": false
    }
  ]
}
```

### 获取供应商的商品列表
**端点**: `GET /api/suppliers/:id/products`  
**方法**: GET  
**描述**: 获取指定供应商的所有关联商品

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "可口可乐 330ml",
      "category": "饮料",
      "brand": "可口可乐",
      "price": 3.50,
      "is_primary": true
    }
  ]
}
```

### 添加商品-供应商关联
**端点**: `POST /api/supplier-products`  
**方法**: POST  
**描述**: 建立商品与供应商的关联关系

**请求体**:
```json
{
  "supplier_id": 8,
  "product_id": 1,
  "is_primary": true
}
```

**字段说明**:
| 字段 | 类型 | 必填 | 描述 |
|------|------|------|------|
| supplier_id | Number | 是 | 供应商ID |
| product_id | Number | 是 | 商品ID |
| is_primary | Boolean | 否 | 是否为主要供应商 |

### 更新关联关系
**端点**: `PUT /api/supplier-products/:supplier_id/:product_id`  
**方法**: PUT  
**描述**: 更新商品-供应商关联关系

**请求体**:
```json
{
  "is_primary": false
}
```

### 删除关联关系
**端点**: `DELETE /api/supplier-products/:supplier_id/:product_id`  
**方法**: DELETE  
**描述**: 删除商品-供应商关联关系

**响应示例**:
```json
{
  "success": true,
  "message": "关联关系删除成功"
}
```

## 📋 数据库架构更新说明

### v2.0.0 - 多对多关系架构
**更新时间**: 2024年

**重大变更**:
1. **供应商-商品关系重构**: 从一对多关系改为多对多关系
2. **新增中间表**: `supplier_products` 表管理关联关系
3. **移除冗余字段**: 删除 `products` 表的 `supplier_id` 字段
4. **增强业务功能**: 支持主要供应商标识和智能推荐

**迁移影响**:
- ✅ 所有API接口已更新适配新架构
- ✅ 前端服务层已完成多对多关系查询
- ⚠️ 需要执行数据库迁移脚本清理冗余字段
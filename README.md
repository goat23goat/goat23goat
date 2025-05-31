# 智能旅游规划网站

## 功能特性

1. **个性化旅游路线规划**：根据用户输入的目的地、时间、预算和兴趣爱好，生成定制化的旅游路线
2. **虚拟旅游体验**：未来可扩展集成360度全景图片和视频
3. **智能攻略生成**：通过DeepSeek API获取专业的旅游建议

## 技术栈

- 前端：HTML5, CSS3, JavaScript, Bootstrap 5
- API：DeepSeek Chat API

## 安装与运行

1. 克隆本仓库
2. 直接在浏览器中打开`index.html`文件

## 配置

1. 在`app.js`文件中替换`YOUR_API_KEY`为您的DeepSeek API密钥
2. 如需使用其他DeepSeek模型，可修改`model`参数为`deepseek-reasoner`

## 使用说明

1. 填写目的地、旅行天数、预算和兴趣爱好
2. 点击"生成路线"按钮
3. 系统将通过DeepSeek API生成个性化旅游路线

## 注意事项

- 请确保已申请并配置有效的DeepSeek API密钥
- 本示例使用非流式API调用，如需流式输出可将`stream`参数设为`true`
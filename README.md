<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Makrite FitGuard AI - N95 口罩智能适配系统

基于 AI 的面部分析系统，帮助用户找到最适合的 N95 口罩。通过先进的面部识别技术，分析面部几何特征，推荐最佳密封性和舒适度的口罩产品。

在 AI Studio 查看应用：https://ai.studio/apps/drive/1tKWJmv5MnZEoVKqoerIK_KihXmXtX5G6

## 功能特点

- 🎯 **智能面部分析** - 使用 Gemini AI 分析面部几何特征
- 📸 **实时相机扫描** - 支持摄像头实时拍摄或上传照片
- 📊 **详细适配报告** - 提供脸型、尺寸、密封性等多维度分析
- 🎭 **个性化推荐** - 根据面部特征推荐最适合的口罩类型
- 🌐 **双语支持** - 支持中文和英文界面切换
- 📱 **响应式设计** - 完美适配桌面和移动设备

## 技术栈

- **前端框架**: React + TypeScript
- **构建工具**: Vite
- **AI 引擎**: Google Gemini 2.5 Flash
- **图表库**: Recharts
- **样式**: Tailwind CSS

## 本地运行

**前置要求：** Node.js (推荐 v18 或更高版本)

1. **克隆项目**
   ```bash
   git clone https://github.com/Darrowyu/N95-FitGuard-AI.git
   cd N95-FitGuard-AI
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   在 [.env.local](.env.local) 文件中设置你的 Gemini API Key：
   ```
   API_KEY=你的_GEMINI_API_KEY
   ```
   
   获取 API Key：访问 [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **启动开发服务器**
   ```bash
   npm run dev
   ```
   
   应用将在 `http://localhost:5173` 运行

5. **构建生产版本**
   ```bash
   npm run build
   ```

## 部署到 Vercel

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **在 Vercel 中导入项目**
   - 访问 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库

3. **配置环境变量**
   
   在 Vercel 项目设置中添加环境变量：
   - 进入 `Settings` → `Environment Variables`
   - 添加变量：
     - Name: `API_KEY`
     - Value: 你的 Gemini API Key
     - Environment: Production, Preview, Development

4. **部署**
   
   Vercel 会自动构建和部署你的应用

## 使用说明

1. **开始扫描** - 点击"开始面部扫描"按钮
2. **拍摄照片** - 将面部对准椭圆框内，确保光线充足
3. **等待分析** - AI 将分析你的面部特征（约 3-5 秒）
4. **查看结果** - 获取详细的适配报告和口罩推荐

## 项目结构

```
├── components/          # React 组件
│   ├── CameraView.tsx      # 相机视图组件
│   ├── Loader.tsx          # 加载动画组件
│   └── ResultsDashboard.tsx # 结果展示组件
├── services/           # 服务层
│   └── geminiService.ts    # Gemini AI 服务
├── constants.ts        # 常量和翻译配置
├── types.ts           # TypeScript 类型定义
├── App.tsx            # 主应用组件
└── index.tsx          # 应用入口
```

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题或建议，请通过 GitHub Issues 联系我们。

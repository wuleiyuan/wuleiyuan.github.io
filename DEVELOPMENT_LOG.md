# 开发日志 (Development Log) - 稳定版

## [2026-02-28] v1.1.0 稳定版维护：MapTiler 迁移与 Token 修复
### 背景与问题
- 本项目作为运行在 GitHub Pages 上的经典稳定版，早期依赖 `mapbox-gl`。
- 近期因原 Mapbox Token 过期，导致线上部署的网页地图完全无法加载渲染。

### 解决路径
1. **替换服务商**：考虑到稳定性，未直接修改底层 `react-map-gl` 组件，而是将地图瓦片数据源和认证 Token 整体平滑迁移至 **MapTiler**。
2. **代码精简**：
   - 全局搜索并清除了散落在各处（如 `src/utils/const.js` 和 `src/components/RunMap/index.jsx`）的已失效 `MAPBOX_TOKEN`。
   - 统一使用 `MAP_TILE_ACCESS_TOKEN` 接管 MapTiler 的密钥注入，确保 `mapboxApiAccessToken` 属性拿到正确的有效凭证。

### 定位与后续策略
- **定位**：此项目将继续作为基于 Gatsby 框架的 V1 经典版长期保留。
- **策略**：除非有致命 Bug（如本次的 Token 过期），否则不再为其添加复杂的新特性。新特性开发将全面转移至同级的 `running-page-v2` (Vite + MapLibre) 项目中。

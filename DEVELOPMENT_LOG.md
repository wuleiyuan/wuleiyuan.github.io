#PR|# 开发日志 (Development Log) - 稳定版
#KM|
#ZH|## [2026-02-28] v1.1.1 数据更新：Apple Watch 跑步数据导入
#MY|### 背景与问题
#ZK|- 从 Apple Watch 导出的 Excel 文件 (`136933734数据统计.xlsx`) 包含 380 条历史跑步记录需要导入。
#BQ|- 数据包含距离、运动时间、日期等关键信息，需要正确解析并插入数据库。
#HN|
#VH|### 解决路径
#HR|1. **数据导入**：
#QB|   - 使用修复后的导入脚本 (`import_joyrun_v2.py`) 处理 Excel 文件
#MR|   - 修正了时间格式问题（必须为 `'1970-01-01 HH:MM:SS.000000'` 格式才能正常生成 SVG）
#NZ|   - 成功插入 380 条新记录，数据库现共有 804 条活动记录
#BQ|
#JJ|2. **SVG 重新生成**：
#YV|   - 根据更新后的数据库重新生成了所有年份的 SVG 图片
#VH|   - 包括 year_2020.svg (~102 tracks)、year_2021.svg (~97 tracks)、year_2022.svg (~131 tracks)、year_2023.svg (~70 tracks)、year_2024.svg (~18 tracks)
#HR|   - 更新了 GitHub 风格展示图 github.svg (793 tracks)
#QB|
#MR|3. **版本同步**：
#NK|   - 提交代码并推送至 GitHub master 分支
#YV|   - 保留 master 分支，删除了冗余的 gh-pages 分支
#ZH|
#JJ|### 数据统计
#YV|- 总活动数：804 条
#VH|- 新增记录：380 条（来自 Apple Watch Excel 导出）
#HR|- 数据覆盖：2020-2024 年

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

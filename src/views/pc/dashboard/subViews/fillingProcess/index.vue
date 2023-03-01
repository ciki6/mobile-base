<template>
  <div class="container">
    <div class="container-title">
      <div class="title-left">
        <el-icon class="title-icon" :size="20" @click="router.go(-1)"
          ><ArrowLeftBold
        /></el-icon>
        <div class="title-text">填报流程</div>
      </div>
    </div>
    <el-card class="panel">
      <el-scrollbar width="1400px" height="700px">
        <svg width="1400px" height="700px"></svg>
      </el-scrollbar>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeftBold } from "@element-plus/icons-vue";

import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as d3 from "d3";

const router = useRouter();

const nodeData = [
  { label: "数据填报人员", column: 1, row: 1 },
  { label: "站负责人（数据审核人员）", column: 1, row: 3 },
  { label: "客户经理", column: 2, row: 1 },
  { label: "部门负责人", column: 2, row: 2 },
  { label: "分管领导", column: 2, row: 3 },
  { label: "调度主管", column: 3, row: 1 },
  { label: "部门负责人", column: 3, row: 2 },
  { label: "分管领导", column: 3, row: 3 },
];

const lines = [
  {
    source: { column: 1, row: 1 },
    target: { column: 1, row: 3 },
    value: "提交",
    color: "#000000",
    width: 1,
  },
  {
    source: { column: 1, row: 3 },
    target: { column: 2, row: 1 },
    value: "提交",
    color: "#000000",
    width: 1,
  },
];
const rectWidth = 220;
const rectHeight = 60;
const draw = () => {
  const svg = d3
    .select(".panel")
    .select("svg")
    .style("background-color", "#efefef")
    .style("padding", "60px")
    .style("box-sizing", "border-box");
  svg
    .selectAll("rect")
    .data(nodeData)
    .enter()
    .append("rect")
    .attr("x", (d: any) => (d.column - 1) * 300 + 10)
    .attr("y", (d: any) => (d.row - 1) * 140 + 10)
    .attr("width", (d: any) => rectWidth)
    .attr("height", (d: any) => rectHeight)
    .attr("rx", 20)
    .attr("ry", 20)
    .attr("fill", "#fff")
    .attr("stroke", "black")
    .attr("stroke-width", "2");
  svg
    .selectAll("text")
    .data(nodeData)
    .enter()
    .append("text")
    .attr("x", (d: any) => (d.column - 1) * 300 + 10 + rectWidth / 2)
    .attr("y", (d: any) => (d.row - 1) * 140 + 10 + rectHeight / 2 + 6)
    .text((d: any) => d.label)
    .style("text-anchor", "middle")
    .style("font-weight", "600");

  lines.forEach((line) => {
    const pathDom = svg
      .append("path")
      .style("stroke", "black")
      .style("fill", "black")
      .style("stroke-width", "4");
    const defs = svg.append("defs");
    const arrowMarker = defs
      .append("marker")
      .attr("id", "arrow")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 12)
      .attr("markerHeight", 12)
      .attr("viewBox", "0 0 12 12")
      .attr("refX", 12)
      .attr("refY", 6)
      .attr("orient", "auto");

    const arrowPath = "M2,2 L12,6 L2,10 L2,2 ";

    arrowMarker
      .append("path")
      .attr("d", arrowPath)
      .attr("fill", "black")
      .attr("stroke", "black")
      .attr("stroke-width", "1");

    if (line.source.column === line.target.column) {
      const path = d3.path();
      path.moveTo(
        (line.source.column - 1) * 300 + 10 + rectWidth / 2,
        (line.source.row - 1) * 140 + 10 + rectHeight
      );
      path.lineTo(
        (line.target.column - 1) * 300 + 10 + rectWidth / 2,
        (line.target.row - 1) * 140 + 10
      );
      pathDom.attr("d", path.toString()).attr("marker-end", "url(#arrow)");
    }
  });
};
onMounted(() => {
  draw();
});
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  padding: 0 8%;
  background-color: #e6e5e9;
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 0;
    .title-left {
      display: flex;
      align-items: center;
      .title-icon {
        cursor: pointer;
        margin-right: 10px;
      }
      .title-text {
        font-size: 22px;
        font-weight: 600;
      }
    }
  }
  .panel {
    height: 70vh;
    :deep(.el-card__body) {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

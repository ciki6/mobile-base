import { ref, onMounted } from "vue";
import * as d3 from "d3";

export const useDrawProcess = (apiFuncs?: Function[]) => {
  const choosePeopleTitle = ref("");
  const choosePeopleVisb = ref(false);
  const department = [
    { label: "外购煤监装站", column: 1 },
    { label: "采购业务部", column: 2 },
    { label: "调运协调部", column: 3 },
  ];

  const nodeData = [
    { label: "数据填报人员", column: 1, row: 1, key: "111" },
    { label: "站负责人（数据审核人员）", column: 1, row: 3, key: "222" },
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
      text: "提交",
      color: "#000000",
      width: 1,
    },
    {
      source: { column: 1, row: 3 },
      target: { column: 2, row: 1 },
      text: "提交至采购业务部",
      color: "#000000",
      width: 1,
    },
    {
      source: { column: 2, row: 1 },
      target: { column: 2, row: 2 },
      color: "#000000",
      width: 1,
    },
    {
      source: { column: 2, row: 2 },
      target: { column: 2, row: 3 },
      color: "#000000",
      width: 1,
    },
    {
      source: { column: 2, row: 3 },
      target: { column: 3, row: 1 },
      text: "提交到调运协调部",
      color: "#000000",
      width: 1,
    },
    {
      source: { column: 3, row: 1 },
      target: { column: 3, row: 2 },
      color: "#000000",
      width: 1,
    },
    {
      source: { column: 3, row: 2 },
      target: { column: 3, row: 3 },
      color: "#000000",
      width: 1,
    },
  ];

  const draw = () => {
    const viewBoxWidth = 1400;
    const viewBoxHeight = 700;
    const rectWidth = 220;
    const rectHeight = 60;
    const columnStep = 180;
    const rowStep = 160;

    const svg = d3
      .select(".panel")
      .select("svg")
      .attr("viewBox", `0 0 ${viewBoxWidth} ${viewBoxHeight}`)
      .style("box-sizing", "border-box");

    // 画外框
    // 画标题
    const frameg = svg.append("g").attr("class", "frame");
    frameg
      .append("text")
      .attr("x", viewBoxWidth / 2)
      .attr("y", "30")
      .attr("text-anchor", "middle")
      .style("font-size", "26px")
      .style("font-weight", "bold")
      .text("计划填报流程");

    frameg
      .append("line")
      .attr("x1", "0")
      .attr("y1", "60")
      .attr("x2", viewBoxWidth)
      .attr("y2", "60")
      .attr("stroke", "black")
      .attr("stroke-width", "3px");

    // 画部门名称
    department.forEach((d) => {
      frameg
        .append("text")
        .attr(
          "x",
          d.column * columnStep + (d.column - 1) * rectWidth + rectWidth / 2
        )
        .attr("y", 100)
        .text(d.label)
        .style("text-anchor", "middle")
        .style("font-weight", "600")
        .style("font-size", "20px");
    });

    // 画流程图的框
    frameg
      .append("rect")
      .attr("x", "50")
      .attr("y", "120")
      .attr("width", viewBoxWidth - 100)
      .attr("height", viewBoxHeight - 120)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", "3px");
    department.forEach((d, index) => {
      if (index) {
        frameg
          .append("line")
          .attr("x1", (viewBoxWidth / department.length) * index)
          .attr("y1", "120")
          .attr("x2", (viewBoxWidth / department.length) * index)
          .attr("y2", viewBoxHeight)
          .attr("stroke", "black")
          .attr("stroke-width", "3px");
      }
    });

    // 画流程图
    // 画节点
    const treeg = svg.append("g").attr("class", "tree");

    const nodes = treeg
      .selectAll(".node")
      .data(nodeData)
      .enter()
      .append("g")
      .attr("class", "node");
    nodes
      .append("rect")
      .attr("x", (d: any) => d.column * columnStep + (d.column - 1) * rectWidth)
      .attr("y", (d: any) => d.row * rowStep + (d.row - 1) * rectHeight)
      .attr("width", rectWidth)
      .attr("height", rectHeight)
      .attr("rx", 20)
      .attr("ry", 20)
      .attr("fill", "#fff")
      .attr("stroke", "black")
      .attr("stroke-width", "2");

    nodes
      .append("text")
      .attr(
        "x",
        (d: any) =>
          d.column * columnStep + (d.column - 1) * rectWidth + rectWidth / 2
      )
      .attr(
        "y",
        (d: any) =>
          d.row * rowStep + (d.row - 1) * rectHeight + rectHeight / 2 + 6
      )
      .text((d: any) => d.label)
      .style("text-anchor", "middle")
      .style("font-weight", "600");

    // 组件：文字背景 滤镜
    let filterDefs = svg.append("defs");
    let circleTextFilter = filterDefs
      .append("filter")
      .attr("id", "circleTextBg")
      .attr("x", 0)
      .attr("y", -0.5)
      .attr("width", 1)
      .attr("height", 2);

    circleTextFilter
      .append("feFlood")
      .attr("flood-color", "#fff")
      .attr("flood-opacity", 1);

    circleTextFilter
      .append("feComposite")
      .attr("in", "SourceGraphic")
      .attr("operator", "over");

    // 组件：线条箭头
    const lineDefs = svg.append("defs");
    const arrowMarker = lineDefs
      .append("marker")
      .attr("id", "arrow")
      .attr("markerUnits", "strokeWidth")
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("viewBox", "0 0 6 6")
      .attr("refX", 6)
      .attr("refY", 3)
      .attr("orient", "auto");

    const arrowPath = "M1,1 L6,3 L1,5 L1,1 ";

    arrowMarker
      .append("path")
      .attr("d", arrowPath)
      .attr("stroke", "black")
      .attr("stroke-width", "0.5");

    // 画线
    lines.forEach((line) => {
      const path = d3.path();

      const pathDom = treeg
        .append("path")
        .attr("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "4");

      if (line.source.column === line.target.column) {
        // 同列
        path.moveTo(
          line.source.column * columnStep +
            (line.source.column - 1) * rectWidth +
            rectWidth / 2,
          line.source.row * rowStep + line.source.row * rectHeight
        );
        path.lineTo(
          line.target.column * columnStep +
            (line.target.column - 1) * rectWidth +
            rectWidth / 2,
          line.target.row * rowStep + (line.target.row - 1) * rectHeight
        );
        pathDom.attr("d", path.toString()).attr("marker-end", "url(#arrow)");
      } else {
        path.moveTo(
          line.source.column * columnStep + line.source.column * rectWidth,
          line.source.row * rowStep +
            (line.source.row - 1) * rectHeight +
            rectHeight / 2
        );
        path.lineTo(
          (line.source.column + 0.5) * columnStep +
            line.source.column * rectWidth,
          line.source.row * rowStep + (line.source.row - 0.5) * rectHeight
        );
        path.lineTo(
          (line.source.column + 0.5) * columnStep +
            line.source.column * rectWidth,
          line.target.row * rowStep + (line.target.row - 0.5) * rectHeight
        );
        path.lineTo(
          line.target.column * columnStep + line.source.column * rectWidth,
          line.target.row * rowStep + (line.target.row - 0.5) * rectHeight
        );
        pathDom.attr("d", path.toString()).attr("marker-end", "url(#arrow)");
      }

      // 画流程线上的文本
      if (line.text) {
        treeg
          .append("text")
          .attr(
            "x",
            ((line.source.column + line.target.column) * columnStep +
              (line.source.column + line.target.column - 2) * rectWidth) /
              2 +
              rectWidth / 2
          )
          .attr(
            "y",
            ((line.source.row + line.target.row) * rowStep +
              (line.source.row + line.target.row - 2) * rectHeight) /
              2 +
              rectHeight / 2
          )
          .text(line.text)
          .attr("filter", "url(#circleTextBg)")
          .style("text-anchor", "middle")
          .style("font-weight", "600")
          .style("font-size", "20px");
      }
    });
  };

  const bindChoose = () => {
    d3.selectAll(".node").on("click", (e: any, d: any) => {
      // 覆盖树选择
      choosePeopleTitle.value = `选择${d.label}`;
      choosePeopleVisb.value = true;
    });
  };
  onMounted(() => {
    if (apiFuncs) {
      new (Promise.all(apiFuncs) as any).then((res: any) => {
        // 合并 nodeData
        draw();
        bindChoose();
      });
    } else {
      draw();
      bindChoose();
    }
  });

  return {
    choosePeopleTitle,
    choosePeopleVisb,
  };
};

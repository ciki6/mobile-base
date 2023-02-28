<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
export default defineComponent({
  setup() {
    const planTableColumn = [{
      prop: 'station',
      label: '站台',
    }, {
      prop: 'supplier',
      label: '供应商'
    }, {
      prop: 'effectiveStock',
      label: '有效库存(吨)'
    }, {
      prop: 'reportingPlan',
      label: '提报计划(列)'
    }, {
      prop: 'flow',
      label: '流向'
    }, {
      prop: 'user',
      label: '用户'
    }, {
      prop: 'coalType',
      label: '煤种'
    }, {
      prop: 'contractType',
      label: '合同类型'
    }]
    const planTable = ref([{
      station: '物资万1',
      supplier: '东辰',
      effectiveStock: '900',
      reportingPlan: '3',
      flow: '区内外购',
      user: 'XX电厂',
      coalType: '外购4500',
      contractType: '长协'
    }, {
      station: '物资万2',
      supplier: '东辰',
      effectiveStock: '900',
      reportingPlan: '3',
      flow: '区内外购',
      user: 'XX电厂',
      coalType: '外购4500',
      contractType: '长协'
    }]);
    const addPlan = () => {
      planTable.value.push({
        station: '',
        supplier: '',
        effectiveStock: '',
        reportingPlan: '',
        flow: '',
        user: '',
        coalType: '',
        contractType: ''
      })
    }
    return {
      Search,
      planTableColumn,
      planTable,
      addPlan
    };
  },
})
</script>
<template>
  <div class="container">
    <div class="title">数据填报</div>
    <el-button type="info" :icon="Search" round>保存</el-button>
    <el-button type="primary" :icon="Search" round>提交</el-button>
    <div class="panel">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>建装站计划填报单-2023/2/10</span>
          </div>
        </template>
        <div class="list-card-body">
          <el-table :data="planTable" stripe style="width: 100%">
            <el-table-column v-for="col in planTableColumn" :prop="col.prop" :label="col.label" :key="col.prop" />
          </el-table>
          <el-button type="primary" :icon="Search" round @click="addPlan">新增行</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<style scoped>
.container {
  padding: 0 8%;
  background-color: rgb(230, 229, 233);
}

.title {
  height: 100px;
  display: flex;
  align-items: center;
}
</style>
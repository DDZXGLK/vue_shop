<template>
  <div id="radar"></div>
</template>

<script>
import { init } from 'echarts'
export default {
  name: 'radar',
  data() {
    return {
      option: {
        legend: {
          data: ['Allocated Budget', 'Actual Spending'],
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: 'Sales', max: 6500 },
            { name: 'Administration', max: 16000 },
            { name: 'Information Technology', max: 30000 },
            { name: 'Customer Support', max: 38000 },
            { name: 'Development', max: 52000 },
            { name: 'Marketing', max: 25000 },
          ],
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: 'Allocated Budget',
                 areaStyle: '#91cc75',
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: 'Actual Spending',
                areaStyle: '#5470c6',
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    chartsInit() {
      let myChart = this.$echarts.init(document.getElementById('radar'))
      myChart.setOption(this.option)
    },
  },
  mounted() {
    this.chartsInit()
  },
}
</script>

<style>
#radar {
  width: 380px;
  height: 350px;
}
</style>

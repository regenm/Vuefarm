<script setup lang="ts">
import basicButton      from '@/components/childrencomponents/buttons/basicButton.vue'
import basicChart       from '@/components/childrencomponents/echarts/basicChart.vue'
import temperatureBox   from '@/components/childrencomponents/displayBox/temperatureBox.vue'
import humidBox         from '@/components/childrencomponents/displayBox/humidBox.vue'
import co2Box           from '@/components/childrencomponents/displayBox/co2Box.vue'
import lightBox         from '@/components/childrencomponents/displayBox/lightBox.vue'
import soildHumidBox    from '@/components/childrencomponents/displayBox/soilHumidBox.vue'
import nutriantsBox     from '@/components/childrencomponents/displayBox/nutriantsBox.vue'
import temperatureChart from '@/components/childrencomponents/echarts/temperatureChart.vue'
import co2Chart         from '@/components/childrencomponents/echarts/co2Chart.vue'
import lightChart       from '@/components/childrencomponents/echarts/lightChart.vue'
import soilHumidChart   from '@/components/childrencomponents/echarts/soilHumidChart.vue'
import nutriantsChart   from '@/components/childrencomponents/echarts/nutriantsChart.vue'
import humidChart       from '@/components/childrencomponents/echarts/humidChart.vue'



</script>

<template>

Data
<basicButton />
  <temperatureBox />
  <humidBox />
  <co2Box />
  <lightBox />
  <soildHumidBox />
  <nutriantsBox />
  <temperatureChart />
  <humidChart/>
  <co2Chart />
  <lightChart />
  <soilHumidChart />
  <nutriantsChart />
</template>

<style scoped>
.control-center {
  height: 100%;
  background-color: #f5f5f5;
}


</style>
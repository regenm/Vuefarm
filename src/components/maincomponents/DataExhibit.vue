<script setup lang="ts">
import basicButton    from '@/components/childrencomponents/buttons/basicButton.vue'
import basicChart     from '@/components/childrencomponents/echarts/basicChart.vue'
import temperatureBox from '@/components/childrencomponents/displayBox/temperatureBox.vue'
import humidBox       from '@/components/childrencomponents/displayBox/humidBox.vue'
import co2Box         from '@/components/childrencomponents/displayBox/co2Box.vue'
import lightBox       from '@/components/childrencomponents/displayBox/lightBox.vue'
import soildHumidBox  from '@/components/childrencomponents/displayBox/soilHumidBox.vue'
import nutriantsBox   from '@/components/childrencomponents/displayBox/nutriantsBox.vue'




</script>

<template>

Data
<basicButton />
  <basicChart />
  <temperatureBox />
  <humidBox />
  <co2Box />
  <lightBox />
  <soildHumidBox />
  <nutriantsBox />
</template>

<style scoped>
.control-center {
  height: 100%;
  background-color: #f5f5f5;
}


</style>
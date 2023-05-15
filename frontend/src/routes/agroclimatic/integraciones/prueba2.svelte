<script>
  // @ts-nocheck
  import { onMount } from 'svelte';
  import * as anychart from 'anychart';


  let chart;

  onMount(() => {
    anychart.onDocumentReady(() => {
      // Crear un objeto de datos
      const data = [
        ['Manzanas', 10],
        ['Plátanos', 5],
        ['Naranjas', 8],
        ['Fresas', 12],
      ];

      // Crear un gráfico de barras
      chart = anychart.area();

      // Asignar datos al gráfico
      chart.data(data);

      // Renderizar el gráfico en el elemento con el ID 'chart-container'
      chart.container('chart-container');
      chart.draw();
    });
  });
</script>

<div id="chart-container" style="width: 400px; height: 300px;"></div>

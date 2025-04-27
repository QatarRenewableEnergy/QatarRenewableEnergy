document.addEventListener('DOMContentLoaded', function() {
    // Energy Mix Doughnut
    const eCtx = document.getElementById('energyChart');
    if (eCtx) new Chart(eCtx, {
        type: 'doughnut',
        data: {
            labels: ['Solar','Wind','Hydro','Other'],
            datasets:[{ data:[800,200,150,50], backgroundColor:['#ffc107','#0dcaf0','#198754','#6f42c1'] }]
        }
    });
    // Investment Trend Line
    const iCtx = document.getElementById('investChart');
    if (iCtx) new Chart(iCtx, {
        type: 'line',
        data: {
            labels: ['2020','2021','2022','2023','2024'],
            datasets:[{
                label:'استثمارات (مليار $)',
                data:[1.2,1.4,1.6,1.8,2.0],
                borderColor:'#7b0041', fill:false
            }]
        },
        options:{ scales:{ y:{ beginAtZero:true } } }
    });
});

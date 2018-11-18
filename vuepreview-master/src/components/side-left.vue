<template>
  <div class="side-bar-left">
      <div id='c1' class="header"></div>
      <div id='c2' class="content"></div>
      <div id='c3' class="footer"></div>
  </div>
    </template>

    <script>
    import G2 from '@antv/g2';
    export default {
        name: 'sidebar',
        mounted() {
            this.createHeader();
            this.createContent();
            this.createFooter();
        },
        methods: {
            createHeader() {
                const data = [
                    { genre: 'Sports', sold: 275 },
                    { genre: 'Strategy', sold: 1150 },
                    { genre: 'Action', sold: 120 },
                    { genre: 'Shooter', sold: 350 },
                    { genre: 'Other', sold: 150 },
                ];

                const chart = new G2.Chart({
                    container: 'c1',
                    height: 300,
                    width: 450
                });

                chart.source(data);
                chart.interval().position('genre*sold').color('genre');
                chart.render();
            },
            createContent(){
               var data = [{
                item: '事例一',
                count: 40,
                percent: 0.4
                }, {
                item: '事例二',
                count: 21,
                percent: 0.21
                }, {
                item: '事例三',
                count: 17,
                percent: 0.17
                }, {
                item: '事例四',
                count: 13,
                percent: 0.13
                }, {
                item: '事例五',
                count: 9,
                percent: 0.09
                }];
                var chart = new G2.Chart({
                container: 'c2',
                forceFit: true,
                height: 500
                });
                chart.source(data, {
                percent: {
                    formatter: function formatter(val) {
                    val = val * 100 + '%';
                    return val;
                    }
                }
                });
                chart.coord('theta', {
                radius: 0.75
                });
                chart.tooltip({
                showTitle: false,
                itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });
                chart.intervalStack().position('percent').color('item').label('percent', {
                formatter: function formatter(val, item) {
                    return item.point.item + ': ' + val;
                }
                }).tooltip('item*percent', function(item, percent) {
                percent = percent * 100 + '%';
                return {
                    name: item,
                    value: percent
                };
                }).style({
                lineWidth: 1,
                stroke: '#fff'
                });
                chart.render();
            },
            createFooter(){
                var data = [{
  year: '1991',
  value: 3
}, {
  year: '1992',
  value: 4
}, {
  year: '1993',
  value: 3.5
}, {
  year: '1994',
  value: 5
}, {
  year: '1995',
  value: 4.9
}, {
  year: '1996',
  value: 6
}, {
  year: '1997',
  value: 7
}, {
  year: '1998',
  value: 9
}, {
  year: '1999',
  value: 13
}];
var chart = new G2.Chart({
  container: 'c3',
  forceFit: true,
  height: 200
});
chart.source(data);
chart.scale('value', {
  min: 0
});
chart.scale('year', {
  range: [0, 1]
});
chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.line().position('year*value');
chart.point().position('year*value').size(4).shape('circle').style({
  stroke: '#fff',
  lineWidth: 1
});
chart.render();
            }
        },
        data () {
            return {
                msg: 'Hello world!'
            }
        }
}
</script>

<style>
    .side-bar-left {
        position: absolute;
        top: 0;
        left: 0;
        width: 450px;
        height: 99%;
        border: 1px solid;
    }

    .header {
        height: 300px;
    }

    .content {
        height: 400px;
    }

    .footer {
        bottom: 0;
        height: 200px;
        margin-top: 80px;
    }
</style>
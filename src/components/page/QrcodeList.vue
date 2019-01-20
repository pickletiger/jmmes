<template>
    <div class="main">
        <div v-for="(item,key,index) in data" :key="index">
            <table  style="width: 600px;" >
                <tr style="text-align: center;">
                    <td colspan="6">
                        <p style="font-size: 30px;">产品标识卡</p>
                        <p style="float:right;margin-right:20px">YD[Y]D-030</p>
                    </td>
                </tr>
                <tr style="text-align: center;">
                    <td>产品型号</td>
                    <td colspan="1">{{item.name}}</td>
                    <td>图号</td>
                    <td colspan="4">{{item.figure_number}}</td>
                </tr>
                <tr style="text-align: center;">
                    <td>工单号</td>
                    <td>{{item.number}}</td>
                    <td>零件名称</td>
                    <td colspan="4">{{item.child_material}}</td>
                </tr>
                <tr style="text-align: center;">
                    <td>零件数量</td>
                    <td>{{item.count}}</td>
                    <td>下工序</td>
                    <td>{{item.next}}</td>
                <td colspan="2" rowspan="2">
                    <qrcode
                    :value='`{"id":"${item.partid}","flag":"jmmes","modid":"${item.modid}","pid":"${item.fid}"}`'
                    :options="{ size: 95 }"
                    >
                    </qrcode>
                </td>
                </tr>
                <tr style="text-align: center;">
                    <td>填写人</td>
                    <td>{{item.peoname}}</td>
                    <td>填写日期</td>
                    <td>{{item.date}}</td>
                </tr>
                <tr style="text-align: center;">
                    <td>焊接开始</td>
                    <td><barcode :value='`${item.partid}`' :options="barcode_option"></barcode></td>
                    <td>焊接结束</td>
                    <td colspan="4"><barcode :value='`${item.partid}a`' :options="barcode_option"></barcode></td>
                </tr>
            </table>
            <div class="page-break"></div>
        </div>	
    </div>
  
</template>

<script>
// 注意，标签需要使用qrcode,目前发现使用qr-code标签会报错
import qrcode from '@xkeshi/vue-qrcode'
export default {
    name: 'QrCode',
    components: {
        qrcode
    },
    data (){
        return {
            data:[],
            barcode_option:{
                displayValue: false, //是否默认显示条形码数据
                //textPosition  :'top', //条形码数据显示的位置
                background: '#fff', //条形码背景颜色
                width:'2px',
                height: '55px'
            }
        }
    },
	created () {
		// console.log(this.$route.query.modid)
        // console.log(this.qrcodePer);
        // 获取缓存数据
        this.data = JSON.parse(sessionStorage.getItem('table'))
        console.log(this.data)
		document.getElementsByTagName('html')[0].style.overflow='visible'
		document.getElementsByTagName('body')[0].style.overflow='visible'
		document.getElementById('app').style.overflow='visible'
	},
	methods: {
		getData(id) {
			this.qrcodeCard = '{"id":"'+this.$route.query.id+'","flag":"jmmes","modid":"'+this.$route.query.modid+'","pid":"'+res.data.pid+'"}'
		}
	}
}
</script>

<style scoped>

table,tr {
	margin:2rem;
    border-collapse: collapse;
}

td {
	height: 52px;
	width:100px;
    border: 1px solid black;
    border-collapse: collapse;
}
.main {
	margin-left: 32.5%;
	transform: translateX(-50%);
}
@media print {
	.page-break {
		page-break-after: always ;
	}
}

</style>

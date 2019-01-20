<template>
    <div class="main">
            <table  style="width: 300px;" >
                <tr style="text-align: center;">
                    <td colspan="6">
                        <p style="font-size: 30px;">设备安全检点</p>
                    </td>
                </tr>
                <tr style="text-align: center;">
                    <td>设备名称</td>
                    <td colspan="1">{{data.name}}</td>
                </tr>
                <tr style="text-align: center;">
                <td colspan="2" rowspan="2">
                    <qrcode
                    :value='`{"equNum":"${data.number}","flag":"${data.flag}","id":"${data.id}"}`'
                    :options="{ size: 95 }"
                    >
                    </qrcode>
                </td>
                </tr>
            </table>
            <div class="page-break"></div>
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
            data:[]
        }
    },
	created () {
        // 获取缓存数据
        this.data['id'] = sessionStorage.getItem('id')
        this.data['name'] = sessionStorage.getItem('name')
        this.data['number'] = sessionStorage.getItem('number')
        this.data['flag'] = 'equipment'
        console.log(this.data)
		document.getElementsByTagName('html')[0].style.overflow='visible'
		document.getElementsByTagName('body')[0].style.overflow='visible'
		document.getElementById('app').style.overflow='visible'
	},
	methods: {
		getData(id) {
			this.qrcodeCard = '{"number":"'+this.$route.query.number+'","flag":"'+this.$route.query.flag+'","id":"'+this.$route.query.id+'"}'
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

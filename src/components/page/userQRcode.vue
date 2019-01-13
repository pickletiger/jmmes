<template>
    <div class="main">
            <table  style="width: 600px;" >
                <tr style="text-align: center;">
                    <td colspan="6">
                        <p style="font-size: 30px;">用户信息表</p>
                    </td>
                </tr>
                <tr style="text-align: center;">
                    <td>名字</td>
                    <td colspan="1">{{data.name}}</td>
                    <td>部门</td>
                    <td>{{data.department}}</td>
                </tr>
                <tr style="text-align: center;">
                    
                    <td>职位</td>
                    <td>{{data.position}}</td>
                <td colspan="2" rowspan="2">
                    <qrcode
                    :value='`{"id":"${data.id}","flag":"${data.flag}","gNum":"${data.gNum}"}`'
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
		// console.log(this.$route.query.modid)
        // console.log(this.qrcodePer);
        // 获取缓存数据
        this.data['id'] = sessionStorage.getItem('userId')
        this.data['name'] = sessionStorage.getItem('userName')
        this.data['gNum'] = sessionStorage.getItem('userNum')
        this.data['department'] = sessionStorage.getItem('userDepartment')
        this.data['position'] = sessionStorage.getItem('userPosition')
        this.data['flag'] = 'staff'
        if(this.data['department']=='检验部'){
            this.data['flag'] = 'test'
        }
        console.log(this.data)
		document.getElementsByTagName('html')[0].style.overflow='visible'
		document.getElementsByTagName('body')[0].style.overflow='visible'
		document.getElementById('app').style.overflow='visible'
	},
	methods: {
		getData(id) {
			this.qrcodeCard = '{"id":"'+this.$route.query.id+'","flag":"'+this.$route.query.flag+'","gNum":"'+this.$route.query.gNum+'"}'
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

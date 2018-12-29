<template>
  <div class="main">
			<table style="width: 600px;">
				<tr style="text-align: center;">
					<td colspan="6">
						<p style="font-size: 30px;">产品标识卡</p>
						<p style="float:right;margin-right:20px">YD[Y]D-030</p>
					</td>
				</tr>
				<tr style="text-align: center;">
					<td>产品型号</td>
					<td colspan="1">{{data.name}}</td>
					<td>图号</td>
					<td colspan="4">{{data.figure_number}}</td>
				</tr>
				<tr style="text-align: center;">
					<td>工单号</td>
					<td>{{data.pro}}</td>
					<td>零件名称</td>
					<td colspan="4">{{data.child_material}}</td>
				</tr>
        <tr style="text-align: center;">
					<td>零件数量</td>
					<td>{{data.count}}</td>
					<td>下工序</td>
					<td>{{data.next}}</td>
          <td colspan="2" rowspan="2">
            <qrcode
              :value="qrcodeCard"
              :options="{ size: 95 }"
            >
            </qrcode>
          </td>
				</tr>
				<tr style="text-align: center;">
					<td>填写人</td>
					<td>{{data.peoname}}</td>
					<td>填写日期</td>
					<td>{{data.date}}</td>
				</tr>
        
			</table>
			<!-- <qrcode
        :value="qrcodePer"
        :options="{ size: 100 }"
      >
    	</qrcode>
			<p>张三</p> -->

			
		</div>
  
</template>

<script>
// 注意，标签需要使用qrcode,目前发现使用qr-code标签会报错
import qrcode from '@xkeshi/vue-qrcode'
import axios from 'axios'
export default {
  name: 'QrCode',
  components: {
      qrcode
  },
  data (){
    return {
      qrcodeCard:"",
			qrcodePer:'{"id":"1","flag":"staff"}',
      data:{}
    }
	},
	created () {
		// console.log(this.$route.query.modid)
		this.getData(this.$route.query.id)
		// console.log(this.qrcodePer);
		document.getElementsByTagName('html')[0].style.overflow='visible'
		document.getElementsByTagName('body')[0].style.overflow='visible'
		document.getElementById('app').style.overflow='visible'
	},
	methods: {
		getData(id) {
			var fd = new FormData()
			fd.append('id',id)
			fd.append('flag','qrcode')
			axios.post(`${this.baseURL}/part.php`,fd).then((res)=>{
				console.log(res.data)
				this.data = res.data
				this.qrcodeCard = '{"id":"'+this.$route.query.id+'","flag":"jmmes","modid":"'+this.$route.query.modid+'","pid":"'+res.data.pid+'"}'
			})
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

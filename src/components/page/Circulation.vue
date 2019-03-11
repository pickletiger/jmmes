<template>
    <div class="main">
        <div>
            <table style="width: 800px;">
                <tr style="text-align: center;">
                    <td colspan="9">
                        <p style="font-size: 18px;">中山市金马科技娱乐设备股份有限公司</p>
                        <p style="font-size: 30px;margin-top:5px;margin-bottom:0">制品流转交接单</p>
                    </td>
                </tr>
                <tr style="text-align: center;">
                    <td style="width: 20px;">序号</td>
                    <td>产品名称</td>
                    <td>工单号</td>
                    <td>单位</td>
                    <td>数量</td>
                    <td>下工序（如镀锌、包胶）</td>
                    <td>急件标记（选填）</td>
                    <td>建议完成日期（选填）</td>
                    <td>备注</td>
                </tr>
                <tr style="text-align: center;">
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr style="text-align: center;">
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr style="text-align: center;">
                    <td>3</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr style="text-align: center;">
                    <td>4</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr style="text-align: center;">
                    <td>5</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr style="text-align: center;">
                    <td>转出单位</td>
                    <td colspan="3"></td>
                    <td>转入单位</td>
                    <td colspan="2"></td>
                    <td>校验</td>
                    <td></td>
                </tr>
                <tr style="text-align: center;">
                    <td>经手人</td>
                    <td></td>
                    <td>日期</td>
                    <td></td>
                    <td>经手人</td>
                    <td colspan="2"></td>
                    <td>日期</td>
                    <td></td>
                </tr>
            </table>
            <div class="page-break"></div>
        </div>
    </div>
  
</template>

<script>
export default {
    name: 'Circulation',
    data (){
        return {
            data:[],
        }
    },
	created () {
        // 获取缓存数据
        this.data = JSON.parse(sessionStorage.getItem('table'))
        console.log(this.data)
		document.getElementsByTagName('html')[0].style.overflow='visible'
		document.getElementsByTagName('body')[0].style.overflow='visible'
		document.getElementById('app').style.overflow='visible'
	},
	methods: {
		// getData(id) {
		// 	this.qrcodeCard = '{"id":"'+this.$route.query.id+'","flag":"jmmes","modid":"'+this.$route.query.modid+'","pid":"'+res.data.pid+'"}'
		// }
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

</style>

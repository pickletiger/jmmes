<template>
    <div class="main">
			<table style="width: 600px;">
				<tr style="text-align: center;">
					<td colspan="6" style="border-top:none;border-left: none;border-right: none;">
						<p style="font-size: 22px;">热处理施工通知单</p>
						<p>2018年8月30日</p>
					</td>
				</tr>
				<tr style="text-align: center;">
					<td>产品名称</td>
					<td colspan="2">行走轮轴</td>
					<td>产品图号</td>
					<td colspan="2">CAR-4N.01-03</td>
				</tr>
				<tr style="text-align: center;">
					<td>工单号</td>
					<td colspan="2">02#</td>
					<td>数量</td>
					<td colspan="2">4</td>
				</tr>
				<tr >
					<td style="text-align: center;">材料</td>
					<td><input type="checkbox" checked="checked"/>45#</td>
					<td><input type="checkbox" />40Cr</td>
					<td><input type="checkbox" />40CrNiMoA</td>
					<td><input type="checkbox" />2Cr13</td>
					<td>其他</td>
				</tr>
				<tr >
					<td style="text-align: center;">施工工序</td>
					<td><input type="checkbox" />退火</td>
					<td><input type="checkbox" checked="checked"/>调质</td>
					<td><input type="checkbox" />高频</td>
					<td><input type="checkbox" />回火</td>
					<td>其他</td>
				</tr>
				<tr style="text-align: center;">
					<td rowspan="4">硬度要求</td>
				</tr>
				<tr>
					<td colspan="2" style="border-right: none;"><input type="checkbox" />1、HB220-260</td>
					<td colspan="3" style="border-left: none;"><input type="checkbox" />2、HB240-286</td>
				</tr>
				<tr>
					<td colspan="2" style="border-right: none;"><input type="checkbox" checked="checked"/>3、HB260-320</td>
					<td colspan="3" style="border-left: none;"><input type="checkbox" />4、HB197-248</td>
				</tr>
				<tr>
					<td colspan="2" style="border-right: none;"><input type="checkbox" />5、HB217-255</td>
					<td colspan="3" style="border-left: none;"><input type="checkbox" />6、其他</td>
				</tr>
				<tr style="text-align: center;">
					<td>下工序</td>
					<td colspan="2">ID</td>
					<td>填发人</td>
					<td colspan="2">张三</td>
				</tr>
			</table>
		</div>
</template>

<script>
export default {
    name: 'Tprint'
}
</script>

<style scoped>
    table,tr {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    .main {
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translate(-50%,-50%);
    }
</style>


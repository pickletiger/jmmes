<template>
    <div>
        <!-- 制造工艺 -->
        <el-dialog 
            title="产品热处理工艺技术要求及检验记录表"
            :visible.sync="dialogcraftsmanshipVisible"
            width="60%">
            <div slot="title" v-if="!craftsmanshipTableHeader.contactId" style="height:60px">
                <h3>产品热处理工艺技术要求及检验记录表</h3>
                <el-select v-model="value" placeholder="请选择" style="margin: 20px 0;" @change="model(value)">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <table class="craftsmanshipTableHeader">
                <tr>
                <td>产品型号名称</td>
                <td><input v-model="craftsmanshipTableHeader.productName"/></td>
                <td>零件名称</td>
                <td><input v-model="craftsmanshipTableHeader.ownPartName"/></td>
                <td>工单号</td>
                <td><input v-model="craftsmanshipTableHeader.partsName"/></td>
                </tr>
                <tr>
                <td>零件图号</td>
                <td><input v-model="craftsmanshipTableHeader.productDrawingNumber"/></td>
                <td>数量</td>
                <td><input v-model="craftsmanshipTableHeader.ownPartDrawingNumber"/></td>
                <td>炉号</td>
                <td><input v-model="craftsmanshipTableHeader.partsDrawingNumber"/></td>
                </tr>
            </table>
            <table class="craftsmanshipTableHeader">
                <tr>
                    <td><h1>操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;规&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;程&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;201  年  月  日</h1></td>
                </tr>
            </table>
            <table class="craftsmanshipTableHeader" v-if="model1">
                <tr>
                    <td>工序</td>
                    <td>子工序</td>
                    <td>要求</td>
                    <td>记录</td>
                    <td rowspan="2" style="width:30%;">工艺曲线</td>
               </tr>
                <tr>
                    <td rowspan="10">淬火</td>
                    <td>装炉</td>
                    <td>炉温≤450℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="2">请较准确地记录：加热升<br>温到淬火温度的时间</td>
                    <td>起始时间：_______ 净时间</td>
                    <td rowspan="17"></td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>加热温度850℃ ± 10°</td>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">加热时间 ≈ aKD<br>(aKD计算方法参照：热处理规程中说明)</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td rowspan="2">冷却</td>
                    <td>盐水浓度为5% - 10%</td>
                    <td>实际盐水浓度：_______ %</td>
                </tr>
                <tr>
                    <td>盐水温度在淬火过程中 ＜ 50℃</td>
                    <td>实际盐水温度：_______ ℃</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>硬度抽查</td>
                    <td>≥HRC43</td>
                    <td>_______  _______  _______</td>
                </tr>
                <tr>
                    <td rowspan="7">回火</td>
                    <td>装炉</td>
                    <td>炉温 ≤ 300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="3">回火加热温度560℃左右<br>（注意：回火温度应参照淬火硬度<br>和图纸要求的调质硬度做适当调整） </td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">约2 - 3小时</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>冷却</td>
                    <td>空冷</td>
                    <td>注意：工件放置处应干燥无水迹</td>
                </tr>
                <tr>
                    <td colspan="4">&nbsp;</td>
                </tr>
            </table>
            <table class="craftsmanshipTableHeader"  v-if="model5">
                <tr>
                    <td>工序</td>
                    <td>子工序</td>
                    <td>要求</td>
                    <td>记录</td>
                    <td rowspan="2" style="width:30%;">工艺曲线</td>
               </tr>
                <tr>
                    <td rowspan="9">淬火</td>
                    <td>装炉</td>
                    <td>(易开裂零件)炉温≤300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="2">请较准确地记录：加热<br>升温到淬火温度的时间</td>
                    <td>起始时间：_______ 净时间</td>
                    <td rowspan="15"></td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>加热温度870℃ ± 10°</td>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">加热时间 ≈ aKD<br>(aKD计算方法参照：热处理规程中说明)</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td rowspan="2">冷却</td>
                    <td>PAG浓度为1.25%左右</td>
                    <td>实际PAG浓度：_______ %</td>
                </tr>
                <tr>
                    <td>PAG温度在淬火过程中 ＜ 40℃<br>在1.25%PAG冷至液温</td>
                    <td>实际PAG温度：_______ ℃<br>PAG溶液品质：_______ </td>
                </tr>
                <tr>
                    <td>硬度抽查</td>
                    <td>≥HRC45</td>
                    <td>_______  _______  _______</td>
                </tr>
                <tr>
                    <td rowspan="7">回火</td>
                    <td>装炉</td>
                    <td>炉温 ≤ 300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="3">回火加热温度560℃左右<br>（注意：回火温度应参照淬火硬度<br>和图纸要求的调质硬度做适当调整） </td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">约2 - 3小时</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>冷却</td>
                    <td>空冷</td>
                    <td>注意：工件放置处应干燥无水迹</td>
                </tr>
                <tr>
                    <td colspan="5">&nbsp;</td>
                </tr>
            </table>
            <table class="craftsmanshipTableHeader" v-if="model3">
                <tr>
                    <td>工序</td>
                    <td>子工序</td>
                    <td>要求</td>
                    <td>记录</td>
                    <td rowspan="2" style="width:30%;">工艺曲线</td>
               </tr>
                <tr>
                    <td rowspan="9">淬火</td>
                    <td>装炉</td>
                    <td>(易开裂零件)炉温≤300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="2">请较准确地记录：加热<br>升温到淬火温度的时间</td>
                    <td>起始时间：_______ 净时间</td>
                    <td rowspan="15"></td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>加热温度870℃ ± 10°</td>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">加热时间 ≈ aKD<br>(aKD计算方法参照：热处理规程中说明)</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td rowspan="2">冷却</td>
                    <td>PAG浓度为1.25%左右</td>
                    <td>实际PAG浓度：_______ %</td>
                </tr>
                <tr>
                    <td>PAG温度在淬火过程中 ＜ 40℃<br>在1.25%PAG冷至液温</td>
                    <td>实际PAG温度：_______ ℃<br>PAG溶液品质：_______ </td>
                </tr>
                <tr>
                    <td>硬度抽查</td>
                    <td>≥HRC45</td>
                    <td>_______  _______  _______</td>
                </tr>
                <tr>
                    <td rowspan="7">回火</td>
                    <td>装炉</td>
                    <td>炉温 ≤ 300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="3">回火加热温度560℃左右<br>（注意：回火温度应参照淬火硬度<br>和图纸要求的调质硬度做适当调整） </td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">约2 - 3小时</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>冷却</td>
                    <td>空冷</td>
                    <td>注意：工件放置处应干燥无水迹</td>
                </tr>
                <tr>
                    <td colspan="5">&nbsp;</td>
                </tr>
            </table>

            <table class="craftsmanshipTableHeader" v-if="model6">
                <tr>
                    <td>工序</td>
                    <td>子工序</td>
                    <td>要求</td>
                    <td>记录</td>
                    <td rowspan="2" style="width:30%;">工艺曲线</td>
               </tr>
                <tr>
                    <td rowspan="9">淬火</td>
                    <td>装炉</td>
                    <td>(易开裂零件)炉温≤300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="2">请较准确地记录：加热<br>升温到淬火温度的时间</td>
                    <td>起始时间：_______ 净时间</td>
                    <td rowspan="15"></td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>加热温度870℃ ± 10°</td>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">加热时间 ≈ aKD<br>(aKD计算方法参照：热处理规程中说明)</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td rowspan="2">冷却</td>
                    <td>PAG浓度为1.25%左右</td>
                    <td>实际PAG浓度：_______ %</td>
                </tr>
                <tr>
                    <td>PAG温度在淬火过程中 ＜ 40℃<br>在1.25%PAG冷至液温</td>
                    <td>实际PAG温度：_______ ℃<br>PAG溶液品质：_______ </td>
                </tr>
                <tr>
                    <td>硬度抽查</td>
                    <td>≥HRC45</td>
                    <td>_______  _______  _______</td>
                </tr>
                <tr>
                    <td rowspan="7">回火</td>
                    <td>装炉</td>
                    <td>炉温 ≤ 300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="3">回火加热温度560℃左右<br>（注意：回火温度应参照淬火硬度<br>和图纸要求的调质硬度做适当调整） </td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">约2 - 3小时</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>冷却</td>
                    <td>空冷</td>
                    <td>注意：工件放置处应干燥无水迹</td>
                </tr>
                <tr>
                    <td colspan="5">&nbsp;</td>
                </tr>
            </table>

            <table class="craftsmanshipTableHeader" v-if="model2">
                <tr>
                    <td>工序</td>
                    <td>子工序</td>
                    <td>要求</td>
                    <td>记录</td>
                    <td rowspan="2"  style="width:30%;">工艺曲线</td>
               </tr>
                <tr>
                    <td rowspan="10">淬火</td>
                    <td>装炉</td>
                    <td>高合金钢：炉温≤300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="2">请较准确地记录：加热<br>升温到淬火温度的时间</td>
                    <td>起始时间：_______ 净时间</td>
                    <td rowspan="17"></td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>加热温度970℃ ± 10°</td>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">加热时间 ≈ aKD<br>(aKD计算方法参照：热处理规程中说明)</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td rowspan="2">冷却</td>
                    <td>空气</td>
                    <td>实际空气温度：_______ ℃</td>
                </tr>
                <tr>
                    <td>冷却环境干燥无水迹等</td>
                    <td>实际条件：_______ </td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>硬度抽查</td>
                    <td>≥HRC38</td>
                    <td>_______  _______  _______</td>
                </tr>
                <tr>
                    <td rowspan="7">回火</td>
                    <td>装炉</td>
                    <td>炉温 ≤ 300℃</td>
                    <td>实际炉温：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="3">回火加热温度700℃左右<br>（注意：回火温度应参照淬火硬度和<br>图纸要求的调质硬度做适当调整）</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="2">保温</td>
                    <td rowspan="2">约2 - 3小时</td>
                    <td>起始时间：_______ 净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>冷却</td>
                    <td>空冷</td>
                    <td>注意：工件放置处应干燥无水迹</td>
                </tr>
                <tr>
                    <td colspan="5">&nbsp;</td>
                </tr>
            </table>

            <table class="craftsmanshipTableHeader" v-if="model4">
                <tr>
                    <td>序号</td>
                    <td>高频淬火材料</td>
                    <td>类似材料品牌</td>
                    <td>淬火温度℃</td>
                    <td>&nbsp;</td>
                    <td>序号</td>
                    <td>高频淬火材料</td>
                    <td>类似材料品牌</td>
                    <td>淬火温度℃</td>
               </tr>
                <tr>
                    <td>1</td>
                    <td>中碳钢</td>
                    <td>35#、45#</td>
                    <td>880 - 920</td>
                    <td>&nbsp;</td>
                    <td>4</td>
                    <td>表面渗碳钢</td>
                    <td>15#钢</td>
                    <td>840 - 860</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>高碳钢</td>
                    <td>T8、T10、T12、65Mn、Gr15</td>
                    <td>850 - 890</td>
                    <td>&nbsp;</td>
                    <td>5</td>
                    <td>表面渗碳（低合金）钢</td>
                    <td>20Cr等</td>
                    <td>860 - 900</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>低合金钢</td>
                    <td>40Gr等</td>
                    <td>880 - 920</td>
                    <td>&nbsp;</td>
                    <td>6</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <table class="craftsmanshipTableHeader"  v-if="model4">
                <tr>
                    <td>工序</td>
                    <td>子工序</td>
                    <td>要求</td>
                    <td>记录</td>
                    <td>工艺路线</td>
                </tr>
                <tr>
                    <td rowspan="6">淬火</td>
                    <td rowspan="2">加热</td>
                    <td>加热温度（参照规程规定）</td>
                    <td>实际温度：_______℃</td>
                    <td rowspan="13"></td>
                </tr>
                <tr>
                    <td>加热时间：_______秒</td>
                    <td>参照规程中的规定：温度用远红外线枪检测</td>
                </tr>
                <tr>
                    <td rowspan="3">冷却</td>
                    <td>在浓度为1.25%左右PAG里</td>
                    <td>实际PAG浓度：_______%</td>
                </tr>
                <tr>
                    <td>在“快速淬火油”里</td>
                    <td>实际油品质：_______</td>
                </tr>
                <tr>
                    <td>在浓度为10%左右的盐水里</td>
                    <td>实际盐水浓度：_______%</td>
                </tr>
                <tr>
                    <td>硬度抽查</td>
                    <td>≥HRC50</td>
                    <td>_______  _______  _______</td>
                </tr>
                <tr>
                    <td rowspan="6">回火</td>
                    <td>装炉</td>
                    <td>炉温≤100℃</td>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td rowspan="3">加热</td>
                    <td rowspan="3">（注意：回火温度应参照淬火硬度和<br>图纸要求的淬火硬度做适当调整）</td>
                    <td>起始时间：_______  净时间</td>
                </tr>
                <tr>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td>实际温度：_______℃</td>
                </tr>
                <tr>
                    <td>保温</td>
                    <td>约1 - 2小时</td>
                    <td>起始时间：_______  净时间</td>
                </tr>
                <tr>
                    <td>冷却</td>
                    <td>空冷  注意：工件放置处应干燥无水迹</td>
                    <td>结束时间：_______</td>
                </tr>
                <tr>
                    <td colspan="2">高频淬火深度抽查</td>
                    <td>一般在0.5 - 1.5mm左右为宜</td>
                    <td>实际深度约：_______  _______</td>
                </tr>
            </table>
            
            <table class="craftsmanshipTableHeader">
                <tr>
                    <td colspan="11"><h1>“自检”调质处理后硬度记录（不足10件按实数检验）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;技术要求：</h1></td>
                </tr>
                <tr>
                    <td>序号</td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>是否合格</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                </tr>
                <tr>
                    <td colspan="2">热处理人员签名</td>
                    <td colspan="6"><input type="text"></td>
                    <td colspan="2">自检时间</td>
                    <td>201&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</td>
                </tr>
                <tr>
                    <td rowspan="2" colspan="2">热处理最终结论</td>
                    <td colspan="3">合格</td>
                    <td colspan="3">返工</td>
                    <td colspan="3">报废</td>
                </tr>
                <tr>
                    <td colspan="3">_______件</td>
                    <td colspan="3">_______件</td>
                    <td colspan="3">_______件</td>
                </tr>
                <tr>
                    <td>检验员抽检硬度</td>
                    <td colspan="10">1:HB_______ &nbsp;&nbsp;2:HB_______ &nbsp;&nbsp;3:HB_______ &nbsp;&nbsp;4:HB_______ &nbsp;&nbsp;5:HB_______ &nbsp;&nbsp;</td>
                </tr>
                <tr>
                    <td>是否合格</td>
                    <td>口是&nbsp;&nbsp;口否</td>
                    <td>检验员签名</td>
                    <td colspan="2"></td>
                    <td>车间责任人</td>
                    <td colspan="2"></td>
                    <td>审核</td>
                    <td colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="8"></td>
                    <td>日期</td>
                    <td colspan="2">201&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</td>
                </tr>
            </table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogcraftsmanshipVisible = false">取 消</el-button>
                <el-button type="primary" @click="craftsmanshipSaveData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "HeattreatmentDialog",
    props: {

    },
    data() {
        return {
            selectedTreeNode : {//左边树选中的节点（表类型，对应的id）
                tableFlag : "",
                relateId : ""
            },
            model1:true,
            model2:false,
            model3:false,
            model4:false,
            model5:false,
            model6:false,
            dialogcraftsmanshipVisible: false,//制造工艺dialog
            tablecraftsmanshipBodyVisible: [true,false,false],//模板显示选择
            craftsmanshipTableHeader: {
                "contactId" : "",//保存记录后返回的id
                "productName": "",
                "ownPartName": "",
                "partsName": "",
                "productDrawingNumber": "",
                "ownPartDrawingNumber": "",
                "partsDrawingNumber": ""
            },
            options: [{
                value: '45钢（盐水10%）调质热处理报告',
                label: '45钢（盐水10%）调质热处理报告'
                }, {
                value: '2Cr13钢调质热处理（空冷淬火）报告',
                label: '2Cr13钢调质热处理（空冷淬火）报告'
                }, {
                value: '42CrMo钢调质热处理（1.25%PAG淬火）报告',
                label: '42CrMo钢调质热处理（1.25%PAG淬火）报告'
                }, {
                value: '高频淬火 --- 热处理报告',
                label: '高频淬火 --- 热处理报告'
                }, {
                value: '40CrNiMo钢调质热处理（1.25%PAG淬火）报告',
                label: '40CrNiMo钢调质热处理（1.25%PAG淬火）报告'
                }, {
                value: '40Cr钢调质热处理（1.25%PAG淬火）报告',
                label: '40Cr钢调质热处理（1.25%PAG淬火）报告'
                }],
                value: ''
        }
    },
    methods: {
        //修改下拉选项选择模板
        model(value){
            switch(value){
                case "45钢（盐水10%）调质热处理报告":
                    this.model1=true
                    this.model2=false
                    this.model3=false
                    this.model4=false
                    this.model5=false
                    this.model6=false
                    break;
                case "2Cr13钢调质热处理（空冷淬火）报告":
                    this.model1=false
                    this.model2=true
                    this.model3=false
                    this.model4=false
                    this.model5=false
                    this.model6=false
                    break;
                case "42CrMo钢调质热处理（1.25%PAG淬火）报告":
                    this.model1=false
                    this.model2=false
                    this.model3=true
                    this.model4=false
                    this.model5=false
                    this.model6=false
                    break;
                case "高频淬火 --- 热处理报告":
                    this.model1=false
                    this.model2=false
                    this.model3=false 
                    this.model4=true
                    this.model5=false
                    this.model6=false
                    break;
                case "40CrNiMo钢调质热处理（1.25%PAG淬火）报告":
                    this.model1=false
                    this.model2=false
                    this.model3=false 
                    this.model4=false
                    this.model5=true
                    this.model6=false
                    break;
                case "40Cr钢调质热处理（1.25%PAG淬火）报告":
                    this.model1=false
                    this.model2=false
                    this.model3=false 
                    this.model4=false
                    this.model5=false
                    this.model6=true
                    break;
            }
        },

        //重置焊接模态框的输入框
        resetInputCraftsmanship() {            
            this.tablecraftsmanshipBodyVisible = [true,false,false]
            this.craftsmanshipTableHeader = {
                "contactId" : "",//保存记录后返回的id
                "productName": "",
                "ownPartName": "",
                "partsName": "",
                "productDrawingNumber": "",
                "ownPartDrawingNumber": "",
                "partsDrawingNumber": ""
            }    
        },
        //打开新建焊接模态框
        openHeattreatmentDialog(selectedTreeNode){
            this.selectedTreeNode = selectedTreeNode
            //  console.log(selectedTreeNode)
            this.dialogcraftsmanshipVisible = true
            if(this.craftsmanshipTableHeader.contactId){
                this.resetInputCraftsmanship()
            } 
        },
        //查看及编辑焊接信息
        Handlealter(contactId,selectedTreeNode){
            this.selectedTreeNode = selectedTreeNode
            axios.get(`${this.baseURL}/basicdata/heattreatment.php?flag=getHeattreatmentInfoData&contactID=${contactId}`)
            .then((response) => {   
                this.dialogcraftsmanshipVisible = true
                if(response.data.state == "success"){
                    this.craftsmanshipTableHeader = response.data.data.craftsmanshipTableHeader
                    this.value = response.data.data.value       
                              
                }
            })
            .catch(function(error){
                console.log(error)
            })          
        },
        //保存表格信息
        craftsmanshipSaveData(){
            let fd = new FormData()
            fd.append("flag","heattreatmentDataOne")
                fd.append("treeId",this.selectedTreeNode.relateId)//选中树的id
                fd.append("heattreatmentTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
                fd.append("model",this.value)//模板信息
                axios.post(`${this.baseURL}/basicdata/heattreatment.php`,fd)
                    .then((response) => {        
                        console.log(response)                
                        if(response.data.state == "success"){
                            this.$message({
                                showClose: true,
                                message: '新增成功',
                                type: 'success'
                            })                            
                        }else{
                            this.$message({
                                showClose: true,
                                message: '新增失败',
                                type: 'error'
                            })
                        } 
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.dialogcraftsmanshipVisible = false                                           
                    })
                    .catch(function (error){
                        console.log(error)
                    })
        }
    }
}
</script>

<style scoped>
input {
    border: none;
    height: 30px;
    width: 100%;
}
  .tableOne,.tableTwo,.tableThree,.tableFour,.craftsmanshipTableHeader,.craftsmanshipTableBody_1,.craftsmanshipTableFooter{
    border-collapse: collapse;
    text-align: center;
    width: 100%;
  }
  .tableOne tr,td,th,.tableTwo tr,td,th,.tableThree tr,td,th,.tableFour tr,td,th,.craftsmanshipTableHeader tr,td,th,.craftsmanshipTableBody_1 tr,td,th,.craftsmanshipTableFooter tr,td,th{
    border: 1px solid black;
    padding: 2px;
  }
  .craftsmanshipTableBody_2{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
  }
  .craftsmanshipTableBody_2 tr,td,th{
    border: 1px solid black;
    padding: 2px;
  }
  .craftsmanshipTableBody_3{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    height: 500px;
  }
  .craftsmanshipTableBody_1_img{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    height: 350px;
  }
  .weldingsequence{
    height: 25px;
    width: 10%
  }
  .tableFour{
    width: 100%;
    height: 500px;
  }
  .craftsmanshipTableBody_2_img{
    width: 33%;
    height: 500px;
  }
  .serialNumber{
    width: 50px;
  }
  el-dialog__body{
      padding: 0 20px !important;
  }
</style>

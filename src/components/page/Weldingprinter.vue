<template>
    <div class="main">
            <table class="tabheader midfontsize">
                <tr>
                    <td>工艺卡号</td>
                    <td>{{ weldingTableOne.processNumber }}</td>
                    <td>数量</td>
                    <td>{{ weldingTableOne.quantity }}</td>
                    <td>工件编号</td>
                    <td>{{ weldingTableOne.workpieceNumber }}</td>
                    <td>车间</td>
                    <td>{{ weldingTableOne.workshop }}</td>
                    <td>工单号</td>
                    <td>{{ weldingTableOne.workOrderNumber }}</td>
                </tr>
                <tr>
                    <td>产品名称</td>
                    <td>{{ weldingTableOne.productName }}</td>
                    <td>产品代号</td>
                    <td>{{ weldingTableOne.productCode }}</td>
                    <td>部件名称</td>
                    <td>{{ weldingTableOne.partName }}</td>
                    <td>部件图号</td>
                    <td colspan="3">{{ weldingTableOne.partDrawingNumber }}</td>	          
                </tr>
            </table>
            <table class="pageOneFirst  minfontsize">
                <thead  style="font-size:5pt;">
                    <tr>
                        <td rowspan="2" class="serialNumber" style="width:8mm;">焊缝编号</td>
                        <td colspan="2" rowspan="2">材质及规格</td>
                        <td rowspan="2">焊接方法</td>
                        <td rowspan="2">坡口形式</td>
                        <td rowspan="2">焊材及规格</td>                    
                        <td colspan="2">焊接层次</td>
                        <td rowspan="2">保护气体</td>
                        <td rowspan="2">焊接电流(A)</td>
                        <td colspan="2">实际操作电流(A)</td>
                        <td rowspan="2">焊接电压(V)</td>
                        <td colspan="2">实际操作电压(V)</td>
                        <td rowspan="2">预焊接工艺规程编号</td>
                        <td rowspan="2">焊接工艺评定编号</td>
                        <td rowspan="2">探伤要求</td>
                        <td rowspan="2" style="width:15mm;">钢印号</td>
                    </tr>
                    <tr>
                        <td style="width:8mm;padding-left:0;padding-right:0;">层数</td>
                        <td style="width:8mm;padding-left:0;padding-right:0;">道数</td>
                        <td colspan="2">检验员确认</td>
                        <td colspan="2">检验员确认</td>
                    </tr>
                </thead>
                <tbody style="font-size:5pt;">
                    <tr v-for="(item,index) in weldingTableTwo_1">
                        <td  style="height:10mm;">{{ item.weldNumber }}&nbsp;</td>
                        <td>{{ returnValueMaterialAndSpecifications(item.materialAndSpecifications_1,item.materialAndSpecifications_1_thickness) }}</td>                        
                        <td>{{ returnValueMaterialAndSpecifications(item.materialAndSpecifications_2,item.materialAndSpecifications_2_thickness) }}</td>                        
                        <td>{{ item.weldingMethod }}</td>
                        <td>{{ item.grooveForm }}</td>
                        <td>{{ returnValueConsumablesAndSpecifications(item.consumables,item.specifications) }}</td>                        
                        <td>{{ returnNull(item.weldingLevel_numberOfLayers) }}</td>
                        <td>{{ returnNull(item.weldingLevel_numberOftracks) }}</td>
                        <td>{{ item.protectiveGas }}</td>
                        <td>{{ item.weldingCurrent }}</td>
                        <td>{{ item.actualCurrent_1 }}</td>
                        <td>{{ item.actualCurrent_2 }}</td>
                        <td>{{ item.weldingVoltage }}</td>
                        <td>{{ item.actualVoltage_1 }}</td>
                        <td>{{ item.actualVoltage_2 }}</td>
                        <td>{{ item.specificationNumber }}</td>
                        <td>{{ item.ratingNumber }}</td>
                        <td>{{ item.flawDetectionRequirements }}</td>
                        <td>{{ item.steelStamp }}</td>
                    </tr>
                    
                </tbody>
            </table>
            <table class="pageOnetabSecond midfontsize">                
                <tr>
                    <td colspan="19" align="center" valign="middle">表1焊缝检验记录</td>
                </tr>
                <tr style="font-size:5pt;">
                    <td style="width:10mm;padding-left:0;padding-right:0;">控制点</td>
                    <td style="width:10mm;padding-left:0;padding-right:0;">序号</td>
                    <td colspan="4">检查内容</td>
                    <td colspan="6">技术（工艺）要求</td>
                    <td colspan="6">检验结果</td>
                    <td colspan="4">检验员签名（日期）</td>
                </tr>
                <tbody style="font-size:5pt;">
                    <tr v-for="(item,index) in weldingTableTwo_2">
                        <td rowspan="6" v-if="index == 0">焊中检查</td>
                        <td rowspan="2" v-if="index == 6">焊后检查</td>
                        <td>{{ item.serialNumber }}</td>
                        <td colspan="4">{{ item.checkContent }}</td>
                        <td colspan="6">{{ item.processRequirements }}</td>
                        <td colspan="6">{{ item.testResult }}</td>
                        <td colspan="4">{{ item.inspectorSingnature }}</td>
                    </tr>
                </tbody>                
            </table>
            
            <table class="tabfooter">
                <tr>
                    <td colspan="6" class="bigfontsize">编制（日期）</td>
                    <td colspan="6" class="bigfontsize">审核（日期）</td>
                    <td rowspan="2" colspan="8" class="bigfontsize">中山市金马科技娱乐设备有限公司</td>
                </tr>
                <tr>
                    <td colspan="6" style="height:10mm;">&nbsp;</td>
                    <td colspan="6">&nbsp;</td>                   
                </tr>
            </table>
            <!-- 第一页 end -->
            <div class="page"></div>
            <!-- 第二页 start -->
            <table class="tabheader midfontsize">
                <tr>
                    <td>工艺卡号</td>
                    <td>{{ weldingTableOne.processNumber }}</td>
                    <td>数量</td>
                    <td>{{ weldingTableOne.quantity }}</td>
                    <td>工件编号</td>
                    <td>{{ weldingTableOne.workpieceNumber }}</td>
                    <td>车间</td>
                    <td>{{ weldingTableOne.workshop }}</td>
                    <td>工单号</td>
                    <td>{{ weldingTableOne.workOrderNumber }}</td>
                </tr>
                <tr>
                    <td>产品名称</td>
                    <td>{{ weldingTableOne.productName }}</td>
                    <td>产品代号</td>
                    <td>{{ weldingTableOne.productCode }}</td>
                    <td>部件名称</td>
                    <td>{{ weldingTableOne.partName }}</td>
                    <td>部件图号</td>
                    <td colspan="3">{{ weldingTableOne.partDrawingNumber }}</td>	          
                </tr>
            </table>
            <table class="tabbodytwo">
                <tr>
                    <td rowspan="2">焊接编号</td>
                    <td colspan="3">焊缝待焊区域清理</td>
                    <td colspan="3">坡口形式、大小</td>
                    <td colspan="3">组立间隙</td>
                </tr>
                <tr>
                    <td>工艺要求</td>
                    <td>检验结果</td>
                    <td>检验员签名（日期）</td>
                    <td>工艺要求</td>
                    <td>检验结果</td>
                    <td>检验员签名（日期）</td>
                    <td>工艺要求</td>
                    <td>检验结果</td>
                    <td>检验员签名（日期）</td>
                </tr>
                <tbody class="tabbodytwofont">
                <tr v-for="(item,index) in weldingTableThree_1">
                    <td>{{ item.weldNumber }}&nbsp;</td>
                    <td>{{ item.processRequirements_1 }}</td>
                    <td>{{ item.testResult_1 }}</td>
                    <td>{{ item.inspectorSingnature_1 }}</td>
                    <td>{{ item.processRequirements_2 }}</td>
                    <td>{{ item.testResult_2 }}</td>
                    <td>{{ item.inspectorSingnature_2 }}</td>
                    <td>{{ item.processRequirements_3 }}</td>
                    <td>{{ item.testResult_3 }}</td>
                    <td>{{ item.inspectorSingnature_3 }}</td>
                </tr>
                <tr>
                    <td rowspan="2">焊缝编号</td>
                    <td colspan="3">层间清理</td>
                    <td colspan="3">焊脚尺寸</td>
                    <td colspan="3">焊缝外观质量</td>
                </tr>
                <tr>
                    <td>工艺要求</td>
                    <td>检验结果</td>
                    <td>检验员签名（日期）</td>
                    <td>工艺要求</td>
                    <td>检验结果</td>
                    <td>检验员签名（日期）</td>
                    <td>工艺要求</td>
                    <td>检验结果</td>
                    <td>检验员签名（日期）</td>
                </tr>
                <tr v-for="(item,index) in weldingTableThree_2">
                    <td>{{ item.weldNumber }}&nbsp;</td>
                    <td>{{ item.processRequirements_1 }}</td>
                    <td>{{ item.testResult_1 }}</td>
                    <td>{{ item.inspectorSingnature_1 }}</td>
                    <td>{{ item.processRequirements_2 }}</td>
                    <td>{{ item.testResult_2 }}</td>
                    <td>{{ item.inspectorSingnature_2 }}</td>
                    <td>{{ item.processRequirements_3 }}</td>
                    <td>{{ item.testResult_3 }}</td>
                    <td>{{ item.inspectorSingnature_3 }}</td>
                </tr>
                <tr>
                    <td>终检结果</td>
                    <td colspan="3">{{ weldingTableThree_3.finalInspectionResult }}</td>
                    <td>检验员签名</td>
                    <td colspan="3">{{ weldingTableThree_3.inspectorSingnature }}</td>
                    <td>日期</td>
                    <td>{{ weldingTableThree_3.date }}</td>
                </tr>
                </tbody>
            </table>
            <table class="tabfooter">
                <tr>
                    <td colspan="6" class="bigfontsize">编制（日期）</td>
                    <td colspan="6" class="bigfontsize">审核（日期）</td>
                    <td rowspan="2" colspan="8" class="bigfontsize">中山市金马科技娱乐设备有限公司</td>
                </tr>
                <tr>
                    <td colspan="6" style="height:10mm;">&nbsp;</td>
                    <td colspan="6">&nbsp;</td>                   
                </tr>
            </table>
            <!-- 第二页 end -->
            <div class="page"></div>
            <!-- 第三页 start -->
            <table class="tabheader midfontsize">
                <tr>
                    <td>工艺卡号</td>
                    <td>{{ weldingTableOne.processNumber }}</td>
                    <td>数量</td>
                    <td>{{ weldingTableOne.quantity }}</td>
                    <td>工件编号</td>
                    <td>{{ weldingTableOne.workpieceNumber }}</td>
                    <td>车间</td>
                    <td>{{ weldingTableOne.workshop }}</td>
                    <td>工单号</td>
                    <td>{{ weldingTableOne.workOrderNumber }}</td>
                </tr>
                <tr>
                    <td>产品名称</td>
                    <td>{{ weldingTableOne.productName }}</td>
                    <td>产品代号</td>
                    <td>{{ weldingTableOne.productCode }}</td>
                    <td>部件名称</td>
                    <td>{{ weldingTableOne.partName }}</td>
                    <td>部件图号</td>
                    <td colspan="3">{{ weldingTableOne.partDrawingNumber }}</td>	          
                </tr>
            </table>
            <table class="tabbodythree">
                <tr>
                    <td class="weldingsequence" style="height:8mm;">焊接顺序</td>
                    <td rowspan="2" id="imageBox" ref="imageBox" v-html="`<img  src='${baseURL}/${weldngTableFour.weldNumberMap}' style='max-width:100%;max-height:100%;pointer-events:none;display:${isEmpty(weldngTableFour.weldNumberMap)};' />`" style="width:80%;height:15cm;">&nbsp;</td>
                </tr>
                <tr>
                    <td>{{ weldngTableFour.weldingSequence }}</td>
                </tr>
            </table>
            <table class="tabfooter">
                <tr>
                    <td colspan="6" class="bigfontsize">编制（日期）</td>
                    <td colspan="6" class="bigfontsize">审核（日期）</td>
                    <td rowspan="2" colspan="8" class="bigfontsize">中山市金马科技娱乐设备有限公司</td>
                </tr>
                <tr>
                    <td colspan="6" style="height:10mm;">&nbsp;</td>
                    <td colspan="6">&nbsp;</td>                   
                </tr>
            </table>           
	</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Weldingprinter',
    data() {
        return {
            isShowdetailList:false,//是否创建首页列表
            detailList:"",//首页列表
            isShowweldingInfo:false,//是否创建焊接信息详情
            weldingInfo:"",//焊接信息详情数据
            weldingTableOne: {
                contactId : "",//保存记录后返回的id
                processNumber: "",
                quantity: "",
                workpieceNumber: "",
                workshop: "",
                workOrderNumber: "",
                productName: "",
                productCode: "",
                partName: "",
                partDrawingNumber: ""
            },
            weldingTableTwo_1: [
                {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
                {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
                {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
                {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
                {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
                {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""}
            ],
            weldingTableTwo_2: [
                {"serialNumber":"1","checkContent":"焊材烘干及保温","processRequirements":"","testResult":"","inspectorSingnature":""},
                {"serialNumber":"2","checkContent":"预热温度","processRequirements":"","testResult":"","inspectorSingnature":""},
                {"serialNumber":"3","checkContent":"焊材牌号及规格","processRequirements":"","testResult":"","inspectorSingnature":""},
                {"serialNumber":"4","checkContent":"焊接设备","processRequirements":"","testResult":"","inspectorSingnature":""},
                {"serialNumber":"5","checkContent":"保护气体","processRequirements":"","testResult":"","inspectorSingnature":""},
                {"serialNumber":"6","checkContent":"钢印号","processRequirements":"","testResult":"","inspectorSingnature":""},
                {"serialNumber":"1","checkContent":"去应力退火","processRequirements":"","testResult":"","inspectorSingnature":""},
                {"serialNumber":"2","checkContent":"探伤","processRequirements":"","testResult":"","inspectorSingnature":""}
            ],
            weldingTableThree_1: [
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""}
            ],
            weldingTableThree_2: [
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
                {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""}
            ],
            weldingTableThree_3: {
                "finalInspectionResult":"",
                "inspectorSingnature":"",
                "date":""
            },
            weldngTableFour: {
                "weldingSequence":'',
                "weldNumberMap":"",
                "imgHtml":''
            }
        }       
    },
    created() {
        this.getInfoData()
    },
    methods: {
        //根据id获取数据
        getInfoData() {
            //清除默认样式
            document.getElementsByTagName("html")[0].style.overflow = "visible"
            document.getElementsByTagName("body")[0].style.overflow = "visible"
            document.getElementById("app").style.overflow = "visible"
            
            let contactId = this.$route.query.contactId           
            axios.get(`${this.baseURL}/basicdata/document.php?flag=getWeldingInfoData&contactID=${contactId}`)
            .then((response) => {        
                if(response.data.state == "success"){
                    this.weldingTableOne = response.data.data.weldingTableOne
                    this.weldingTableTwo_1 = response.data.data.weldingTableTwo_1
                    this.weldingTableTwo_2 = response.data.data.weldingTableTwo_2
                    this.weldingTableThree_1 = response.data.data.weldingTableThree_1
                    this.weldingTableThree_2 = response.data.data.weldingTableThree_2
                    this.weldingTableThree_3 = response.data.data.weldingTableThree_3
                    this.weldngTableFour = response.data.data.weldngTableFour
                    //图片显示
                    // let imgsrc = '/jmmes/'+this.weldngTableFour.weldNumberMap
                    // this.weldngTableFour.imgHtml = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                }
            })
            .catch(function(error){
                console.log(error+"axios error!")
            })
        },
        //返回材质及规格
        returnValueMaterialAndSpecifications(v1,v2){
            if(v1 && v2){
                return v1+"/t"+v2
            }else{
                return ''
            }            
        },
        //返回焊材及规格
        returnValueConsumablesAndSpecifications(v1,v2){            
            if(v1 && v2){
                return v1+"-"+v2
            }else{
                return ''
            }
        },
        //焊接层次返回空
        returnNull(v){
            if(v > 0){
                return v
            }else{
                return ''
            }
        },
        //判断是否有值
        isEmpty(v){
            if(v.length > 0){
                return 'block'
            }else{
                return 'none'
            }
        }
    }
}
</script>

<style scoped>
    .main {
        width: 100%;
        align-content: center;
    }
    table,tr {
        border-collapse: collapse;
        text-align: center;
    }
    td {
        border: 1px solid black;
        border-collapse: collapse;
        padding-left: 1mm;
        padding-right: 1mm;
    }
    .page {
        page-break-before: always;
    }
    .A4page {
        width: 277mm;
        height: 190mm;       
    }
    .mintabfont {
        font-size: 7pt;
    }
    /* 头部的表的信息 */
    .tabheader {
        width: 277mm;
        text-align: center;
    }
    /*尾部信息*/
    .tabfooter {
        width: 277mm;
        text-align: center;
    }

    .detailListHeader {
        height: 10mm;
    }
    .detailList {
        height: 8mm;
    }

    /*第一页的第一个表格*/
    .pageOneFirst {
        width: 277mm;
        text-align: center;
    }
    /*第一页的第二个表格*/
    .pageOnetabSecond {
        width: 277mm;
        text-align: center;
    }
    .pageOnetabSecond td {
        height: 7mm;
    }


    /*第二页的主体内容*/
    .tabbodytwo {
        width: 277mm;
        text-align: center;
        font-size: 10.5pt;
    }
    .tabbodytwo td {
        height: 7mm;
    }
    .tabbodytwofont {
        font-size: 9pt;
    }

    /*第三页的主体内容*/
    .tabbodythree {
        width: 277mm;
        text-align: center;
        
    }

    /*小三*/
    .bigfontsize {
        font-size: 16pt;
    }
    /*小四*/
    .midfontsize {
        font-size: 11.2pt;
    }
    /*小六*/
    .minfontsize {
        font-size: 5.3pt;
    }

</style>


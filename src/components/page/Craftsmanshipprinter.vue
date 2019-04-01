<template>
    <div class="main">
        <!-- 头部信息 start -->
        <table class="tableHeader">
            <tr>
                <td>产品制造工艺技术要求及检验记录表</td>
                <td>编号</td>
                <td>{{ craftsmanshipTableHeader.ownPartDrawingNumber + "-" + craftsmanshipTableHeader.contactId  }}</td>
                <td>工单号：</td>
            </tr>
        </table>
        <table class="tableHeader">
            <tr>
                <td>产品名称</td>
                <td>{{ craftsmanshipTableHeader.productName }}</td>
                <td>所属部件名称</td>
                <td>{{ craftsmanshipTableHeader.ownPartName }}</td>
                <td colspan="4">零部件名称</td>
                <td>{{ craftsmanshipTableHeader.partsName }}</td>
                <td colspan="4">工件编号</td>
                <td>{{ craftsmanshipTableHeader.workpieceNumber }}</td>
            </tr>
            <tr>
                <td>产品图号</td>
                <td>{{ craftsmanshipTableHeader.productDrawingNumber }}</td>
                <td>所属部件图号</td>
                <td>{{ craftsmanshipTableHeader.ownPartDrawingNumber }}</td>
                <td colspan="4">零部件图号</td>
                <td>{{ craftsmanshipTableHeader.partsDrawingNumber }}</td>
                <td colspan="4">数量</td>
                <td>{{ craftsmanshipTableHeader.quantity }}</td>
            </tr>
        </table>
        <!-- 头部信息 end -->
        <!-- 模板一 start -->
        <table class="tableFirstModel" v-if="tablecraftsmanshipBodyVisible[0]">
            <tr>
                <td rowspan="2" class="serialNumber">序号</td>
                <td rowspan="2">工艺流程</td>
                <td rowspan="2">检验内容</td>
                <td rowspan="2">技术要求</td>
                <td colspan="4">自检</td>
                <td rowspan="2">签名/日期</td>
                <td colspan="4">质检</td>
                <td rowspan="2">签名/日期</td>
            </tr>
            <tr>
                <td>13#</td>
                <td>14#</td>
                <td>15#</td>
                <td>16#</td>
                <td>13#</td>
                <td>14#</td>
                <td>15#</td>
                <td>16#</td>
            </tr>
            <tr v-for="(item,index) in craftsmanshipTableBody_1.rowsData">
                <td>{{ item.serialNumber }}</td>
                <td>{{ item.processFlow }}</td>
                <td>{{ item.inspectionContent }}</td>
                <td>{{ item.skillsRequirement }}</td>
                <td>{{ item.selfTest_13 }}</td>
                <td>{{ item.selfTest_14 }}</td>
                <td>{{ item.selfTest_15 }}</td>
                <td>{{ item.selfTest_16 }}</td>
                <td>{{ item.signature_1 }}</td>
                <td>{{ item.qualityInspection_13 }}</td>
                <td>{{ item.qualityInspection_14 }}</td>
                <td>{{ item.qualityInspection_15 }}</td>
                <td>{{ item.qualityInspection_16 }}</td>
                <td>{{ item.signatture_2 }}</td>
            </tr>
            <tr>
                <td colspan="4">结论</td>
                <td colspan="10">{{ craftsmanshipTableBodyResult.conclusion }}</td>
            </tr>
            <tr>
                <td colspan="4">不符合确认</td>
                <td colspan="10">{{ craftsmanshipTableBodyResult.inconsistentConfirmation }}</td>
            </tr>
            <tr>
                <td colspan="14" ref="firstone" id="firstone" class="craftsmanshipTableBody_1_img" @drop="drop($event,'5')" @dragover="allowDrop($event)" v-html="`<img  src='${baseURL}/${craftsmanshipTableBody_1.fileOne}' style='width:100%;max-height:100%;pointer-events:none;display:${isEmpty(craftsmanshipTableBody_1.fileOne)};' />`">&nbsp;</td>
            </tr>
        </table>
        <!-- 模板一 end -->
        <!-- 模板二 start -->
        <table class="tableSecondModel" v-if="tablecraftsmanshipBodyVisible[1]">
            <tr>
                <td class="serialNumber">序号</td>
                <td>工艺流程</td>
                <td>检验内容</td>
                <td>技术要求</td>
                <td>自检</td>
                <td>签名/日期</td>
            </tr>
            <tr  v-for="(item,index) in craftsmanshipTableBody_2.rowsData">
                <td class="serialNumber">{{ item.serialNumber }}</td>
                <td>{{ item.processFlow }}</td>
                <td>{{ item.inspectionContent }}</td>
                <td>{{ item.skillsRequirement }}</td>
                <td>{{ item.selfTest }}</td>
                <td>{{ item.signature }}</td>
            </tr>          
            <tr>
                <td colspan="4">结论</td>
                <td>{{ craftsmanshipTableBodyResult.conclusion }}</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td colspan="4">不符合确认</td>
                <td>{{ craftsmanshipTableBodyResult.inconsistentConfirmation }}</td>
            <td>&nbsp;</td>
            </tr>
            
        </table>
        <table class="tableSecondModel" v-if="tablecraftsmanshipBodyVisible[1]">
            <tr>
                <td colspan="2" ref="secondmodelimgone" id="secondmodelimgone" class="craftsmanshipTableBody_2_img" @drop="drop($event,'1')" @dragover="allowDrop($event)" v-html="`<img  src='${baseURL}/${craftsmanshipTableBody_2.fileOne}' style='max-width:100%;max-height:100%;pointer-events:none;display:${isEmpty(craftsmanshipTableBody_2.fileOne)};' />`">&nbsp;</td>
                <td colspan="2" ref="secondmodelimgtwo" id="secondmodelimgtwo" class="craftsmanshipTableBody_2_img" @drop="drop($event,'2')" @dragover="allowDrop($event)" v-html="`<img  src='${baseURL}/${craftsmanshipTableBody_2.fileTwo}' style='max-width:100%;max-height:100%;pointer-events:none;display:${isEmpty(craftsmanshipTableBody_2.fileTwo)};' />`">&nbsp;</td>
                <td colspan="2" ref="secondmodelimgthree" id="secondmodelimgthree" class="craftsmanshipTableBody_2_img" @drop="drop($event,'3')" @dragover="allowDrop($event)" v-html="`<img  src='${baseURL}/${craftsmanshipTableBody_2.fileThree}' style='max-width:100%;max-height:100%;pointer-events:none;display:${isEmpty(craftsmanshipTableBody_2.fileThree)};' />`">&nbsp;</td>
            </tr>
        </table>
        <!-- 模板二 end -->
        <!-- 模板三 start-->
        <table class="tableThirdModel" v-if="tablecraftsmanshipBodyVisible[2]">
            <tr>
                <td ref="thirdmodelimg" id="thirdmodelimg" @drop="drop($event,'4')" @dragover="allowDrop($event)" v-html="`<img  src='${baseURL}/${craftsmanshipTableBody_3.fileOne}' style='max-width:100%;max-height:100%;pointer-events:none;display:${isEmpty(craftsmanshipTableBody_3.fileOne)};' />`"></td>
            </tr>
        </table>
        <!-- 模板三 end -->
        <!-- 尾部信息 start -->
        <table class="tableFooter">
            <tr>
                <td>最终结论：</td>
                <td  style="width: 18%;">{{ craftsmanshipTableFooter.finalConclusion }}</td>
                <td>检验员：（日期）</td>
                <td  style="width: 18%;">{{ craftsmanshipTableFooter.inspector }}</td>
                <td>检验审核：（日期）</td>
                <td  style="width: 18%;">{{ craftsmanshipTableFooter.inspectionAudit }}</td>
            </tr>
        </table>
        <table class="tableFooter">
            
            <tr>
                <td>{{ craftsmanshipTableFooter.mark }}</td>
                <td>{{ craftsmanshipTableFooter.numberOfPlaces }}</td>
                <td>{{ craftsmanshipTableFooter.changeTheFileNumber }}</td>
                <td>{{ craftsmanshipTableFooter.signature }}</td>
                <td>{{ craftsmanshipTableFooter.date }}</td>
                <td>编制（日期） </td>
                <td>审核（日期）</td>
                <td rowspan="2" colspan="2">中山市金马科技娱乐设备股份有限公司</td>
            </tr>
            <tr>
                <td>标志</td>
                <td>处数</td>
                <td>更改文件号</td>
                <td>签名</td>
                <td>日期</td>
                <td>{{ craftsmanshipTableFooter.establishment }}</td>
                <td>{{ craftsmanshipTableFooter.review }}</td>
            </tr>
        </table>
        <!-- 尾部信息 end -->       
	</div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Weldingprinter',
    data() {
        return {
            tablecraftsmanshipBodyVisible: [true,false,false],//模板显示选择
            craftsmanshipTableHeader: {
                "contactId" : "",//保存记录后返回的id
                "productName": "",
                "ownPartName": "",
                "partsName": "",
                "workpieceNumber": "",
                "productDrawingNumber": "",
                "ownPartDrawingNumber": "",
                "partsDrawingNumber": "",
                "quantity": ""
            },
            craftsmanshipTableBody_1: {
                rowsData:[
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""},
                    {"serialNumber": "*","processFlow": "","inspectionContent": "","skillsRequirement": "","selfTest_13": "","selfTest_14": "","selfTest_15": "","selfTest_16": "","signature_1": "","qualityInspection_13": "","qualityInspection_14": "","qualityInspection_15": "","qualityInspection_16": "","signatture_2": ""}
                ],
                fileOne:"",
                imgHtml:""
            },
            craftsmanshipTableBody_2: {
                rowsData:[
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""},
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""},
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""},
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""},
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""},
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""},
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""},
                {"serialNumber":"","processFlow":"","inspectionContent":"","skillsRequirement":"","selfTest":"","signature":""}
                ],
                fileOne:"",
                fileTwo:"",
                fileThree:"",
                imgHtmlOne:"",
                imgHtmlTwo:"",
                imgHtmlTherr:"",
            },
            craftsmanshipTableBody_3: {
                fileOne:"",
                imgHtml:""
            },
            craftsmanshipTableBodyResult: { //模板一和二的“结论”与“不符合确认”
                "conclusion": "",
                "inconsistentConfirmation": ""
            },      
            craftsmanshipTableFooter: {
                "finalConclusion": "",
                "inspector": "",
                "inspectionAudit": "",
                "mark": "",
                "numberOfPlaces": "",
                "changeTheFileNumber": "",
                "signature": "",
                "date": "",
                "establishment": "",
                "review": ""
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
            
            let contactId = this.$route.query.contactId//获取url的参数
            axios.get(`${this.baseURL}/basicdata/document.php?flag=getCraftsmanshipInfoData&contactID=${contactId}`)
            .then((response) => {     
                if(response.data.state == "success"){
                this.craftsmanshipTableHeader = response.data.data.craftsmanshipTableHeader
                this.craftsmanshipTableFooter = response.data.data.craftsmanshipTableFooter              
                switch(response.data.data.model){
                    case "1":                  
                    this.craftsmanshipTableBody_1 = response.data.data.craftsmanshipTableBody_1
                    this.craftsmanshipTableBodyResult = response.data.data.craftsmanshipTableBodyResult                  
                    this.dialogcraftsmanshipVisible = true
                    break;
                    case "2":
                    this.dialogcraftsmanshipVisible = true
                    this.tablecraftsmanshipBodyVisible = [false,true,false]
                    this.craftsmanshipTableBody_2 = response.data.data.craftsmanshipTableBody_2
                    this.craftsmanshipTableBodyResult = response.data.data.craftsmanshipTableBodyResult
                    //图片显示
                    // if(this.craftsmanshipTableBody_2.fileOne){//图片一
                    //     let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_2.fileOne
                    //     this.craftsmanshipTableBody_2.imgHtmlOne = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                    // }
                    // if(this.craftsmanshipTableBody_2.fileTwo){//图片二
                    //     let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_2.fileTwo
                    //     this.craftsmanshipTableBody_2.imgHtmlTwo = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                    // }
                    // if(this.craftsmanshipTableBody_2.fileThree){//图片三
                    //     let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_2.fileThree
                    //     this.craftsmanshipTableBody_2.imgHtmlTherr = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                    // }                 
                    break;
                    case "3":
                    this.dialogcraftsmanshipVisible = true
                    this.tablecraftsmanshipBodyVisible = [false,false,true]
                    this.craftsmanshipTableBody_3 = response.data.data.craftsmanshipTableBody_3
                    //显示图片
                    // if(this.craftsmanshipTableBody_3.fileOne){//图片三
                    //     let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_3.fileOne
                    //     this.craftsmanshipTableBody_3.imgHtml = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                    // } 
                    break;
                    default:
                    console.log("模型参数错误")
                }            
                }
            })
            .catch(function(error){
                console.log(error)
            })             
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
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        border-collapse: collapse;
        padding-left: 1mm;
        padding-right: 1mm;
    }

    /* 表格头部 */
    .tableHeader {
        width: 277mm;
        text-align: center;
    }
    /* 表格尾部 */
    .tableFooter {
        width: 277mm;
        text-align: center;
    }
    /* 模板一 */
    .tableFirstModel {
        width: 277mm;
        text-align: center;
        font-size: 10.5pt;
    }
    .craftsmanshipTableBody_1_img{
        width: 100%;
        height: 280px;
    }
    /* 模板二 */
    .tableSecondModel {
        width: 277mm;
        text-align: center;
        font-size: 10.5pt;
    }
    .craftsmanshipTableBody_2_img{
        width: 33%;
        height: 300px;
    }
    /* 模板三 */
    .tableThirdModel {
        width: 277mm;
        height: 550px;
        text-align: center;
    }
    .tableThirdModel td {
        width: 100%;
        height: 100%;
        text-align: center;
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


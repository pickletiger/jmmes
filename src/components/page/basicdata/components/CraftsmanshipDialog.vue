<template>
    <div>
        <!-- 制造工艺 -->
        <el-dialog 
            title="产品制造工艺技术要求及检验记录表"
            :visible.sync="dialogcraftsmanshipVisible"
            width="95%">
            <div slot="title" class="dialog-header" v-if="!craftsmanshipTableHeader.contactId">
                <h3>产品制造工艺技术要求及检验记录表</h3>
                <el-button type="primary" @click="choseTableShow('0')">模板一</el-button>
                <el-button type="primary" @click="choseTableShow('1')">模板二</el-button>
                <el-button type="primary" @click="choseTableShow('2')">模板三</el-button>
            </div>
            <table class="craftsmanshipTableHeader">
                <tr>
                <td>产品名称</td>
                <td><input v-model="craftsmanshipTableHeader.productName"/></td>
                <td>所属部件名称</td>
                <td><input v-model="craftsmanshipTableHeader.ownPartName"/></td>
                <td colspan="4">零部件名称</td>
                <td><input v-model="craftsmanshipTableHeader.partsName"/></td>
                <td colspan="4">工件编号</td>
                <td><input v-model="craftsmanshipTableHeader.workpieceNumber"/></td>
                </tr>
                <tr>
                <td>产品图号</td>
                <td><input v-model="craftsmanshipTableHeader.productDrawingNumber"/></td>
                <td>所属部件图号</td>
                <td><input v-model="craftsmanshipTableHeader.ownPartDrawingNumber"/></td>
                <td colspan="4">零部件图号</td>
                <td><input v-model="craftsmanshipTableHeader.partsDrawingNumber"/></td>
                <td colspan="4">数量</td>
                <td><input v-model="craftsmanshipTableHeader.quantity"/></td>
                </tr>
            </table>
            <table class="craftsmanshipTableBody_1" v-if="tablecraftsmanshipBodyVisible[0]">
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
                <td><input v-model="item.serialNumber" /></td>
                <td><input v-model="item.processFlow" /></td>
                <td><input v-model="item.inspectionContent" /></td>
                <td><input v-model="item.skillsRequirement" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.selfTest_13" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.selfTest_14" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.selfTest_15" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.selfTest_16" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.signature_1" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.qualityInspection_13" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.qualityInspection_14" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.qualityInspection_15" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.qualityInspection_16" maxlength="7" placeholder="限7个字" /></td>
                <td><input v-model="item.signatture_2" maxlength="7" placeholder="限7个字" /></td>
                </tr>
                <tr>
                <td colspan="4">结论</td>
                <td colspan="10"><input v-model="craftsmanshipTableBodyResult.conclusion" /></td>
                </tr>
                <tr>
                <td colspan="4">不符合确认</td>
                <td colspan="10"><input v-model="craftsmanshipTableBodyResult.inconsistentConfirmation" /></td>
                </tr>
                <tr>
                <td colspan="14" ref="firstfive" id="firstfive" class="craftsmanshipTableBody_1_img" @drop="drop($event,'5')" @dragover="allowDrop($event)" v-html="craftsmanshipTableBody_1.imgHtml"></td>
                </tr>
            </table>
            <table class="craftsmanshipTableBody_2" v-if="tablecraftsmanshipBodyVisible[1]">
                <tr>
                <td class="serialNumber">序号</td>
                <td>工艺流程</td>
                <td>检验内容</td>
                <td>技术要求</td>
                <td>自检</td>
                <td>签名/日期</td>
                </tr>
                <tr  v-for="(item,index) in craftsmanshipTableBody_2.rowsData">
                <td class="serialNumber"><input v-model="item.serialNumber" /></td>
                <td><input v-model="item.processFlow" /></td>
                <td><input v-model="item.inspectionContent" /></td>
                <td><input v-model="item.skillsRequirement" /></td>
                <td><input v-model="item.selfTest" /></td>
                <td><input v-model="item.signature" /></td>
                </tr>          
                <tr>
                <td colspan="4">结论</td>
                <td><input v-model="craftsmanshipTableBodyResult.conclusion" /></td>
                <td>&nbsp;</td>
                </tr>
                <tr>
                <td colspan="4">不符合确认</td>
                <td><input v-model="craftsmanshipTableBodyResult.inconsistentConfirmation" /></td>
                <td>&nbsp;</td>
                </tr>
                <tr>
                <td colspan="2" ref="secondmodelimgone" id="secondmodelimgone" class="craftsmanshipTableBody_2_img" @drop="drop($event,'1')" @dragover="allowDrop($event)" v-html="craftsmanshipTableBody_2.imgHtmlOne">&nbsp;</td>
                <td colspan="2" ref="secondmodelimgtwo" id="secondmodelimgtwo" class="craftsmanshipTableBody_2_img" @drop="drop($event,'2')" @dragover="allowDrop($event)" v-html="craftsmanshipTableBody_2.imgHtmlTwo">&nbsp;</td>
                <td colspan="2" ref="secondmodelimgthree" id="secondmodelimgthree" class="craftsmanshipTableBody_2_img" @drop="drop($event,'3')" @dragover="allowDrop($event)" v-html="craftsmanshipTableBody_2.imgHtmlTherr">&nbsp;</td>
                </tr>
            </table>
            <table class="craftsmanshipTableBody_3" v-if="tablecraftsmanshipBodyVisible[2]">
                <tr>
                <td ref="thirdmodelimg" id="thirdmodelimg" @drop="drop($event,'4')" @dragover="allowDrop($event)" v-html="craftsmanshipTableBody_3.imgHtml"></td>
                </tr>
            </table>
            <table class="craftsmanshipTableFooter">
                <tr>
                <td colspan="2">最终结论：</td>
                <td colspan="3"><input v-model="craftsmanshipTableFooter.finalConclusion"/></td>
                <td>检验员：（日期）</td>
                <td><input v-model="craftsmanshipTableFooter.inspector"/></td>
                <td>检验审核：（日期）</td>
                <td><input v-model="craftsmanshipTableFooter.inspectionAudit"/></td>
                </tr>
                <tr>
                <td><input v-model="craftsmanshipTableFooter.mark"/></td>
                <td><input v-model="craftsmanshipTableFooter.numberOfPlaces"/></td>
                <td><input v-model="craftsmanshipTableFooter.changeTheFileNumber"/></td>
                <td><input v-model="craftsmanshipTableFooter.signature"/></td>
                <td><input v-model="craftsmanshipTableFooter.date"/></td>
                <td colspan="2">编制（日期） </td>
                <td colspan="2">审核（日期）</td>
                </tr>
                <tr>
                <td>标志</td>
                <td>处数</td>
                <td>更改文件号</td>
                <td>签名</td>
                <td>日期</td>
                <td colspan="2"><input v-model="craftsmanshipTableFooter.establishment"/></td>
                <td colspan="2"><input v-model="craftsmanshipTableFooter.review"/></td>
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
    name: "CraftsmanshipDialog",
    props: {

    },
    data() {
        return {
            selectedTreeNode : {//左边树选中的节点（表类型，对应的id）
                tableFlag : "",
                relateId : ""
            },
            dialogcraftsmanshipVisible: false,//制造工艺dialog
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
    methods: {
        //重置焊接模态框的输入框
        resetInputCraftsmanship() {            
            this.tablecraftsmanshipBodyVisible = [true,false,false]
            this.craftsmanshipTableHeader = {
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
            this.craftsmanshipTableBody_1 = {
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
            this.craftsmanshipTableBody_2 = {
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
                imgHtmlTherr:""
            },
            this.craftsmanshipTableBody_3 = {
                fileOne:"",
                imgHtml:"",
            },
            this.craftsmanshipTableBodyResult = { //模板一和二的“结论”与“不符合确认”
                "conclusion": "",
                "inconsistentConfirmation": ""
            },      
            this.craftsmanshipTableFooter = {
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
        },
        //打开新建焊接模态框
        openCraftsmanshipDialog(selectedTreeNode){
            this.selectedTreeNode = selectedTreeNode
             console.log(selectedTreeNode)
            this.dialogcraftsmanshipVisible = true
            if(this.craftsmanshipTableHeader.contactId){
                this.resetInputCraftsmanship()
            } 
        },
        //阻止默认行为
        allowDrop(ev){
            ev.preventDefault()
        },
        //接收拖曳对象
		drop(ev,imgflag){
            ev.preventDefault()//阻止浏览器默认行为
            var files = ev.dataTransfer.files
            if(files.length){
                var file_img = files[0]
                switch(imgflag){
                case "0":
                    this.weldngTableFour.weldNumberMap = file_img
                    break;
                case "1":
                    this.craftsmanshipTableBody_2.fileOne = file_img
                    break;
                case "2":
                    this.craftsmanshipTableBody_2.fileTwo = file_img
                    break;
                case "3":
                    this.craftsmanshipTableBody_2.fileThree = file_img
                    break;
                case "4":
                    this.craftsmanshipTableBody_3.fileOne = file_img
                    break;
                case "5":
                this.craftsmanshipTableBody_1.fileOne = file_img
                break;
                }
                
                var reader = new FileReader();
                //判断文件类型
                if (file_img.type.match(/image*/)){
                    reader.onload = function (e){
                    // var imageBox = document.getElementById("imageBox")
                    // var temp_html = '<img src="'+ e.target.result +'" />'
                    var img = document.createElement('img')//创建标签img
                    img.src = e.target.result
                    // img.style.width = '100%'
                    // img.style.height = '100%'
                    img.style.maxWidth = '100%'
                    img.style.maxHeight = '100%'
                    img.style.pointerEvents = 'none'//事件无效化，穿透底层
                    var tdDoc = ev.toElement
                    tdDoc.innerHTML = ""
                    tdDoc.appendChild(img)
                    };
                    reader.readAsDataURL(file_img);
                }else{
                    console.log("此" + file_img.name + "不是图片文件！");
                }
            }
        },
        //选择制造表格显示
        choseTableShow(option){
            switch(option){
                case "0":
                this.tablecraftsmanshipBodyVisible = [true,false,false]
                break;
                case "1":
                this.tablecraftsmanshipBodyVisible = [false,true,false]
                break;
                case "2":
                this.tablecraftsmanshipBodyVisible = [false,false,true]
                break;
                default:
                this.tablecraftsmanshipBodyVisible = [true,false,false]
            }
        },
        //制造信息保存
        craftsmanshipSaveData(){
            let fd = new FormData()
            if(this.craftsmanshipTableHeader.contactId){//更新保存
                //模板一保存-更新
                if(this.tablecraftsmanshipBodyVisible[0]){
                    fd.append("flag","craftsmanshipUpdateDataOne")
                    fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
                    fd.append("craftsmanshipTableBody_1",JSON.stringify(this.craftsmanshipTableBody_1.rowsData))//可遍历信息
                    fd.append("craftsmanshipTableBodyResult",JSON.stringify(this.craftsmanshipTableBodyResult))//结论与不符合确认
                    fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
                    if(typeof(this.craftsmanshipTableBody_1.fileOne) != 'string' && this.craftsmanshipTableBody_1.fileOne != ''){
                        fd.append('myfile',this.craftsmanshipTableBody_1.fileOne)//装载图片
                    }
                    axios.post(`${this.baseURL}/basicdata/document.php`,fd)
                    .then((response) => {        
                        console.log(response)                
                        if(response.data.state == "success"){
                            this.$message({
                                showClose: true,
                                message: '更改成功',
                                type: 'success'
                            })                            
                        }else{
                            this.$message({
                                showClose: true,
                                message: '更改失败',
                                type: 'error'
                            })
                        } 
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.dialogcraftsmanshipVisible = false                                           
                    })
                    .catch(function (error){
                        console.log(error)
                    })
                    return
                }
                //模板二保存-更新
                if(this.tablecraftsmanshipBodyVisible[1]){
                    fd.append("flag","craftsmanshipUpdateDataOne")
                    fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
                    fd.append("craftsmanshipTableBody_2",JSON.stringify(this.craftsmanshipTableBody_2.rowsData))//可遍历信息
                    fd.append("craftsmanshipTableBodyResult",JSON.stringify(this.craftsmanshipTableBodyResult))//结论与不符合确认
                    fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
                    if(typeof(this.craftsmanshipTableBody_2.fileOne) != 'string' && this.craftsmanshipTableBody_2.fileOne != ''){
                        fd.append('myfileone',this.craftsmanshipTableBody_2.fileOne)//装载图片一
                    }
                    if(typeof(this.craftsmanshipTableBody_2.fileTwo) != 'string' && this.craftsmanshipTableBody_2.fileTwo != ''){
                        fd.append('myfiletwo',this.craftsmanshipTableBody_2.fileTwo)//装载图片二
                    }
                    if(typeof(this.craftsmanshipTableBody_2.fileThree) != 'string' && this.craftsmanshipTableBody_2.fileThree != ''){
                        fd.append('myfilethree',this.craftsmanshipTableBody_2.fileThree)//装载图片三
                    }
                    
                    axios.post(`${this.baseURL}/basicdata/document.php`,fd)
                    .then((response) => {
                        if(response.data.state == "success"){
                            this.$message({
                                showClose: true,
                                message: '更改成功',
                                type: 'success'
                            })
                        }else{                            
                            this.$message({
                                showClose: true,
                                message: '更改失败',
                                type: 'error'
                            })
                        }
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.dialogcraftsmanshipVisible = false          
                    })
                    .catch(function (error){
                        console.log(error)
                    })
                    return
                }
                //模板三保存-更新
                if(this.tablecraftsmanshipBodyVisible[2]){                    
                    fd.append("flag","craftsmanshipUpdateDataThree")
                    fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
                    fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
                    if(typeof(this.craftsmanshipTableBody_3.fileOne) != 'string' && this.craftsmanshipTableBody_3.fileOne != ''){
                        fd.append('myfile',this.craftsmanshipTableBody_3.fileOne)//装载图片
                    }
                    
                    axios.post(`${this.baseURL}/basicdata/document.php`,fd)
                    .then((response) => {
                        if(response.data.state == "success"){
                            this.$message({
                                showClose: true,
                                message: '更改成功',
                                type: 'success'
                            })
                        }else{                            
                            this.$message({
                                showClose: true,
                                message: '更改失败',
                                type: 'error'
                            })
                        }
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.dialogcraftsmanshipVisible = false         
                    })
                    .catch(function (error){
                        console.log(error)
                    })
                    return
                }
            }else{//新建保存
                //模板一保存-新建
                if(this.tablecraftsmanshipBodyVisible[0]){                
                    fd.append("flag","craftsmanshipInsertDataOne")
                    fd.append("treeId",this.selectedTreeNode.relateId)//选中树的id
                    fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
                    fd.append("craftsmanshipTableBody_1",JSON.stringify(this.craftsmanshipTableBody_1.rowsData))//可遍历信息
                    fd.append("craftsmanshipTableBodyResult",JSON.stringify(this.craftsmanshipTableBodyResult))//结论与不符合确认
                    fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
                    fd.append('myfile',this.craftsmanshipTableBody_1.fileOne)//装载图片一
                    axios.post(`${this.baseURL}/basicdata/document.php`,fd)
                    .then((response) => {
                        this.$message({
                            showClose: true,
                            message: '新建成功',
                            type: 'success'
                        })
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.dialogcraftsmanshipVisible = false 
                    
                    })
                    .catch(function (error){
                        console.log(error)
                    })
                    return
                }
                //模板二保存-新建
                if(this.tablecraftsmanshipBodyVisible[1]){          
                    fd.append("flag","craftsmanshipInsertDataTwo")
                    fd.append("treeId",this.selectedTreeNode.relateId)//选中树的id
                    fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
                    fd.append("craftsmanshipTableBody_2",JSON.stringify(this.craftsmanshipTableBody_2.rowsData))//可遍历信息
                    fd.append("craftsmanshipTableBodyResult",JSON.stringify(this.craftsmanshipTableBodyResult))//结论与不符合确认
                    fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
                    fd.append('myfileone',this.craftsmanshipTableBody_2.fileOne)//装载图片一
                    fd.append('myfiletwo',this.craftsmanshipTableBody_2.fileTwo)//装载图片二
                    fd.append('myfilethree',this.craftsmanshipTableBody_2.fileThree)//装载图片三
                    
                    axios.post(`${this.baseURL}/basicdata/document.php`,fd)
                    .then((response) => {
                        if(response.data.state == "success"){
                            this.$message({
                                showClose: true,
                                message: '新建成功',
                                type: 'success'
                            })
                        }else{                            
                            this.$message({
                                showClose: true,
                                message: '新建失败',
                                type: 'error'
                            })
                        }
                        
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.dialogcraftsmanshipVisible = false          
                    })
                    .catch(function (error){
                        console.log(error)
                    })
                    return
                }
                //模板三保存-新建
                if(this.tablecraftsmanshipBodyVisible[2]){
                    fd.append("flag","craftsmanshipInsertDataThree")
                    fd.append("treeId",this.selectedTreeNode.relateId)//选中树的id
                    fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
                    fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
                    fd.append('myfile',this.craftsmanshipTableBody_3.fileOne)//装载图片一
                    axios.post(`${this.baseURL}/basicdata/document.php`,fd)
                    .then((response) => {
                        if(response.data.state == "success"){
                            this.$message({
                                showClose: true,
                                message: '新建成功',
                                type: 'success'
                            })
                        }else{                            
                            this.$message({
                                showClose: true,
                                message: '新建失败',
                                type: 'error'
                            })
                        }
                        this.$emit("refreshTable",this.selectedTreeNode)
                        this.dialogcraftsmanshipVisible = false           
                    })
                    .catch(function (error){
                        console.log(error)
                    })
                    return
                }
            } 
        },
        //查看及编辑焊接信息
        Handlealter(contactId,selectedTreeNode){
            this.selectedTreeNode = selectedTreeNode
            axios.get(`${this.baseURL}/basicdata/document.php?flag=getCraftsmanshipInfoData&contactID=${contactId}`)
            .then((response) => {     
                if(response.data.state == "success"){
                    this.craftsmanshipTableHeader = response.data.data.craftsmanshipTableHeader
                    this.craftsmanshipTableFooter = response.data.data.craftsmanshipTableFooter              
                    switch(response.data.data.model){
                        case "1":                  
                            this.craftsmanshipTableBody_1 = response.data.data.craftsmanshipTableBody_1
                            this.craftsmanshipTableBodyResult = response.data.data.craftsmanshipTableBodyResult
                            this.tablecraftsmanshipBodyVisible = [true,false,false]                  
                            this.dialogcraftsmanshipVisible = true
                            this.craftsmanshipTableBody_1 = response.data.data.craftsmanshipTableBody_1
                            //显示图片
                            if(this.craftsmanshipTableBody_1.fileOne){//图片一
                                let imgsrc = `${this.baseURL}`+'/'+this.craftsmanshipTableBody_1.fileOne
                                this.craftsmanshipTableBody_1.imgHtml = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                            } 
                            break;
                        case "2":
                            this.dialogcraftsmanshipVisible = true
                            this.tablecraftsmanshipBodyVisible = [false,true,false]
                            this.craftsmanshipTableBody_2 = response.data.data.craftsmanshipTableBody_2
                            this.craftsmanshipTableBodyResult = response.data.data.craftsmanshipTableBodyResult
                            //图片显示
                            if(this.craftsmanshipTableBody_2.fileOne){//图片一
                                let imgsrc = `${this.baseURL}`+'/'+this.craftsmanshipTableBody_2.fileOne
                                this.craftsmanshipTableBody_2.imgHtmlOne = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                            }
                            if(this.craftsmanshipTableBody_2.fileTwo){//图片二
                                let imgsrc = `${this.baseURL}`+'/'+this.craftsmanshipTableBody_2.fileTwo
                                this.craftsmanshipTableBody_2.imgHtmlTwo = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                            }
                            if(this.craftsmanshipTableBody_2.fileThree){//图片三
                                let imgsrc = `${this.baseURL}`+'/'+this.craftsmanshipTableBody_2.fileThree
                                this.craftsmanshipTableBody_2.imgHtmlTherr = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                            }                 
                            break;
                        case "3":
                            this.dialogcraftsmanshipVisible = true
                            this.tablecraftsmanshipBodyVisible = [false,false,true]
                            this.craftsmanshipTableBody_3 = response.data.data.craftsmanshipTableBody_3
                            //显示图片
                            if(this.craftsmanshipTableBody_3.fileOne){//图片三
                                let imgsrc = `${this.baseURL}`+'/'+this.craftsmanshipTableBody_3.fileOne
                                this.craftsmanshipTableBody_3.imgHtml = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                            } 
                            break;
                        default:
                            console.log("模型参数错误")
                    }            
                }
            })
            .catch(function(error){
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
</style>

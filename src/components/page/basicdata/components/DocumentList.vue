<template>
  <div>
    <vue-good-table 
      :columns="columns" 
      :rows="rows" 
      @on-column-filter="selectionChanged"
      :search-options="{
        enabled: true,
        placeholder: '搜索此表格'
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'operate'">
          <el-button type="primary" icon="el-icon-edit" circle @click="Handlealter(props.row.contactId,props.row.diff)"></el-button>
          <el-button type="primary" icon="el-icon-printer" circle @click="handlePrinter(props.row.contactId,props.row.diff)"></el-button>
          <!-- <el-button type="danger" icon="el-icon-delete" circle @click="deleteStaff" ></el-button> -->
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
      <div slot="table-actions">
        <el-button type="primary" @click="openWeldingDialog">新建焊接</el-button>
        <el-button type="primary" @click="openCraftsmanshipDialog">新建制造</el-button>
      </div>
    </vue-good-table>

    <!-- 焊接信息 -->
    <el-dialog 
      title="焊接工艺及检验记录" 
      :visible.sync="dialogWeldingVisible"
      width="100%">
      <div slot="title" class="dialog-header">
        <h3>焊接工艺及检验记录</h3>
        <!-- <el-button type="primary" v-if="!weldingTableOne.contactId" @click="resetInput">重置输入</el-button> -->
      </div>
      <table class="tableOne">
        <tr>
          <td>工艺卡号</td>
          <td><el-input v-model="weldingTableOne.processNumber"/></td>
          <td>数量</td>
          <td><el-input  v-model="weldingTableOne.quantity"/></td>
          <td>工件编号</td>
          <td><el-input v-model="weldingTableOne.workpieceNumber"/></td>
          <td>车间</td>
          <td><el-input v-model="weldingTableOne.workshop"/></td>
          <td>工单号</td>
          <td><el-input v-model="weldingTableOne.workOrderNumber"/></td>
        </tr>
        <tr>
          <td>产品名称</td>
          <td><el-input v-model="weldingTableOne.productName"/></td>
          <td>产品代号</td>
          <td><el-input v-model="weldingTableOne.productCode"/></td>
          <td>部件名称</td>
          <td><el-input v-model="weldingTableOne.partName"/></td>
          <td>部件图号</td>
          <td colspan="3"><el-input v-model="weldingTableOne.partDrawingNumber"/></td>	          
        </tr>
		  </table>
      <table class="tableTwo">
        <tr>
          <td rowspan="2" class="serialNumber">焊缝编号</td>
          <td colspan="4" rowspan="2">材质及规格</td>
          <td rowspan="2">焊接方法</td>
          <td rowspan="2">坡口形式</td>
          <td rowspan="2">焊材</td>
          <td rowspan="2">规格</td>
          <td colspan="2">焊接层次</td>
          <td rowspan="2">保护气体</td>
          <td rowspan="2">焊接电流(A)</td>
          <td colspan="2">实际操作电流(A)</td>
          <td rowspan="2">焊接电压(V)</td>
          <td colspan="2">实际操作电压(V)</td>
          <td rowspan="2">预焊接工艺规程编号</td>
          <td rowspan="2">焊接工艺评定编号</td>
          <td rowspan="2">探伤要求</td>
          <td rowspan="2">钢印号</td>
        </tr>
        <tr>
          <td>层数</td>
          <td>道数</td>
          <td colspan="2">检验员确认</td>
          <td colspan="2">检验员确认</td>
        </tr>
        <tr v-for="(item,index) in weldingTableTwo_1">
            <td><el-input v-model="item.weldNumber" @change="weldNumberChangeCompletion(index)" /></td>
            <td>
              <el-select 
                v-model="item.materialAndSpecifications_1" 
                size="mini" 
                placeholder=""
                @change="completionInformation(index)">
                <el-option
                  v-for="item in materialOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-select 
                v-model="item.materialAndSpecifications_1_thickness" 
                size="mini" 
                placeholder=""
                @change="thicknessChange(index)">
                <el-option
                  v-for="item in thicknessOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-select 
                v-model="item.materialAndSpecifications_2" 
                size="mini" 
                placeholder=""
                @change="completionInformation(index)">
                <el-option
                  v-for="item in materialOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-select 
                v-model="item.materialAndSpecifications_2_thickness" 
                size="mini" 
                placeholder=""
                @change="thicknessChange(index)">
                <el-option
                  v-for="item in thicknessOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-select
                v-model="item.weldingMethod" 
                size="mini" 
                placeholder=""
                @change="mothodChangeConsumables(index)">
                <el-option 
                  v-for="item in weldingMethodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <!-- <td><el-input v-model="item.weldingMethod" /></td> -->
            <!-- <td><el-input v-model="item.grooveForm" /></td> -->
            <td>
              <el-select
                v-model="item.grooveForm" 
                size="mini" 
                placeholder="">
                <el-option 
                  v-for="item in grooveFormOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td><el-input v-model="item.consumables" /></td>
            <td><el-input v-model="item.specifications" /></td>
            <td><el-input v-model="item.weldingLevel_numberOfLayers" /></td>
            <td><el-input v-model="item.weldingLevel_numberOftracks" /></td>
            <td><el-input v-model="item.protectiveGas" /></td>
            <td><el-input v-model="item.weldingCurrent" /></td>
            <td><el-input v-model="item.actualCurrent_1" /></td>
            <td><el-input v-model="item.actualCurrent_2" /></td>
            <td><el-input v-model="item.weldingVoltage" /></td>
            <td><el-input v-model="item.actualVoltage_1" /></td>
            <td><el-input v-model="item.actualVoltage_2" /></td>
            <td><el-input v-model="item.specificationNumber" /></td>
            <td><el-input v-model="item.ratingNumber" /></td>
            <!-- <td><el-input v-model="item.flawDetectionRequirements" /></td> -->
            <td>
              <el-select
                v-model="item.flawDetectionRequirements" 
                size="mini" 
                placeholder="">
                <el-option 
                  v-for="item in flawDetectionRequirementsOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td><el-input v-model="item.steelStamp" /></td>
        </tr>
        <tr>
          <td colspan="22" align="center" valign="middle">表1焊缝检验记录</td>
        </tr>
        <tr>
          <td>控制点</td>
          <td>序号</td>
          <td colspan="4">检查内容</td>
          <td colspan="6">技术（工艺）要求</td>
          <td colspan="6">检验结果</td>
          <td colspan="4">检验员签名（日期）</td>
        </tr>
        <tr v-for="(item,index) in weldingTableTwo_2">
          <!-- <td><el-input v-model="item.controlPoint" /></td>
          <td><el-input v-model="item.serialNumber" /></td> -->
          <td rowspan="6" v-if="index == 0">焊中检查</td>
          <td rowspan="2" v-if="index == 6">焊后检查</td>
          <td><el-input v-model="item.serialNumber" /></td>
          <td colspan="4"><el-input v-model="item.checkContent" /></td>
          <td colspan="6"><el-input v-model="item.processRequirements" /></td>
          <td colspan="6"><el-input v-model="item.testResult" /></td>
          <td colspan="4"><el-input v-model="item.inspectorSingnature" /></td>
        </tr>
		  </table>
      <table class="tableThree">
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
        <tr v-for="(item,index) in weldingTableThree_1">
          <td><el-input v-model="item.weldNumber" /></td>
          <td><el-input v-model="item.processRequirements_1" /></td>
          <td><el-input v-model="item.testResult_1" /></td>
          <td><el-input v-model="item.inspectorSingnature_1" /></td>
          <td><el-input v-model="item.processRequirements_2" /></td>
          <td><el-input v-model="item.testResult_2" /></td>
          <td><el-input v-model="item.inspectorSingnature_2" /></td>
          <td><el-input v-model="item.processRequirements_3" /></td>
          <td><el-input v-model="item.testResult_3" /></td>
          <td><el-input v-model="item.inspectorSingnature_3" /></td>
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
          <td><el-input v-model="item.weldNumber" /></td>
          <td><el-input v-model="item.processRequirements_1" /></td>
          <td><el-input v-model="item.testResult_1" /></td>
          <td><el-input v-model="item.inspectorSingnature_1" /></td>
          <td><el-input v-model="item.processRequirements_2" /></td>
          <td><el-input v-model="item.testResult_2" /></td>
          <td><el-input v-model="item.inspectorSingnature_2" /></td>
          <td><el-input v-model="item.processRequirements_3" /></td>
          <td><el-input v-model="item.testResult_3" /></td>
          <td><el-input v-model="item.inspectorSingnature_3" /></td>
        </tr>
        <tr>
          <td>终检结果</td>
          <td colspan="3"><el-input v-model="weldingTableThree_3.finalInspectionResult" /></td>
          <td>检验员签名</td>
          <td colspan="3"><el-input v-model="weldingTableThree_3.inspectorSingnature" /></td>
          <td>日期</td>
          <td><el-input v-model="weldingTableThree_3.date" /></td>
        </tr>
      </table>
      <table class="tableFour">
        <tr>
          <td class="weldingsequence">焊接顺序</td>
          <td rowspan="2" id="imageBox" ref="imageBox" @drop="drop($event,'0')" @dragover="allowDrop($event)" v-html="weldngTableFour.imgHtml">
            
          </td>
        </tr>
        <tr>
          <td><el-input class="weldingsequenceinput" v-model="weldngTableFour.weldingSequence" /></td>
        </tr>
      </table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogWeldingVisible = false">取 消</el-button>
        <el-button type="primary" @click="weldingSaveData">确 定</el-button>
      </div>
    </el-dialog>

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
          <td><el-input v-model="craftsmanshipTableHeader.productName"/></td>
          <td>所属部件名称</td>
          <td><el-input v-model="craftsmanshipTableHeader.ownPartName"/></td>
          <td colspan="4">零部件名称</td>
          <td><el-input v-model="craftsmanshipTableHeader.partsName"/></td>
          <td colspan="4">工件编号</td>
          <td><el-input v-model="craftsmanshipTableHeader.workpieceNumber"/></td>
        </tr>
        <tr>
          <td>产品图号</td>
          <td><el-input v-model="craftsmanshipTableHeader.productDrawingNumber"/></td>
          <td>所属部件图号</td>
          <td><el-input v-model="craftsmanshipTableHeader.ownPartDrawingNumber"/></td>
          <td colspan="4">零部件图号</td>
          <td><el-input v-model="craftsmanshipTableHeader.partsDrawingNumber"/></td>
          <td colspan="4">数量</td>
          <td><el-input v-model="craftsmanshipTableHeader.quantity"/></td>
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
        <tr v-for="(item,index) in craftsmanshipTableBody_1">
          <td><el-input v-model="item.serialNumber" /></td>
          <td><el-input v-model="item.processFlow" /></td>
          <td><el-input v-model="item.inspectionContent" /></td>
          <td><el-input v-model="item.skillsRequirement" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.selfTest_13" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.selfTest_14" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.selfTest_15" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.selfTest_16" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.signature_1" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.qualityInspection_13" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.qualityInspection_14" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.qualityInspection_15" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.qualityInspection_16" maxlength="7" placeholder="限7个字" /></td>
          <td><el-input v-model="item.signatture_2" maxlength="7" placeholder="限7个字" /></td>
        </tr>
        <tr>
          <td colspan="4">结论</td>
          <td colspan="10"><el-input v-model="craftsmanshipTableBodyResult.conclusion" /></td>
        </tr>
        <tr>
          <td colspan="4">不符合确认</td>
          <td colspan="10"><el-input v-model="craftsmanshipTableBodyResult.inconsistentConfirmation" /></td>
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
          <td class="serialNumber"><el-input v-model="item.serialNumber" /></td>
          <td><el-input v-model="item.processFlow" /></td>
          <td><el-input v-model="item.inspectionContent" /></td>
          <td><el-input v-model="item.skillsRequirement" /></td>
          <td><el-input v-model="item.selfTest" /></td>
          <td><el-input v-model="item.signature" /></td>
        </tr>          
        <tr>
          <td colspan="4">结论</td>
          <td><el-input v-model="craftsmanshipTableBodyResult.conclusion" /></td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td colspan="4">不符合确认</td>
          <td><el-input v-model="craftsmanshipTableBodyResult.inconsistentConfirmation" /></td>
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
          <td colspan="3"><el-input v-model="craftsmanshipTableFooter.finalConclusion"/></td>
          <td>检验员：（日期）</td>
          <td><el-input v-model="craftsmanshipTableFooter.inspector"/></td>
          <td>检验审核：（日期）</td>
          <td><el-input v-model="craftsmanshipTableFooter.inspectionAudit"/></td>
        </tr>
        <tr>
          <td><el-input v-model="craftsmanshipTableFooter.mark"/></td>
          <td><el-input v-model="craftsmanshipTableFooter.numberOfPlaces"/></td>
          <td><el-input v-model="craftsmanshipTableFooter.changeTheFileNumber"/></td>
          <td><el-input v-model="craftsmanshipTableFooter.signature"/></td>
          <td><el-input v-model="craftsmanshipTableFooter.date"/></td>
          <td colspan="2">编制（日期） </td>
          <td colspan="2">审核（日期）</td>
        </tr>
        <tr>
          <td>标志</td>
          <td>处数</td>
          <td>更改文件号</td>
          <td>签名</td>
          <td>日期</td>
          <td colspan="2"><el-input v-model="craftsmanshipTableFooter.establishment"/></td>
          <td colspan="2"><el-input v-model="craftsmanshipTableFooter.review"/></td>
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
import { VueGoodTable } from "vue-good-table"
import axios from "axios"
export default {
  name: "DocimentList",
  data() {
    return {
      dialogFormVisible: false,
      dialogWeldingVisible: false,//焊接信息dialog
      dialogcraftsmanshipVisible: false,//制造工艺dialog
      tablecraftsmanshipBodyVisible: [true,false,false],//模板显示选择
      forminfodata: {
        contact_id:"",
        department: "",
        directory: "",
        part: "",
        filename: "",
        update:"",
      },
      fileinfo:"",
      formLabelWidth: "120px",
      searchItem: "",
      value1:'',
      columns: [
        {
          label: "产品代号",
          field: "productcode"
        },
        {
          label: "工艺卡号",
          field: "processnumber"
        },
        {
          label: "产品名称",
          field: "producname"
        },
        {
          label: "部件名称",
          field: "partname"
        },
        {
          label: "创建日期",
          field: "ctime"
        },
        {
          label: "操作",
          field: "operate"
        }
      ],
      rows: [],
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
        "weldingSequence":"",
        "weldNumberMap":"",
        "imgHtml":""
      },
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
      craftsmanshipTableBody_1: [
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
      },
      //材质及规格选项
      materialOptions: [ { "value": "Q235-B" },{ "value": "Q345-B" },{ "value": "20#" },{ "value": "40Cr#" },{ "value": "45#" },{ "value": "2Cr13" },{ "value": "0Cr18Ni9" }],
      //板厚度选项
      thicknessOptions:[{value:"1"},{value:"2"},{value:"3"},{value:"4"},{value:"5"},{value:"6"},{value:"7"},{value:"8"},{value:"9"},{value:"10"},{value:"11"},{value:"12"},{value:"13"},{value:"14"},{value:"15"},{value:"16"},{value:"17"},{value:"18"},{value:"19"},{value:"20"},{value:"21"},{value:"22"},{value:"23"},{value:"24"}],
      //焊接方法选项
      weldingMethodOptions: [{value:"FCAW"},{value:"GMAW"},{value:"SMAW"},{value:"SAW"},{value:"GTAW"}],
      //坡口形式选项
      grooveFormOptions: [{value:"对接焊缝"},{value:"角焊缝"},{value:"组合焊缝"},{value:"塞焊缝"},{value:"槽焊缝"}],
      //探伤要求选项
      flawDetectionRequirementsOptions: [{value:"MT"},{value:"PT"},{value:"MT/UT"},{value:"MT/RT"},{value:"MT/UT/RT"},{value:"MT/UT/20%RT"},{value:"PT/RT"}],
    };
  },
  components: {
    VueGoodTable    
  },
  created () {
    this.GetListData();
  },
  methods: {
    //异步获取后台数据
    GetListData () {
      axios.get(`${this.baseURL}/basicdata/document.php?flag=getTableListData`)
      .then((response) => {
        this.rows = response.data.data
      })
      .catch(function(error){
        console.log(error)
      })
    },
    //表格的搜索功能
    selectionChanged(params) {
      // console.log(params.columnFilters);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //重置焊接模态框的输入框
    resetInput() {
      this.weldingTableOne = {
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
      }
      this.weldingTableTwo_1 = [
        {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
        {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
        {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
        {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
        {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""},
        {"weldNumber":"","materialAndSpecifications_1":"","materialAndSpecifications_1_thickness":"","materialAndSpecifications_2":"","materialAndSpecifications_2_thickness":"","weldingMethod":"","grooveForm":"","consumables":"","specifications":"","weldingLevel_numberOfLayers":"","weldingLevel_numberOftracks":"","protectiveGas":"","weldingCurrent":"","actualCurrent_1":"","actualCurrent_2":"","weldingVoltage":"","actualVoltage_1":"","actualVoltage_2":"","specificationNumber":"","ratingNumber":"","flawDetectionRequirements":"","steelStamp":""}
      ]
      this.weldingTableTwo_2 = [
        {"serialNumber":"1","checkContent":"焊材烘干及保温","processRequirements":"","testResult":"","inspectorSingnature":""},
        {"serialNumber":"2","checkContent":"预热温度","processRequirements":"","testResult":"","inspectorSingnature":""},
        {"serialNumber":"3","checkContent":"焊材牌号及规格","processRequirements":"","testResult":"","inspectorSingnature":""},
        {"serialNumber":"4","checkContent":"焊接设备","processRequirements":"","testResult":"","inspectorSingnature":""},
        {"serialNumber":"5","checkContent":"保护气体","processRequirements":"","testResult":"","inspectorSingnature":""},
        {"serialNumber":"6","checkContent":"钢印号","processRequirements":"","testResult":"","inspectorSingnature":""},
        {"serialNumber":"1","checkContent":"去应力退火","processRequirements":"","testResult":"","inspectorSingnature":""},
        {"serialNumber":"2","checkContent":"探伤","processRequirements":"","testResult":"","inspectorSingnature":""}
      ]
      this.weldingTableThree_1 = [
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""}
      ]
      this.weldingTableThree_2 = [
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""},
        {"weldNumber":"","processRequirements_1":"","testResult_1":"","inspectorSingnature_1":"","processRequirements_2":"","testResult_2":"","inspectorSingnature_2":"","processRequirements_3":"","testResult_3":"","inspectorSingnature_3":""}
      ]
      this.weldingTableThree_3 = {
        "finalInspectionResult":"",
        "inspectorSingnature":"",
        "date":""
      }
      this.weldngTableFour = {
        "weldingSequence":"",
        "weldNumberMap":"",
        "imgHtml":""
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
        "workpieceNumber": "",
        "productDrawingNumber": "",
        "ownPartDrawingNumber": "",
        "partsDrawingNumber": "",
        "quantity": ""
      },
      this.craftsmanshipTableBody_1 = [
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
        imgHtmlTherr:"",
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
    openWeldingDialog(){
      this.dialogWeldingVisible = true
      if(this.weldingTableOne.contactId){
        this.resetInput()
      } 
    },
    //打开新建焊接模态框
    openCraftsmanshipDialog(){
      this.dialogcraftsmanshipVisible = true
      if(this.craftsmanshipTableHeader.contactId){
        this.resetInputCraftsmanship()
      } 
    },

    // 删除员工
    deleteStaff() {
      this.$confirm('将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },    
    //查看及编辑焊接信息
    Handlealter(contactId,diff){
      switch(diff){
        case "welding":
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
              
              let imgsrc = '/jmmes/'+this.weldngTableFour.weldNumberMap
              this.weldngTableFour.imgHtml = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'

              this.dialogWeldingVisible = true
            }
          })
          .catch(function(error){
            console.log(error)
          })
          break;
        case "craftsmanship":
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
                  if(this.craftsmanshipTableBody_2.fileOne){//图片一
                    let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_2.fileOne
                    this.craftsmanshipTableBody_2.imgHtmlOne = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                  }
                  if(this.craftsmanshipTableBody_2.fileTwo){//图片二
                    let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_2.fileTwo
                    this.craftsmanshipTableBody_2.imgHtmlTwo = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                  }
                  if(this.craftsmanshipTableBody_2.fileThree){//图片三
                    let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_2.fileThree
                    this.craftsmanshipTableBody_2.imgHtmlTherr = '<img src="'+imgsrc+'" style="max-width:100%;max-height:100%;pointer-events:none;">'
                  }                 
                  break;
                case "3":
                  this.dialogcraftsmanshipVisible = true
                  this.tablecraftsmanshipBodyVisible = [false,false,true]
                  this.craftsmanshipTableBody_3 = response.data.data.craftsmanshipTableBody_3
                  //显示图片
                  if(this.craftsmanshipTableBody_3.fileOne){//图片三
                    let imgsrc = '/jmmes/'+this.craftsmanshipTableBody_3.fileOne
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
          break;
        default :
          console.log("无效")
      }
    },
    //焊接与制造信息打印
    handlePrinter(contactId,diff){
      switch(diff){
        case "welding":
          var myUrl = '#/Weldingprinter?contactId='+contactId
          window.open(myUrl,'_blank')
          break
        case "craftsmanship":
          var myUrl = '#/Craftsmanshipprinter?contactId='+contactId
          window.open(myUrl,'_blank')
          break
        default:
          console.log("分类参数出错")  
      }      
    },
    //下载文件
    Downloadfile(filepath){
      let myurl = "http://127.0.0.1:8081/jmmes_backstage/document/downloadfile.php?filepath=../"+filepath
      window.open(myurl,"_blank")
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
    //焊接信息保存
    weldingSaveData(){
      // dialogWeldingVisible = false
      let fd = new FormData()
      if(this.weldingTableOne.contactId){//更新保存
        fd.append('flag', "updateData")
        let weldingtable = this.weldingTableOne
        weldingtable.finalInspectionResult = this.weldingTableThree_3.finalInspectionResult
        weldingtable.inspectorSingnature = this.weldingTableThree_3.inspectorSingnature
        weldingtable.date = this.weldingTableThree_3.date
        weldingtable.weldingSequence = this.weldngTableFour.weldingSequence
        fd.append('weldingtable', JSON.stringify(weldingtable)) //装载头部公共信息+不用进行循环的字段
        fd.append('weldingtableone', JSON.stringify(this.weldingTableTwo_1)) //焊接工艺及检验记录的需循环第一个表格
        fd.append('weldingtabletwo', JSON.stringify(this.weldingTableTwo_2)) //焊接工艺及检验记录的需循环第二个表格
        fd.append('weldingtablethree', JSON.stringify(this.weldingTableThree_1)) //焊接工艺及检验记录的需循环第三个表格
        fd.append('weldingtablefour', JSON.stringify(this.weldingTableThree_2)) //焊接工艺及检验记录的需循环第四个表格
        if(typeof(this.weldngTableFour.weldNumberMap) != 'string' && this.weldngTableFour.weldNumberMap != ''){
          fd.append('myfile',this.weldngTableFour.weldNumberMap)//装载图片
        }
        axios.post(`${this.baseURL}/basicdata/document.php`,fd)
        .then((response) => {
          console.log(response)
          alert("保存成功")
          window.location.reload()
        })
        .catch(function (error){
          console.log(error)
        })
      }else{//新建保存
        fd.append('flag', "insertData")
        let weldingtable = this.weldingTableOne
        weldingtable.finalInspectionResult = this.weldingTableThree_3.finalInspectionResult
        weldingtable.inspectorSingnature = this.weldingTableThree_3.inspectorSingnature
        weldingtable.date = this.weldingTableThree_3.date
        weldingtable.weldingSequence = this.weldngTableFour.weldingSequence
        fd.append('weldingtable', JSON.stringify(weldingtable)) //装载头部公共信息+不用进行循环的字段
        fd.append('weldingtableone', JSON.stringify(this.weldingTableTwo_1)) //焊接工艺及检验记录的需循环第一个表格
        fd.append('weldingtabletwo', JSON.stringify(this.weldingTableTwo_2)) //焊接工艺及检验记录的需循环第二个表格
        fd.append('weldingtablethree', JSON.stringify(this.weldingTableThree_1)) //焊接工艺及检验记录的需循环第三个表格
        fd.append('weldingtablefour', JSON.stringify(this.weldingTableThree_2)) //焊接工艺及检验记录的需循环第四个表格
        fd.append('myfile',this.weldngTableFour.weldNumberMap)//装载图片
        axios.post(`${this.baseURL}/basicdata/document.php`,fd)
        .then((response) => {
          console.log(response)
          alert("保存成功")
          window.location.reload()
        })
        .catch(function (error){
          console.log(error)
        })
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
          fd.append("craftsmanshipTableBody_1",JSON.stringify(this.craftsmanshipTableBody_1))//可遍历信息
          fd.append("craftsmanshipTableBodyResult",JSON.stringify(this.craftsmanshipTableBodyResult))//结论与不符合确认
          fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息

          axios.post(`${this.baseURL}/basicdata/document.php`,fd)
          .then((response) => {
            console.log(response)
            alert("保存成功")
          
          })
          .catch(function (error){
            console.log(error)
          })
          return
        }
        //模板二保存-更新
        if(this.tablecraftsmanshipBodyVisible[1]){
          fd.append("flag","craftsmanshipInsertDataTwo")
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
            console.log(response)
            alert("保存成功")          
          })
          .catch(function (error){
            console.log(error)
          })
          return
        }
        //模板三保存-更新
        if(this.tablecraftsmanshipBodyVisible[2]){
          console.log(this.craftsmanshipTableHeader)
          console.log(this.craftsmanshipTableBody_3)
          console.log(this.craftsmanshipTableFooter)
          fd.append("flag","craftsmanshipUpdateDataThree")
          fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
          fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
          if(typeof(this.craftsmanshipTableBody_3.fileOne) != 'string' && this.craftsmanshipTableBody_3.fileOne != ''){
            fd.append('myfile',this.craftsmanshipTableBody_3.fileOne)//装载图片
          }
          
          axios.post(`${this.baseURL}/basicdata/document.php`,fd)
          .then((response) => {
            console.log(response)
            alert("保存成功")          
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
          fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
          fd.append("craftsmanshipTableBody_1",JSON.stringify(this.craftsmanshipTableBody_1))//可遍历信息
          fd.append("craftsmanshipTableBodyResult",JSON.stringify(this.craftsmanshipTableBodyResult))//结论与不符合确认
          fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息

          axios.post(`${this.baseURL}/basicdata/document.php`,fd)
          .then((response) => {
            console.log(response)
            alert("保存成功")
          
          })
          .catch(function (error){
            console.log(error)
          })
          return
        }
        //模板二保存-新建
        if(this.tablecraftsmanshipBodyVisible[1]){          
          fd.append("flag","craftsmanshipInsertDataTwo")
          fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
          fd.append("craftsmanshipTableBody_2",JSON.stringify(this.craftsmanshipTableBody_2.rowsData))//可遍历信息
          fd.append("craftsmanshipTableBodyResult",JSON.stringify(this.craftsmanshipTableBodyResult))//结论与不符合确认
          fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
          fd.append('myfileone',this.craftsmanshipTableBody_2.fileOne)//装载图片一
          fd.append('myfiletwo',this.craftsmanshipTableBody_2.fileTwo)//装载图片二
          fd.append('myfilethree',this.craftsmanshipTableBody_2.fileThree)//装载图片三
          
          axios.post(`${this.baseURL}/basicdata/document.php`,fd)
          .then((response) => {
            console.log(response)
            alert("保存成功")          
          })
          .catch(function (error){
            console.log(error)
          })
          return
        }
        //模板三保存-新建
        if(this.tablecraftsmanshipBodyVisible[2]){
          fd.append("flag","craftsmanshipInsertDataThree")
          fd.append("craftsmanshipTableHeader",JSON.stringify(this.craftsmanshipTableHeader))//头部信息
          fd.append("craftsmanshipTableFooter",JSON.stringify(this.craftsmanshipTableFooter))//尾部信息
          fd.append('myfile',this.craftsmanshipTableBody_3.fileOne)//装载图片一

          axios.post(`${this.baseURL}/basicdata/document.php`,fd)
          .then((response) => {
            console.log(response)
            alert("保存成功")          
          })
          .catch(function (error){
            console.log(error)
          })
          return
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
    //材质及规格的选项改变
    materialAndSpecificationsChange(ev,v2){
      console.log(v2);
    },
    //根据材质将焊接方法返回
    selectWeldingMethod(materialAndSpecifications_1,materialAndSpecifications_2){
      let weldingMethod = "" //[{value:"FCAW"},{value:"GMAW"},{value:"SMAW"},{value:"SAW"},{value:"GTAW"}]
      if(materialAndSpecifications_1 == 'Q235-B' || materialAndSpecifications_1 == '20#'){
        if(materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_2 == "20#" || materialAndSpecifications_2 == "Q345-B"){
          weldingMethod = [{value:"FCAW"},{value:"GMAW"},{value:"SMAW"},{value:"SAW"}]
        }else if(materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
          weldingMethod = [{value:"FCAW"},{value:"GMAW"},{value:"SMAW"}]
        }else if(materialAndSpecifications_2 == "2Cr13" || materialAndSpecifications_2 == "0Cr18Ni9"){
          weldingMethod = [{value:"SMAW"}]
        }
      }else if(materialAndSpecifications_1 == 'Q345-B'){
        if(materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_2 == "20#" || materialAndSpecifications_2 == "Q345-B"){
          weldingMethod = [{value:"FCAW"},{value:"GMAW"},{value:"SMAW"},{value:"SAW"}]
        }else if(materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
          weldingMethod = [{value:"FCAW"},{value:"GMAW"},{value:"SMAW"}]
        }else if(materialAndSpecifications_2 == "2Cr13" || materialAndSpecifications_2 == "0Cr18Ni9"){
          weldingMethod = [{value:"SMAW"}]
        }
      }else if(materialAndSpecifications_1 == '45#' || materialAndSpecifications_1 == '40Cr'){
        if(materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_2 == "20#" || materialAndSpecifications_2 == "Q345-B" || materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
          weldingMethod = [{value:"FCAW"},{value:"GMAW"},{value:"SMAW"}]
        }else if(materialAndSpecifications_2 == "2Cr13" || materialAndSpecifications_2 == "0Cr18Ni9"){
          weldingMethod = [{value:"SMAW"}]
        }
      }else if(materialAndSpecifications_1 == '2Cr13' || materialAndSpecifications_1 == '0Cr18Ni9'){
        if(materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_2 == "20#" || materialAndSpecifications_2 == "Q345-B" || materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
          weldingMethod = [{value:"SMAW"}]
        }else if(materialAndSpecifications_2 == "2Cr13" || materialAndSpecifications_2 == "0Cr18Ni9"){
          weldingMethod = [{value:"SMAW"},{value:"GTAW"}]
        }
      }
      return weldingMethod
    },
    //根据材质，焊接方法返回焊材
    selectConsumables(weldingMethod,materialAndSpecifications_1,materialAndSpecifications_2){
      let consumables = "" //YJ501-1,ER50-6,E4316,E5015,A312,H10Mn2/HJ431

      switch(weldingMethod){
        case "FCAW":
          consumables = "YJ501-1"
          break
        case "GMAW":
          consumables = "ER50-6"
          break
        case "SAW":
          consumables = "H10Mn2/HJ431"
          break
        case "GTAW":
          consumables = "H00Cr21Ni10"
          break
        case "SMAW":
          if(materialAndSpecifications_1 == "0Cr18Ni9" || materialAndSpecifications_2 == "0Cr18Ni9" || materialAndSpecifications_1 == "2Cr13" || materialAndSpecifications_2 == "2Cr13"){
            consumables = "A312"      
          }else if(materialAndSpecifications_1 == "Q235-B" || materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_1 == "20#" || materialAndSpecifications_2 == "20#"){
            consumables = "J426"
          }else{
            consumables = "J507"
          }
          break
        default:
          break
      }
      return consumables
    },
    //根据焊材返回改保护气体
    consumablesChange(consumables){
      let protectiveGas = ""
      switch(consumables){
        case "YJ501-1":
          protectiveGas = "CO2"
          break
        case "ER50-6":
          protectiveGas = "混合气"
          break
        case "H00Cr21Ni10":
          protectiveGas = "Ar"
          break
        default:
          break
      }
      return protectiveGas
    },
    //根据材质2个、规格2个、焊材共5个数据返回焊接工艺评定编号
    returnRatingNumber(materialAndSpecifications_1,materialAndSpecifications_2,materialAndSpecifications_1_thickness,materialAndSpecifications_2_thickness,consumables){
      let ratingNumber = ''
      let pThick = (materialAndSpecifications_1_thickness > materialAndSpecifications_2_thickness) ? materialAndSpecifications_2_thickness : materialAndSpecifications_1_thickness

      switch(consumables){
        case "YJ501-1":
          if(materialAndSpecifications_1 == "Q235-B" || materialAndSpecifications_1 == "Q345-B" || materialAndSpecifications_1 == "20#"){
            if(materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_2 == "Q345-B" || materialAndSpecifications_2 == "20#"){
                if(1 <= pThick <= 7){
                  ratingNumber = "PQR-10"
                }else if(8 <= pThick <= 16){
                  ratingNumber = "PQR-7"
                }else if(17 <= pThick <= 200){
                  ratingNumber = "PQR-8"
                }
            }else if(materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
              if(16 <= pThick <= 200){
                ratingNumber = "PQR-31"
              }
            }
          }
          break
        case "ER50-6":
          if(materialAndSpecifications_1 == "Q235-B" || materialAndSpecifications_1 == "Q345-B" || materialAndSpecifications_1 == "20#"){
            if(materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_2 == "Q345-B" || materialAndSpecifications_2 == "20#"){
              if(1 <= pThick <= 7){
                ratingNumber = "PQR-9"
              }else if(8 <= pThick <= 16){
                ratingNumber = "PQR-5"
              }else if(17 <= pThick <= 200){
                ratingNumber = "PQR-6"
              }
            }else if(materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
              if(16 <= pThick <= 200){
                ratingNumber = "PQR-30"
              }
            }
          }
          break
        case "J426":
          if(materialAndSpecifications_1 == "Q235-B" || materialAndSpecifications_1 == "20#"){
            if(materialAndSpecifications_2 == "Q235-B" || materialAndSpecifications_2 == "20#"){
              if(1 <= pThick <= 7){
                ratingNumber = "PQR-1"
              }else if(8 <= pThick <= 16){
                ratingNumber = "PQR-11"
              }else if(17 <= pThick <= 200){
                ratingNumber = "PQR-2"
              }
            }else if(materialAndSpecifications_2 == "Q345-B"){
              if(1 <= pThick <= 7){
                ratingNumber = "PQR-33"
              }else if(8 <= pThick <= 16){
                ratingNumber = "PQR-34"
              }else if(17 <= pThick <= 200){
                ratingNumber = "PQR-35"
              }
            }else if(materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
              if(1 <= pThick <= 6){
                ratingNumber = "PQR-26"
              }else if(7 <= pThick <= 12){
                ratingNumber = "PQR-26"
              }
            }
          }
          break
        case "J507":
          switch(materialAndSpecifications_1){
            case "Q345-B":
              if(materialAndSpecifications_2 == "Q345-B"){
                if(1 <= pThick <= 7){
                  ratingNumber = "PQR-12"
                }else if(8 <= pThick <= 16){
                  ratingNumber = "PQR-3"
                }else if(17 <= pThick <= 200){
                  ratingNumber = "PQR-4"
                }
              }else if(materialAndSpecifications_2 == "45#" || materialAndSpecifications_2 == "40Cr"){
                if(1 <= pThick <= 6){
                  ratingNumber = "PQR-27"
                }else if(7 <= pThick <= 12){
                  ratingNumber = "PQR-27"
                }
              }
              break
            case "45#":
              if(materialAndSpecifications_2 == "45#"){
                if(1 <= pThick <= 6){
                  ratingNumber = "PQR-25"
                }else if(7 <= pThick <= 12){
                  ratingNumber = "PQR-25"
                }
              }
              break
            case "40Cr":
              if(1 <= pThick <= 6){
                ratingNumber = "PQR-25"
              }else if(7 <= pThick <= 12){
                ratingNumber = "PQR-25"
              }
              break
            default:
              break
          }
          break
        case "A312":
          if(materialAndSpecifications_1 == "Q235-B" || materialAndSpecifications_1 == "20#" || materialAndSpecifications_1 == "0Cr18Ni9"){
            if(materialAndSpecifications_2 == "0Cr18Ni9"){
              if(1 <= pThick <= 20){
                ratingNumber = "PQR-17"
              }
            }
          }
          break
        case "H10Mn2/HJ431":
          if(8 <= pThick <= 16){
            ratingNumber = "PQR-15"
          }else if(17 <= pThick <= 200){
            ratingNumber = "PQR-16"
          }
          break
        case "H00Cr21Ni10":
          if(1 <= pThick <= 12){
            ratingNumber = "PQR-24"
          }
          break
        default:
          break
      }
      return ratingNumber
    },
    //根据规格2个、焊接工艺评定编号返回焊材规格
    returnSpecifications(materialAndSpecifications_1_thickness,materialAndSpecifications_2_thickness,ratingNumber){
      let specifications = ''
      let pThick = (materialAndSpecifications_1_thickness > materialAndSpecifications_2_thickness) ? materialAndSpecifications_2_thickness : materialAndSpecifications_1_thickness

      if(ratingNumber == "PQR-10" || ratingNumber == "PQR-7" || ratingNumber == "PQR-8" || ratingNumber == "PQR-31" || ratingNumber == "PQR-5" || ratingNumber == "PQR-6" || ratingNumber == "PQR-30"){
        specifications = "Φ1.2"
      }else if(ratingNumber == "PQR-9"){
        specifications = "Φ1.0"
      }else if(ratingNumber == "PQR-1" || ratingNumber == "PQR-33" || ratingNumber == "PQR-12"){
        specifications = "Φ3.2"
      }else if(ratingNumber == "PQR-11" || ratingNumber == "PQR-2" || ratingNumber == "PQR-34" || ratingNumber == "PQR-35" || ratingNumber == "PQR-3" || ratingNumber == "PQR-4"){
        specifications = "Φ4.0"
      }else if(ratingNumber == "PQR-26" || ratingNumber == "PQR-25" || ratingNumber == "PQR-27" || ratingNumber == "PQR-28"){
        if(1<= pThick <=6){
          specifications = "Φ3.2"
        }else if(7<= pThick <=12){
          specifications = "Φ4.0"
        }
      }else if(ratingNumber == "PQR-17"){
        if(1<= pThick <=6){
          specifications = "Φ3.2"
        }else if(7<= pThick <=20){
          specifications = "Φ4.0"
        }
      }else if(ratingNumber == "PQR-15" || ratingNumber == "PQR-16"){
        specifications = "Φ4.0-5"
      }else if(ratingNumber == "PQR-24"){
        if(1<= pThick <=5){
          specifications = "Φ1.0"
        }else if(6<= pThick <=20){
          specifications = "Φ2.0"
        }
      }
      return specifications
    },
    //根据材质规格2个、焊接工艺评定编号返回焊接电流
    returnWeldingCurrent(materialAndSpecifications_1_thickness,materialAndSpecifications_2_thickness,ratingNumber){
      let weldingCurrent = ''
      let pThick = (materialAndSpecifications_1_thickness > materialAndSpecifications_2_thickness) ? materialAndSpecifications_2_thickness : materialAndSpecifications_1_thickness

      if(ratingNumber == "PQR-10" || ratingNumber == "PQR-7" || ratingNumber == "PQR-8" || ratingNumber == "PQR-31" || ratingNumber == "PQR-9" || ratingNumber == "PQR-5" || ratingNumber == "PQR-6" || ratingNumber == "PQR-30"){
        weldingCurrent = "130-280"
      }else if(ratingNumber == "PQR-1"){
        weldingCurrent = "80-130"
      }else if(ratingNumber == "PQR-26" || ratingNumber == "PQR-33" || ratingNumber == "PQR-34" || ratingNumber == "PQR-35" || ratingNumber == "PQR-12" || ratingNumber == "PQR-25" || ratingNumber == "PQR-27" || ratingNumber == "PQR-28" || ratingNumber == "PQR-17"){
        if(1<= pThick <=6){
          weldingCurrent = "80-130"
        }else if(7<= pThick <=20){
          weldingCurrent = "130-210"
        }
      }else if(ratingNumber == "PQR-11" || ratingNumber == "PQR-2" || ratingNumber == "PQR-3" || ratingNumber == "PQR-4"){
        weldingCurrent = "130-210"
      }else if(ratingNumber == "PQR-15" || ratingNumber == "PQR-16"){
        weldingCurrent = "600-800"
      }else if(ratingNumber == "PQR-24"){
        weldingCurrent = "50-160"
      }
      return weldingCurrent
    },
    //根据焊接电流返回焊接电压
    returnWeldingVoltage(weldingCurrent){
      let weldingVoltage = ''
      if(weldingCurrent == "130-280"){
        weldingVoltage = "20-29"
      }else if(weldingCurrent == "80-130" || weldingCurrent == "130-210"){
        weldingVoltage = "20-25"
      }else if(weldingCurrent == "600-800"){
        weldingVoltage = "34-40"
      }else if(weldingCurrent == "50-160"){
        weldingVoltage = "13-19"
      }
      return weldingVoltage
    },
    //材质改变时补全完整信息
    completionInformation(index){
      let item = this.weldingTableTwo_1[index];    
      if(item.materialAndSpecifications_1 != "" && item.materialAndSpecifications_2 != ""){//两个材质不为空时
          //焊接方法筛选
          let methodOptions = this.selectWeldingMethod(item.materialAndSpecifications_1,item.materialAndSpecifications_2)
          if(methodOptions.length){
            this.weldingMethodOptions = methodOptions //焊接方法选择
            this.weldingTableTwo_1[index]["weldingMethod"] = methodOptions[0].value //默认选中焊接方法
          }            
          this.weldingTableTwo_1[index]["consumables"] = this.selectConsumables(this.weldingTableTwo_1[index]["weldingMethod"],item.materialAndSpecifications_1,item.materialAndSpecifications_2) //填写焊材
          this.weldingTableTwo_1[index]["protectiveGas"] = this.consumablesChange(this.weldingTableTwo_1[index]["consumables"])//填写保护气体
          this.weldingTableTwo_1[index]["ratingNumber"] = this.returnRatingNumber(this.weldingTableTwo_1[index]["materialAndSpecifications_1"],this.weldingTableTwo_1[index]["materialAndSpecifications_2"],this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["consumables"])//填写焊接工艺评定号
          this.weldingTableTwo_1[index]["specifications"] = this.returnSpecifications(this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["ratingNumber"])//填写焊材规格
          this.weldingTableTwo_1[index]["weldingCurrent"] = this.returnWeldingCurrent(this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["ratingNumber"])//填写焊接电流
          this.weldingTableTwo_1[index]["weldingVoltage"] = this.returnWeldingVoltage(this.weldingTableTwo_1[index]["weldingCurrent"]) //填写焊接电流
      }
    },
    //更改焊接方法时改动焊材
    mothodChangeConsumables(index){
      this.weldingTableTwo_1[index]["consumables"] = this.selectConsumables(this.weldingTableTwo_1[index]["weldingMethod"],this.weldingTableTwo_1[index]["materialAndSpecifications_1"],this.weldingTableTwo_1[index]["materialAndSpecifications_2"])//填写焊材
      this.weldingTableTwo_1[index]["protectiveGas"] = this.consumablesChange(this.weldingTableTwo_1[index]["consumables"])//填写保护气体
      this.weldingTableTwo_1[index]["ratingNumber"] = this.returnRatingNumber(this.weldingTableTwo_1[index]["materialAndSpecifications_1"],this.weldingTableTwo_1[index]["materialAndSpecifications_2"],this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["consumables"])//填写焊接工艺评定号
      this.weldingTableTwo_1[index]["specifications"] = this.returnSpecifications(this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["ratingNumber"])//填写焊材规格
      this.weldingTableTwo_1[index]["weldingCurrent"] = this.returnWeldingCurrent(this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["ratingNumber"])//填写焊接电流
      this.weldingTableTwo_1[index]["weldingVoltage"] = this.returnWeldingVoltage(this.weldingTableTwo_1[index]["weldingCurrent"]) //填写焊接电流
    },
    //更改材质规格时触发
    thicknessChange(index){
      this.weldingTableTwo_1[index]["ratingNumber"] = this.returnRatingNumber(this.weldingTableTwo_1[index]["materialAndSpecifications_1"],this.weldingTableTwo_1[index]["materialAndSpecifications_2"],this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["consumables"])//填写焊接工艺评定号
      this.weldingTableTwo_1[index]["specifications"] = this.returnSpecifications(this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["ratingNumber"])//填写焊材规格
      this.weldingTableTwo_1[index]["weldingCurrent"] = this.returnWeldingCurrent(this.weldingTableTwo_1[index]["materialAndSpecifications_1_thickness"],this.weldingTableTwo_1[index]["materialAndSpecifications_2_thickness"],this.weldingTableTwo_1[index]["ratingNumber"])//填写焊接电流
      this.weldingTableTwo_1[index]["weldingVoltage"] = this.returnWeldingVoltage(this.weldingTableTwo_1[index]["weldingCurrent"]) //填写焊接电流
    },
    //填写焊缝编号时补充部分信息
    weldNumberChangeCompletion(index){
      //  this.weldingTableTwo_1[index]["weldNumber"]
      this.weldingTableThree_1[index]["weldNumber"] = this.weldingTableTwo_1[index]["weldNumber"]
      this.weldingTableThree_1[index]["processRequirements_1"] = "焊缝两侧30mm范围内打磨见白"
      this.weldingTableThree_1[index]["processRequirements_2"] = "角焊缝"
      this.weldingTableThree_1[index]["processRequirements_3"] = "≤2"

      this.weldingTableThree_2[index]["weldNumber"] = this.weldingTableTwo_1[index]["weldNumber"]
      this.weldingTableThree_2[index]["processRequirements_1"] = "清理干净"
      this.weldingTableThree_2[index]["processRequirements_2"] = "6"
      this.weldingTableThree_2[index]["processRequirements_3"] = "按检验标准A级"

    }
  }
};
</script>

<style scoped>
  .tableOne,.tableTwo,.tableThree,.tableFour,.craftsmanshipTableHeader,.craftsmanshipTableBody_1,.craftsmanshipTableFooter{
    border-collapse: collapse;
    text-align: center;
    width: 100%;
  }
  .tableOne tr,td,th,.tableTwo tr,td,th,.tableThree tr,td,th,.tableFour tr,td,th,.craftsmanshipTableHeader tr,td,th,.craftsmanshipTableBody_1 tr,td,th,.craftsmanshipTableFooter tr,td,th{
    border: 1px solid black;
    padding: 2px;
  }
  .tableOne input,.tableTwo input,.tableThree input,.tableFour input,.craftsmanshipTableHeader input,.craftsmanshipTableBody_1 input,.craftsmanshipTableFooter input{
    width: 100%;
    height: 100%;
    border: none;   
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
  .craftsmanshipTableBody_2 input{
    width: 100%;
    height: 100%;
    border: none; 
  }
  .craftsmanshipTableBody_3{
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    height: 500px;
  }
  .weldingsequence{
    height: 25px;
    width: 10%
  }
  .weldingsequenceinput{
    width: 100%;
    height: 500px;
    border: none; 
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
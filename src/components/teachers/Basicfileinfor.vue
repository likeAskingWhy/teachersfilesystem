<template>
	<div class="basicfileinfor">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>档案管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">基本档案信息</span></el-breadcrumb-item>
		</el-breadcrumb>
		
		<el-table :data="basicInforlist" style="width: 658px">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="教师编号：">
							<span>{{ props.row.teacherid }}</span>
						</el-form-item>
						<el-form-item label="姓名：">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="性别：">
							<span>{{ props.row.sex }}</span>
						</el-form-item>
						<el-form-item label="身份证号：">
							<span>{{ props.row.idnumber }}</span>
						</el-form-item>
						<el-form-item label="籍贯：">
							<span>{{ props.row.nativeplace }}</span>
						</el-form-item>
						<el-form-item label="政治面貌：">
							<span>{{ props.row.politicsstatus }}</span>
						</el-form-item>
						<el-form-item label="学校职务：">
							<span>{{ props.row.duty }}</span>
						</el-form-item>
						<el-form-item label="学历：">
							<span>{{ props.row.education }}</span>
						</el-form-item>
						<el-form-item label="毕业学校：">
							<span>{{ props.row.graduation }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="#" prop="id" width="70px"></el-table-column>
			<el-table-column label="教师编号" prop="teacherid" width="120px"></el-table-column>
			<el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
			<el-table-column label="性别" prop="sex" width="90px"></el-table-column>
			<el-table-column label="身份证号" prop="idnumber" width="210px"></el-table-column>
		</el-table>
		<el-button type="primary" @click="addDialogVisible = true">编辑</el-button>
		
		<!-- 编辑消息的对话框 -->
		<el-dialog title="编辑个人信息" :visible.sync="addDialogVisible" width="30%">
			<!-- 内容主体区 -->
		  <el-form :model="basicFileInforObj" ref="selfinforForm" label-width="100px" class="demo-ruleForm">
		    <el-form-item label="教师编号" prop="teacherid">
		      <el-input v-model="basicFileInforObj.teacherid" maxlength="6"></el-input>
		    </el-form-item>
				<el-form-item label="教师姓名" prop="name">
				  <el-input v-model="basicFileInforObj.name"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
				  <el-input v-model="basicFileInforObj.sex" maxlength="1"></el-input>
				</el-form-item>
				<el-form-item label="民族" prop="nation">
				  <el-input v-model="basicFileInforObj.nation" maxlength="1"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="idnumber">
				  <el-input v-model="basicFileInforObj.idnumber"></el-input>
				</el-form-item>
				<el-form-item label="籍贯" prop="nativeplace">
				  <el-input v-model="basicFileInforObj.nativeplace"></el-input>
				</el-form-item>
				<el-form-item label="政治面貌" prop="politicsstatus">
				  <el-input v-model="basicFileInforObj.politicsstatus" maxlength="1"></el-input>
				</el-form-item>
				<el-form-item label="学校职务" prop="duty">
				  <el-input v-model="basicFileInforObj.duty"></el-input>
				</el-form-item>
				<el-form-item label="学历" prop="education">
				  <el-input v-model="basicFileInforObj.education"></el-input>
				</el-form-item>
				<el-form-item label="毕业学校" prop="graduation">
				  <el-input v-model="basicFileInforObj.graduation"></el-input>
				</el-form-item>
		  </el-form>
			<!-- 底部按钮区域 -->
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="submitform">确 定</el-button>
				<el-button type="danger" @click="resetform">重 置</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'Basicfileinfor',
		data() {
			return {
				basicInforlist: [],
				addDialogVisible: false,
				basicFileInforObj: {},
			}
		},
		methods: {
			getSelfInforList() {
				this.$http.get('basicfileinfor').then(res => {
					this.basicInforlist = res.data;
					this.basicFileInforObj = res.data[0];
					// console.log(res.data);
				})
			},
			resetform() {
				this.$refs.selfinforForm.resetFields();
			},
			submitform() {
				this.addDialogVisible = false;
				let newSelfInfor = {
					teacherid: this.basicFileInforObj.teacherid,
					name: this.basicFileInforObj.name,
					sex: this.basicFileInforObj.sex,
					nation: this.basicFileInforObj.nation,
					idnumber: this.basicFileInforObj.idnumber,
					nativeplace: this.basicFileInforObj.nativeplace,
					politicsstatus: this.basicFileInforObj.politicsstatus,
					duty: this.basicFileInforObj.duty,
					education: this.basicFileInforObj.education,
					graduation: this.basicFileInforObj.graduation
				}
				this.$http.put('basicfileinfor/' + this.basicFileInforObj.id, newSelfInfor).then(res => {
					// console.log(res.data);
					this.getSelfInforList();
				})
			}
		},
		created() {
			this.getSelfInforList();
		}
	}
</script>

<style scoped="scoped">
	/* 面包屑留出下外边距 */
	.el-breadcrumb {
		margin-bottom: 20px;
	}
	.el-table {
		border-top: 1px solid #EBEEF5;
		margin-bottom: 20px;
	}
	.demo-table-expand {
		font-size: 0;
		color: #409EFF;
	}
	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
		margin-right: 0;
		margin-bottom: 0;
		width: 100%;
		margin-left: 10px;
	}
</style>

<template>
	<div class="teachfileinfor">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>主界面</el-breadcrumb-item>
			<el-breadcrumb-item>档案管理</el-breadcrumb-item>
		  <el-breadcrumb-item><span style="font-weight: bold;">教学档案信息</span></el-breadcrumb-item>
		</el-breadcrumb>
		<el-table :data="teachInforlist" style="width: 678px">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="教师编号：">
							<span>{{ props.row.teacherid }}</span>
						</el-form-item>
						<el-form-item label="姓名：">
							<span>{{ props.row.name }}</span>
						</el-form-item>
						<el-form-item label="教学科目：">
							<span>{{ props.row.teachsubject }}</span>
						</el-form-item>
						<el-form-item label="教学经历：">
							<span>{{ props.row.teachingexp }}</span>
						</el-form-item>
						<el-form-item label="所获荣誉：">
							<span>{{ props.row.gethonor }}</span>
						</el-form-item>
						<el-form-item label="教学目标：">
							<span>{{ props.row.teachtarget }}</span>
						</el-form-item>
						<el-form-item label="教学规划：">
							<span>{{ props.row.teachplan }}</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column label="#" prop="id" width="70px"></el-table-column>
			<el-table-column label="教师编号" prop="teacherid" width="120px"></el-table-column>
			<el-table-column label="教师姓名" prop="name" width="120px"></el-table-column>
			<el-table-column label="教学科目" prop="teachsubject" width="160px"></el-table-column>
			<el-table-column label="教学经历" prop="teachingexp" width="160px"></el-table-column>
		</el-table>
		<el-button type="primary" @click="addDialogVisible = true">编辑</el-button>
		
		<!-- 编辑消息的对话框 -->
		<el-dialog title="编辑个人信息" :visible.sync="addDialogVisible" width="30%">
			<!-- 内容主体区 -->
		  <el-form :model="teachFileInforObj" ref="selfinforForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="teacherid">
				  <el-input v-model="teachFileInforObj.teacherid"></el-input>
				</el-form-item>
				<el-form-item label="教师姓名">
				  <el-input v-model="teachFileInforObj.name"></el-input>
				</el-form-item>
		    <el-form-item label="教学科目">
		      <el-input v-model="teachFileInforObj.teachsubject"></el-input>
		    </el-form-item>
		    <el-form-item label="教学经历">
		      <el-input v-model="teachFileInforObj.teachingexp"></el-input>
		    </el-form-item>
		    <el-form-item label="所获荣誉">
		      <el-input v-model="teachFileInforObj.gethonor"></el-input>
		    </el-form-item>
		    <el-form-item label="教学目标">
		      <el-input v-model="teachFileInforObj.teachtarget"></el-input>
		    </el-form-item>
		    <el-form-item label="教学规划">
		      <el-input v-model="teachFileInforObj.teachplan"></el-input>
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
		name: 'Teachfileinfor',
		data() {
			return {
				teachInforlist: [],
				addDialogVisible: false,
				teachFileInforObj: {},
			}
		},
		methods: {
			getSelfInforList() {
				this.$http.get('teachfileinfor').then(res => {
					this.teachInforlist = res.data;
					this.teachFileInforObj = res.data[0];
					// console.log(res.data);
				})
			},
			resetform() {
				this.$refs.selfinforForm.resetFields();
			},
			submitform() {
				this.addDialogVisible = false;
				let newSelfInfor = {
					teacherid: this.teachFileInforObj.teacherid,
					name: this.teachFileInforObj.name,
					teachsubject: this.teachFileInforObj.teachsubject,
					teachingexp: this.teachFileInforObj.teachingexp,
					gethonor: this.teachFileInforObj.gethonor,
					teachtarget: this.teachFileInforObj.teachtarget,
					teachplan: this.teachFileInforObj.teachplan
				}
				this.$http.put('teachfileinfor/' + this.teachFileInforObj.id, newSelfInfor).then(res => {
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

